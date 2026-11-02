import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign In" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-midnight px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 block text-center font-serif text-2xl tracking-wide text-ivory">
          AUREL
        </Link>
        <div className="rounded-sm border border-ivory/10 bg-charcoal p-8 sm:p-10">
          <h1 className="font-serif text-2xl text-ivory">Welcome back</h1>
          <p className="mt-2 text-sm text-slate">Sign in to manage your reservations.</p>
          <LoginForm callbackUrl={callbackUrl} />
          <p className="mt-8 text-center text-sm text-slate">
            New to AUREL?{" "}
            <Link href="/register" className="text-gold hover:text-gold-soft">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
