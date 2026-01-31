import { Pool } from "pg";
import { env } from "@/shared/config/env";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

export function getPool(): Pool {
  const g = globalThis as typeof globalThis & { __pgPool?: Pool };
  if (!g.__pgPool) {
    g.__pgPool = new Pool({ connectionString: env.DATABASE_URL() });
  }
  return g.__pgPool;
}

