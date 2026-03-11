"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession, createUser } from "@/shared/lib/auth/store";
import { setAuthCookie } from "@/shared/lib/auth/setAuthCookie";
import { isValidEmail } from "@/shared/lib/auth/validation";
import {
  AUTH_ERROR_MESSAGES,
  MIN_PASSWORD_LENGTH,
} from "@/shared/lib/auth/constants";

export type RegisterState = { error: string | null };

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const email = (formData.get("email") as string)?.trim() ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (!isValidEmail(email)) {
    return { error: AUTH_ERROR_MESSAGES.invalid_email };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: AUTH_ERROR_MESSAGES.password_too_short };
  }

  const created = await createUser({ email, password });
  if ("error" in created) {
    return { error: AUTH_ERROR_MESSAGES[created.error] };
  }

  const session = await createSession({
    userId: created.user.id,
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
