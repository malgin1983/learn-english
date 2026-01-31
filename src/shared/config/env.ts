function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function intEnv(name: string, fallback: number): number {
  const v = process.env[name];
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export const env = {
  DATABASE_URL: () => requireEnv("DATABASE_URL"),
  AUTH_TOKEN_TTL_DAYS: () => intEnv("AUTH_TOKEN_TTL_DAYS", 30),
};

