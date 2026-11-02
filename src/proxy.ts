import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/lib/auth/config";
import type { UserRole } from "@/lib/auth/types";

const { auth } = NextAuth(authConfig);

const ROLE_HOME: Record<UserRole, string> = {
  customer: "/account",
  chauffeur: "/chauffeur",
  admin: "/admin",
};

const PROTECTED_PREFIXES: { prefix: string; role: UserRole }[] = [
  { prefix: "/account", role: "customer" },
  { prefix: "/chauffeur", role: "chauffeur" },
  { prefix: "/admin", role: "admin" },
];

const GUEST_ONLY_PATHS = ["/login", "/register"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const protectedMatch = PROTECTED_PREFIXES.find((p) => pathname.startsWith(p.prefix));

  if (protectedMatch) {
    if (!session?.user) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.user.role !== protectedMatch.role) {
      return NextResponse.redirect(new URL(ROLE_HOME[session.user.role], req.nextUrl.origin));
    }
  }

  if (session?.user && GUEST_ONLY_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL(ROLE_HOME[session.user.role], req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)"],
};
