"use client"; // Required to use hooks in Next.js App Router

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Added missing hooks import
import { User, LogOut } from "lucide-react";
import { api } from "@/lib/api";


const links = [
  { href: "/works", label: "Works" },
  { href: "/applications/show", label: "Applications" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // Detects current path (e.g., "/applications")
  const [userName, setUserName] = useState("");

  // 1. Fetch user data from localStorage when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        setUserName(JSON.parse(user).name);
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
      }
    }
  }, []);

  // 2. Handle Logout procedure
  const handleLogout = async () => {
    try {
        await api.post("/logout");
    } catch (err) {
        console.error(err);
    } finally {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
  };

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

        {/* User Info & Logout controls */}
        <div className="flex items-center gap-4 border-l border-white/20 pl-4">
          <div className="flex items-center gap-2 text-white">
            <User size={18} />
            <span className="text-sm font-medium">{userName || "Guest User"}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      <div className="h-1 w-full bg-gold" />
    </header>
  );
}