"use client"; // Required to use the usePathname hook in Next.js App Router

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/works", label: "Works" },
  { href: "/applications", label: "Applications" },
];

export function Navbar() {
  const pathname = usePathname(); // Detects current path (e.g., "/applications")

  return (
    <header className="bg-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl font-semibold tracking-wide text-white">
          Career<span className="text-gold">Admin</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            // Checks if current path starts with the link's href
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-4 py-2 text-sm font-semibold font-body transition-colors ${
                  isActive 
                    ? "bg-white/10 text-gold" 
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="h-1 w-full bg-gold" />
    </header>
  );
}