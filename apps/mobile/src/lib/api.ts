import Constants from "expo-constants";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
  "http://localhost:4000";

export interface RegisterPayload {
  email: string;
  phone?: string;
  password: string;
  fullName: string;
  codeName: string;
  tier: "BASIC" | "PREMIUM";
  agreementAccepted: true;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    codeName: string;
    tier: "BASIC" | "PREMIUM";
  };
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function registerMember(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new ApiError(body?.error ?? "Kayıt başarısız oldu", res.status);
  }
  return body as AuthResponse;
}
