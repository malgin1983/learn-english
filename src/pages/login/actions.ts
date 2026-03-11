"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession, verifyUserPassword } from "@/shared/lib/auth/store";
import { setAuthCookie } from "@/shared/lib/auth/setAuthCookie";
import { AUTH_ERROR_MESSAGES } from "@/shared/lib/auth/constants";

export type LoginState = { error: string | null };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = (formData.get("email") as string)?.trim() ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (!email || !password) {
    return { error: AUTH_ERROR_MESSAGES.missing_credentials };
  }

  const verified = await verifyUserPassword({ email, password });
  if ("error" in verified) {
    return { error: AUTH_ERROR_MESSAGES[verified.error] };
  }

  const session = await createSession({
    userId: verified.user.id,
    userAgent: null,
    ip: null,
  });

  const cookieStore = await cookies();
  setAuthCookie({
    cookieStore,
    token: session.token,
    expiresAt: session.expiresAt,
  });

  redirect("/");
}
