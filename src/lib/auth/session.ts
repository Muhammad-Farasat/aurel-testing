import "server-only";
import { auth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth/types";

/**
 * Server-side authorization helpers. These exist because middleware only
 * controls page redirects — every server action, route handler, and data
 * loader must independently re-check identity and role here. Never treat a
 * matched middleware route as proof of authorization.
 */

export class UnauthorizedError extends Error {
  constructor(message = "You must be signed in to do this.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "You do not have permission to do this.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new UnauthorizedError();
  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireUser();
  if (user.role !== role) throw new ForbiddenError();
  return user;
}
