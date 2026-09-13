/** Shared domain types — mirror the Prisma schema in packages/api/prisma/schema.prisma. */

export type MembershipTier = "BASIC" | "PREMIUM";

export type ReservationType = "DEMO_ROOM" | "CAFE" | "HIFI_CONSULT";

export type ReservationStatus =
  | "CONFIRMED" // Demo Odası: auto-confirmed on creation
  | "CHECKED_IN"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface Guest {
  id: string;
  name: string;
  email: string;
}

export interface Reservation {
  id: string;
  type: ReservationType;
  status: ReservationStatus;
  memberId: string;
  guests: Guest[];
  /** Cafe check-ins are instant (startAt === createdAt); Demo Odası / Hi-Fi are scheduled. */
  startAt: string;
  endAt: string;
  /** Unique reference the QR code encodes; used at the door scanner. */
  referenceCode: string;
}

export interface NowPlaying {
  location: "CAFE" | "DEMO_ROOM";
  trackTitle: string;
  artist: string;
  albumArtUrl: string;
  /** Dominant color pulled from album art, drives the adaptive card theme. */
  accentColor: string;
}

export interface OccupancySnapshot {
  location: "CAFE" | "DEMO_ROOM";
  current: number;
  capacity: number;
  updatedAt: string;
}
