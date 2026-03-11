import { NextResponse } from "next/server";
import { hashToken } from "@/shared/lib/auth/token";
import { getRequestToken } from "@/shared/lib/auth/requestToken";
import { revokeSessionByTokenHash } from "@/shared/lib/auth/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const token = await getRequestToken(req);
  if (!token) {
    return NextResponse.json({ error: "missing_token" }, { status: 401 });
  }

  await revokeSessionByTokenHash({ tokenHash: hashToken(token) });

  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}

