import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-midnight px-6 py-16 text-ivory lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl tracking-[0.08em]">AUREL</p>
          <p className="mt-4 max-w-xs text-sm text-ivory/60">
            Premium chauffeur service for travelers who value comfort, reliability, and privacy.
          </p>
        </div>

        <FooterColumn
          title="Explore"
          links={[
            { label: "Services", href: "/services" },
            { label: "Fleet", href: "/fleet" },
            { label: "About", href: "/about" },
          ]}
        />
        <FooterColumn
          title="Account"
          links={[
            { label: "Sign In", href: "/login" },
            { label: "Create Account", href: "/register" },
            { label: "Contact", href: "/contact" },
          ]}
        />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Support</p>
          <p className="mt-4 text-sm text-ivory/60">Available around the clock for our clients.</p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-ivory/10 pt-8 text-xs text-ivory/40">
        © {new Date().getFullYear()} AUREL. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gold">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ivory/60 hover:text-ivory">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
