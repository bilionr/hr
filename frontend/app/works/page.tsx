import { API_URL } from "@/lib/api";
import { WorkCard } from "../ui/workcard";
import Link from "next/link";

export interface WorkItem {
  id: number;
  title: string;
  department: string;
  description: string;
  image_url?: string;
  type?: string;
  company?: string;
  location?: string;
  salary?: string;
  closing_date?: string;
}

export default async function Works() {
  const resp = await fetch(`${API_URL}/works`)
  const works: WorkItem[] = await resp.json()

  return (
    <div className="space-y-6">
      <div className="border-b border-navy/10 pb-4 flex items-center justify-between" >
        <h1 className="text-3xl font-bold text-navy tracking-tight">Available Work Opportunities</h1>
      </div>

      {/* Add Button */}
      <Link 
        href="/works/create" 
        className="px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Work
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((item: any) => (
          <WorkCard key={item.id} work={item} />
        ))}
      </div>
    </div>
  );
}