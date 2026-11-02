import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { getChauffeurProfile } from "@/server/services/chauffeur-service";
import { AvailabilityToggle } from "./availability-toggle";

export const metadata: Metadata = { title: "Chauffeur Profile" };

export default async function ChauffeurProfilePage() {
  const user = await requireRole("chauffeur");
  const profile = await getChauffeurProfile(user.id);

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate">Profile</p>
        <h1 className="mt-2 font-serif text-3xl text-midnight">
          {profile ? `${profile.firstName} ${profile.lastName}` : user.email}
        </h1>
      </div>

      <section className="rounded-sm border border-midnight/10 bg-white p-8">
        <h2 className="font-serif text-xl text-midnight">Availability</h2>
        <p className="mt-2 text-sm text-slate">
          Toggle your availability for new assignments. Dispatchers only see you as eligible
          while this is on.
        </p>
        <div className="mt-5">
          <AvailabilityToggle isAvailable={profile?.isAvailable ?? false} />
        </div>
      </section>

      <section className="rounded-sm border border-midnight/10 bg-white p-8">
        <h2 className="font-serif text-xl text-midnight">Details</h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate">Email</dt>
            <dd className="mt-1 text-sm text-midnight">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate">Phone</dt>
            <dd className="mt-1 text-sm text-midnight">{profile?.phone ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate">License number</dt>
            <dd className="mt-1 text-sm text-midnight">{profile?.licenseNumber ?? "—"}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
