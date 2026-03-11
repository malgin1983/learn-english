import { NextResponse } from "next/server";
import { readJson } from "@/shared/lib/http/json";
import { createSession, verifyUserPassword } from "@/shared/lib/auth/store";
import { getAuthCookieOptions } from "@/shared/lib/auth/setAuthCookie";

export const runtime = "nodejs";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = await readJson<LoginBody>(req);
    const email = (body.email ?? "").trim();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "missing_credentials" },
        { status: 400 },
      );
    }

    const verified = await verifyUserPassword({ email, password });
    if ("error" in verified) {
      return NextResponse.json({ error: verified.error }, { status: 401 });
    }

    const userAgent = req.headers.get("user-agent") ?? undefined;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    const session = await createSession({
      userId: verified.user.id,
      userAgent,
      ip,
    });

    const res = NextResponse.json(
      {
        user: verified.user,
        token: session.token,
        expiresAt: session.expiresAt,
      },
      { status: 200 },
    );

    res.cookies.set(
      "auth_token",
      session.token,
      getAuthCookieOptions(session.expiresAt),
    );

    return res;
  } catch (e) {
    return NextResponse.json(
      {
        error: "bad_request",
        message: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}

