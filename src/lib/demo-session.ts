export const DEMO_SESSION_COOKIE = "synapto_demo_session";

export function hasDemoSessionCookie(cookieHeader: string | null | undefined) {
  if (!cookieHeader) return false;
  return cookieHeader.includes(`${DEMO_SESSION_COOKIE}=1`);
}
