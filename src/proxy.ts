import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/server/db/supabase-middleware";

const protectedRoutes = ["/chat", "/dashboard", "/profile", "/settings", "/onboarding"];

const publicRoutes = ["/", "/login", "/auth/callback", "/api"];

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Catch OAuth code on any path except /auth/callback (Vercel redirect mismatch)
  const code = searchParams.get("code");
  if (code && pathname !== "/auth/callback") {
    const url = new URL("/auth/callback", request.url);
    url.searchParams.set("code", code);
    return NextResponse.redirect(url);
  }

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublic) return NextResponse.next();

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isProtected) return NextResponse.next();

  const { supabase, response } = updateSession(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
