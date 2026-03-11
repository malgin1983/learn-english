const AUTH_COOKIE_NAME = "auth_token";

/** Опции httpOnly cookie сессии для использования в actions и API routes */
export function getAuthCookieOptions(expiresAt: string): {
  httpOnly: boolean;
  sameSite: "lax";
  secure: boolean;
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor((Date.parse(expiresAt) - Date.now()) / 1000),
  };
}

type CookieStore = Awaited<ReturnType<typeof import("next/headers").cookies>>;

type SetAuthCookieParams = {
  cookieStore: CookieStore;
  token: string;
  expiresAt: string;
};

/** Устанавливает httpOnly cookie с токеном сессии (для Server Actions) */
export function setAuthCookie({
  cookieStore,
  token,
  expiresAt,
}: SetAuthCookieParams): void {
  cookieStore.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions(expiresAt));
}
