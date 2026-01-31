import { NextResponse } from "next/server";
import { readJson } from "@/shared/lib/http/json";
import { createSession, verifyUserPassword } from "@/shared/lib/auth/store";

export const runtime = "nodejs";

type Body = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = await readJson<Body>(req);
    const email = (body.email ?? "").trim();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "missing_credentials" }, { status: 400 });
    }

    const verified = await verifyUserPassword({ email, password });
    if ("error" in verified) {
      return NextResponse.json({ error: verified.error }, { status: 401 });
    }

    const userAgent = req.headers.get("user-agent");
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    const session = await createSession({
      userId: verified.user.id,
      userAgent,
      ip,
    });

    const res = NextResponse.json(
      { user: verified.user, token: session.token, expiresAt: session.expiresAt },
      { status: 200 },
    );

    res.cookies.set({
      name: "auth_token",
      value: session.token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.floor((Date.parse(session.expiresAt) - Date.now()) / 1000),
    });

    return res;
  } catch (e) {
    return NextResponse.json(
      { error: "bad_request", message: e instanceof Error ? e.message : "Unknown error" },
      { status: 400 },
    );
  }
}

