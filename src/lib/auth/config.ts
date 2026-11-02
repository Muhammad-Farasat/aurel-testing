import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "./types";

/**
 * Edge-safe base config shared by middleware and the full server-side auth
 * instance. No providers here: Credentials needs bcrypt + the DB, which are
 * Node-only and must not be pulled into the Edge middleware bundle.
 */
export default {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      // `authorize()` in lib/auth/index.ts always returns an id; the base
      // NextAuth `User.id` type is just looser than our augmented one.
      if (user?.id) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
