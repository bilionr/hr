// app/applications/page.tsx
"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import axios from "axios";

interface Application {
    id: number;
    apply_date: string;
    status: string;
    candidate: {
        id: number;
        name: string;
    };
    work: {
        id: number;
        title: string;
    };
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/applications`)
            .then((response) => {
                setApplications(response.data.data ?? response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching applications:", err);
                setError("Failed to load applications.");
                setLoading(false);
            });
    }, []);

    const statusColor = (status: string) => {
        switch (status) {
            case "shortlisted": return { bg: "#e6fffa", color: "#00816a" };
            case "reviewed": return { bg: "#ebf8ff", color: "#2b6cb0" };
            case "rejected": return { bg: "#fff5f5", color: "#e53e3e" };
            default: return { bg: "#fffaf0", color: "#c05621" }; // pending
        }
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading applications...</div>;
    if (error) return <div style={{ padding: "20px", color: "#e53e3e" }}>{error}</div>;

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1 style={{ marginBottom: "20px" }}>Submitted Applications</h1>

            {applications.length === 0 ? (
                <p>No applications submitted yet.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                            <th style={{ padding: "10px" }}>ID</th>
                            <th style={{ padding: "10px" }}>Candidate</th>
                            <th style={{ padding: "10px" }}>Work</th>
                            <th style={{ padding: "10px" }}>Apply Date</th>
                            <th style={{ padding: "10px" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => {
                            const sc = statusColor(app.status);
                            return (
                                <tr key={app.id} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "10px" }}>{app.id}</td>
                                    <td style={{ padding: "10px" }}>{app.candidate?.name ?? "—"}</td>
                                    <td style={{ padding: "10px" }}>{app.work?.title ?? "—"}</td>
                                    <td style={{ padding: "10px" }}>{app.apply_date}</td>
                                    <td style={{ padding: "10px" }}>
                                        <span style={{
                                            padding: "4px 10px",
                                            borderRadius: "12px",
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                            backgroundColor: sc.bg,
                                            color: sc.color,
                                            textTransform: "capitalize",
                                        }}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}