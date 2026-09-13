import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(7).optional(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  codeName: z.string().min(2).max(30),
  tier: z.enum(["BASIC", "PREMIUM"]),
  agreementAccepted: z.literal(true),
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { email, phone, password, fullName, codeName, tier } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { codeName }] },
  });
  if (existing) {
    const field = existing.email === email ? "email" : "codeName";
    return res.status(409).json({ error: `${field} already in use` });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      phone,
      passwordHash,
      fullName,
      codeName,
      membershipAgreementAcceptedAt: new Date(),
      memberships: {
        create: { tier },
      },
    },
    include: { memberships: true },
  });

  const token = signToken(user.id);
  return res.status(201).json({
    token,
    user: toPublicUser(user),
  });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { memberships: true },
  });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const token = signToken(user.id);
  return res.json({ token, user: toPublicUser(user) });
});

function signToken(userId: string) {
  const secret = process.env.JWT_SECRET ?? "dev-secret";
  return jwt.sign({ sub: userId }, secret, { expiresIn: "30d" });
}

function toPublicUser(user: {
  id: string;
  email: string;
  fullName: string;
  codeName: string;
  memberships: { tier: string }[];
}) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    codeName: user.codeName,
    tier: user.memberships[0]?.tier ?? "BASIC",
  };
}

export default router;
