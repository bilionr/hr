// app/ui/workcard.tsx
'use client';
import { API_URL } from "@/lib/api";
import Link from "next/link";

interface WorkItem {
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

export function WorkCard({ work }: { work: WorkItem }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition border border-[#E8D1B7] flex flex-col justify-between">
      <div>
        <div className="relative">
          {/* Dynamically fallback to a default image if none exists */}
          <img
            src={work.image_url || "https://thumbs.dreamstime.com/b/handsome-stylish-modern-african-american-business-man-entrepreneur-executive-sitting-outside-office-cheerful-smile-155856257.jpg"}
            alt={work.title}
            className="w-full h-52 object-cover"
          />
        </div>

        <div className="p-6">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-navy text-xs font-semibold uppercase tracking-wider">
            {work.type || "Full-Time"}
          </span>

          <h2 className="mt-3 text-2xl font-bold text-navy font-k2d">
            {work.title}
          </h2>

          <p className="mt-2 text-gray-600 font-medium">
            {work.department}
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-500">
            <p>📍 {work.location || "Remote"}</p>
            <p>💰 {work.salary || "Competitive"}</p>
            <p>📅 Closing: {work.closing_date || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="px-6 pb-6 flex items-center gap-2">
        {/* Main View Details Button (takes up remaining space) */}
        <Link
          href={`/work/${work.id}`}
          className="flex-1 inline-flex items-center justify-center rounded-lg bg-navy hover:bg-[#164A82] text-white px-4 py-3 transition-colors font-semibold text-sm"
        >
          View Details
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </Link>

        {/* Edit Icon Button */}
        <Link
          href={`/works/${work.id}/edit`}
          className="p-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#162D5D] transition-colors flex items-center justify-center"
          title="Edit Work"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>

        {/* Delete Icon Button */}
        {/* Delete Icon Button */}
        <button
          type="button"
          onClick={async () => {
            try {
              const formData = new FormData();
              formData.append("_method", "DELETE");

              const response = await fetch(`${API_URL}/works/${work.id}`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: formData,
              });

              if (response.ok) {
                window.location.reload();
              } else {
                alert("Failed to delete.");
              }
            } catch (err) {
              console.error(err);
            }
          }}
          className="p-3 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
        >
          {/* Your SVG or icon goes here */}
        </button>
      </div>
    </div>
  );
}