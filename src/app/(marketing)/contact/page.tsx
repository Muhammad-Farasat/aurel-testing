import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getContactSettings } from "@/server/services/settings-service";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const contact = await getContactSettings();

  return (
    <>
      <section className="bg-midnight px-6 pt-40 pb-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Contact</p>
          <h1 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">We&rsquo;re here to help</h1>
        </div>
      </section>

      <section className="bg-ivory px-6 py-20 lg:px-12">
        <Reveal className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <ContactDetail icon={Mail} label="Email" value={contact.contactEmail} />
            <ContactDetail icon={Phone} label="Phone" value={contact.contactPhone} />
            {contact.businessAddress && (
              <ContactDetail icon={MapPin} label="Address" value={contact.businessAddress} />
            )}
            <ContactDetail icon={Clock} label="Support hours" value={contact.supportHours} />
          </div>

          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="size-5 shrink-0 text-gold" strokeWidth={1.75} />
      <div>
        <p className="text-xs uppercase tracking-wider text-slate">{label}</p>
        <p className="mt-1 whitespace-pre-line text-midnight">{value}</p>
      </div>
    </div>
  );
}
