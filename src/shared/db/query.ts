import type { QueryResult, QueryResultRow } from "pg";
import { getPool } from "./pool";

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  return await getPool().query<T>(text, params);
}

