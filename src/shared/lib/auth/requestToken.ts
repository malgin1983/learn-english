import { cookies } from "next/headers";

export function getRequestToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();
    return token || null;
  }

  // Optional cookie support
  const cookieToken = cookies().get("auth_token")?.value;
  return cookieToken ?? null;
}

