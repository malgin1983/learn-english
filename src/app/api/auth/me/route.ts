import { NextResponse } from "next/server";
import { hashToken } from "@/shared/lib/auth/token";
import { getRequestToken } from "@/shared/lib/auth/requestToken";
import { getUserByTokenHash } from "@/shared/lib/auth/store";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const token = getRequestToken(req);
  if (!token) {
    return NextResponse.json({ error: "missing_token" }, { status: 401 });
  }

  const tokenHash = hashToken(token);
  const result = await getUserByTokenHash({ tokenHash });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  return NextResponse.json({ user: result.user }, { status: 200 });
}

