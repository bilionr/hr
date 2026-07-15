import React from "react";
import { Navbar } from "@/app/layout/navbar";
// import { Sidebar } from "@/app/layout/sidebar";
// import { Footer } from "@/app/layout/footer";
import "@/app/globals.css"; // Ensure your Tailwind styles are loaded

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col antialiased">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Workspace Workspace */}
        <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-64 hidden md:block shrink-0">
            {/* <Sidebar /> */}
          </aside>

          {/* Dynamic Page Views */}
          <main className="flex-1 bg-white rounded-lg border border-navy/10 p-6 shadow-sm">
            {children}
          </main>
        </div>

        {/* Sticky Footer bottom */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}