// app/ui/workcard.tsx
import Link from "next/link";

// If using TypeScript, keep the interface. If using JS, delete these lines:
interface WorkItem {
  id: number;
  title: string;
  department: string;
  description: string;
}

export function WorkCard({ work }: { work: WorkItem }) {
return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition border border-[#E8D1B7] flex flex-col justify-between">
      <div>
        <div className="relative">
          {/* Dynamically fallback to a default image if none exists */}
          <img
            src={work.image_url || "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b131dc71-7fae-48c5-a552-bbb67174c5c4/NIKE+ZOOM+SKYLON+11.png"}
            alt={work.title}
            className="w-full h-52 object-cover"
          />
          <div className="absolute top-3 right-3">
            <button className="bg-white rounded-full p-2 shadow hover:bg-gray-100">
              <i className="fa-solid fa-ellipsis-vertical text-navy"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-navy text-xs font-semibold uppercase tracking-wider">
            {work.type || "Full-Time"}
          </span>

          <h2 className="mt-3 text-2xl font-bold text-navy font-k2d">
            {work.title}
          </h2>

          <p className="mt-2 text-gray-600 font-medium">
            {work.company || "CareerAdmin Inc"}
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-500">
            <p>📍 {work.location || "Remote"}</p>
            <p>💰 {work.salary || "Competitive"}</p>
            <p>📅 Closing: {work.closing_date || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Link
          href={`/work/${work.id}`}
          className="w-full inline-flex items-center justify-center rounded-lg bg-navy hover:bg-[#164A82] text-white px-5 py-3 transition-colors font-semibold"
        >
          View Details
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </div>
  );
}