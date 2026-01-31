import { env } from "@/shared/config/env";
import { query } from "@/shared/db/query";
import { hashPassword, verifyPassword } from "./password";
import { createToken, hashToken } from "./token";

export type PublicUser = {
  id: string;
  email: string;
  createdAt: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function createUser(params: {
  email: string;
  password: string;
}): Promise<{ user: PublicUser } | { error: "email_taken" }> {
  const email = normalizeEmail(params.email);
  const passwordHash = hashPassword(params.password);

  const res = await query<{
    id: string;
    email: string;
    created_at: string;
  }>(
    `
    INSERT INTO auth.users (email, password_hash)
    VALUES ($1, $2)
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email, created_at
    `,
    [email, passwordHash],
  );

  const row = res.rows[0];
  if (!row) return { error: "email_taken" };

  return { user: { id: row.id, email: row.email, createdAt: row.created_at } };
}

export async function verifyUserPassword(params: {
  email: string;
  password: string;
}): Promise<{ user: PublicUser } | { error: "invalid_credentials" }> {
  const email = normalizeEmail(params.email);

  const res = await query<{
    id: string;
    email: string;
    password_hash: string;
    created_at: string;
  }>(
    `
    SELECT id, email, password_hash, created_at
    FROM auth.users
    WHERE email = $1
    LIMIT 1
    `,
    [email],
  );

  const row = res.rows[0];
  if (!row) return { error: "invalid_credentials" };

  const ok = verifyPassword(params.password, row.password_hash);
  if (!ok) return { error: "invalid_credentials" };

  return { user: { id: row.id, email: row.email, createdAt: row.created_at } };
}

export async function createSession(params: {
  userId: string;
  userAgent?: string | null;
  ip?: string | null;
}): Promise<{ token: string; tokenHash: string; expiresAt: string }> {
  const token = createToken();
  const tokenHash = hashToken(token);
  const ttlDays = env.AUTH_TOKEN_TTL_DAYS();
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

  await query(
    `
    INSERT INTO auth.sessions (user_id, token_hash, expires_at, user_agent, ip)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [params.userId, tokenHash, expiresAt.toISOString(), params.userAgent ?? null, params.ip ?? null],
  );

  return { token, tokenHash, expiresAt: expiresAt.toISOString() };
}

export async function getUserByTokenHash(params: {
  tokenHash: string;
}): Promise<{ user: PublicUser } | { error: "invalid_token" }> {
  const res = await query<{
    id: string;
    email: string;
    created_at: string;
  }>(
    `
    SELECT u.id, u.email, u.created_at
    FROM auth.sessions s
    JOIN auth.users u ON u.id = s.user_id
    WHERE s.token_hash = $1
      AND s.revoked_at IS NULL
      AND s.expires_at > now()
    LIMIT 1
    `,
    [params.tokenHash],
  );

  const row = res.rows[0];
  if (!row) return { error: "invalid_token" };

  return { user: { id: row.id, email: row.email, createdAt: row.created_at } };
}

export async function revokeSessionByTokenHash(params: {
  tokenHash: string;
}): Promise<void> {
  await query(
    `
    UPDATE auth.sessions
    SET revoked_at = now()
    WHERE token_hash = $1
      AND revoked_at IS NULL
    `,
    [params.tokenHash],
  );
}

