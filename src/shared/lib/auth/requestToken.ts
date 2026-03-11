import { cookies } from "next/headers";

export async function getRequestToken(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();
    return token || null;
  }

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("auth_token")?.value;
  return cookieToken ?? null;
}

