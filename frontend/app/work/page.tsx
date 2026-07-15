// app/work/page.tsx
import React from "react";
import { API_URL } from "@/lib/api";
// 1. Import your custom WorkCard component using the absolute alias path
import { WorkCard } from "@/app/ui/workcard"; 

export default async function Works() {
  let works = [];
  let error = null;

  try {
    const response = await fetch(`${API_URL}/works`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch jobs");
    
    const payload = await response.json();
    works = payload.data || payload; 
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-navy/10 pb-4">
        <h1 className="text-3xl font-bold text-navy tracking-tight">Available Work Opportunities</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md text-sm">
          ⚠️ Could not load positions: {error}
        </div>
      )}

      {/* 2. Your map loop now references the cleanly imported component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((item: any) => (
          <WorkCard key={item.id} work={item} />
        ))}
      </div>
    </div>
  );
}