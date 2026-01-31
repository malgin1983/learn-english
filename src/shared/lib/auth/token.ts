import { createHash, randomBytes } from "node:crypto";

export function createToken(): string {
  // 32 bytes -> base64url token
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

