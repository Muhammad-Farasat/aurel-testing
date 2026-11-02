import Link from "next/link";
import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-midnight px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 block text-center font-serif text-2xl tracking-wide text-ivory">
          AUREL
        </Link>
        <div className="rounded-sm border border-ivory/10 bg-charcoal p-8 sm:p-10">
          <h1 className="font-serif text-2xl text-ivory">Create your account</h1>
          <p className="mt-2 text-sm text-slate">Book and manage chauffeured journeys.</p>
          <RegisterForm />
          <p className="mt-8 text-center text-sm text-slate">
            Already have an account?{" "}
            <Link href="/login" className="text-gold hover:text-gold-soft">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
