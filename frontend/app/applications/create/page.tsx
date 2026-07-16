// app/applications/create/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import axios from "axios";

interface WorkInfo {
    id: number;
    title: string;
    department: string;
}

export default function ApplicationCreatePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const workId = searchParams.get("work_id");

    const [work, setWork] = useState<WorkInfo | null>(null);
    const [candidateId, setCandidateId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {

        if (!workId) {
            setLoading(false);
            return;
        }

        axios.get(`${API_URL}/works/${workId}`)
            .then((response) => {
                setWork(response.data.data ?? response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching work:", err);
                setLoading(false);
            });
    }, [workId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            await axios.post(`${API_URL}/applications`, {
                work_id: workId,
                // apply_date and status are left out — the DB defaults
                // (useCurrent() and 'pending') will fill these in automatically
            });

            setMessage("✨ Application submitted!");
            setTimeout(() => {
                router.push("/works");
            }, 1200);

        } catch (error) {
            console.error("Error submitting application:", error);
            setMessage("❌ Failed to submit application.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

    if (!workId) {
        return (
            <div style={{ padding: "20px" }}>
                <p>No work opportunity selected. Please go back and click "Apply Now" from a listing.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h1 style={{ marginBottom: "20px" }}>Apply for this Position</h1>

            {message && (
                <div style={{
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "4px",
                    backgroundColor: message.includes("✨") ? "#e6fffa" : "#fff5f5",
                    color: message.includes("✨") ? "#00816a" : "#e53e3e"
                }}>
                    {message}
                </div>
            )}

            <div style={{ marginBottom: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
                <p><strong>Position:</strong> {work?.title ?? `Work #${workId}`}</p>
                <p><strong>Department:</strong> {work?.department ?? "—"}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: "10px 15px",
                        fontSize: "16px",
                        backgroundColor: isSubmitting ? "#aaa" : "#0070f3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                        width: "100%",
                    }}
                >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
}