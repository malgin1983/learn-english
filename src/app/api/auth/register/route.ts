import { NextResponse } from "next/server";
import { readJson } from "@/shared/lib/http/json";
import { createSession, createUser } from "@/shared/lib/auth/store";

export const runtime = "nodejs";

type Body = {
  email?: string;
  password?: string;
};

function isValidEmail(email: string): boolean {
  // minimal validation
  return email.includes("@") && email.includes(".") && email.length <= 254;
}

export async function POST(req: Request) {
  try {
    const body = await readJson<Body>(req);
    const email = (body.email ?? "").trim();
    const password = body.password ?? "";

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "password_too_short" }, { status: 400 });
    }

    const created = await createUser({ email, password });
    if ("error" in created) {
      return NextResponse.json({ error: created.error }, { status: 409 });
    }

    const userAgent = req.headers.get("user-agent");
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    const session = await createSession({
      userId: created.user.id,
      userAgent,
      ip,
    });

    const res = NextResponse.json(
      { user: created.user, token: session.token, expiresAt: session.expiresAt },
      { status: 201 },
    );

    // Optional cookie support (you can also use Bearer token)
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

