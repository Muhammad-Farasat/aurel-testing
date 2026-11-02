"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link href="/" className="font-serif text-xl tracking-[0.08em] text-ivory">
          AUREL
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ivory/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden text-sm text-ivory/80 hover:text-gold sm:block">
            Sign In
          </Link>
          <Button href="/#book" size="sm" className="hidden sm:inline-flex">
            Book a Chauffeur
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-ivory lg:hidden"
          >
            {menuOpen ? (
              <X className="size-6" strokeWidth={1.75} />
            ) : (
              <Menu className="size-6" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-midnight px-6 pt-28 pb-10 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ivory/10 py-4 font-serif text-2xl text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm text-ivory/70"
            >
              Sign In
            </Link>
            <Button href="/register" onClick={() => setMenuOpen(false)}>
              Book a Chauffeur
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
