import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { db } from "@/db/client";
import { customerProfiles, users } from "@/db/schema";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = { title: "Profile Settings" };

export default async function ProfilePage() {
  const sessionUser = await requireRole("customer");
  const [row] = await db
    .select({
      email: users.email,
      firstName: customerProfiles.firstName,
      lastName: customerProfiles.lastName,
      phone: customerProfiles.phone,
    })
    .from(users)
    .innerJoin(customerProfiles, eq(customerProfiles.userId, users.id))
    .where(eq(users.id, sessionUser.id))
    .limit(1);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate">Account</p>
        <h1 className="mt-2 font-serif text-3xl text-midnight">Profile Settings</h1>
      </div>

      <section className="rounded-sm border border-midnight/10 bg-white p-8">
        <h2 className="font-serif text-xl text-midnight">Personal Information</h2>
        <ProfileForm initial={row} />
      </section>

      <section className="rounded-sm border border-midnight/10 bg-white p-8">
        <h2 className="font-serif text-xl text-midnight">Password</h2>
        <PasswordForm />
      </section>
    </div>
  );
}
