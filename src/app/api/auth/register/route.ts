import { NextResponse } from "next/server";
import { readJson } from "@/shared/lib/http/json";
import { createSession, createUser } from "@/shared/lib/auth/store";
import { getAuthCookieOptions } from "@/shared/lib/auth/setAuthCookie";
import { isValidEmail } from "@/shared/lib/auth/validation";
import { MIN_PASSWORD_LENGTH } from "@/shared/lib/auth/constants";

export const runtime = "nodejs";

type RegisterBody = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = await readJson<RegisterBody>(req);
    const email = (body.email ?? "").trim();
    const password = body.password ?? "";

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "invalid_email" },
        { status: 400 },
      );
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: "password_too_short" },
        { status: 400 },
      );
    }

    const created = await createUser({ email, password });
    if ("error" in created) {
      return NextResponse.json({ error: created.error }, { status: 409 });
    }

    const userAgent = req.headers.get("user-agent") ?? undefined;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    const session = await createSession({
      userId: created.user.id,
      userAgent,
      ip,
    });

    const res = NextResponse.json(
      {
        user: created.user,
        token: session.token,
        expiresAt: session.expiresAt,
      },
      { status: 201 },
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

