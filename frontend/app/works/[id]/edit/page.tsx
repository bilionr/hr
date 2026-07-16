// app/works/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import axios from "axios";

export default function WorkEditPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // 1. Fetch current data
    useEffect(() => {
        if (!id) return;

        axios.get(`${API_URL}/works/${id}`)
            .then((response) => {
                setTitle(response.data.title || "");
                setDescription(response.data.description || "");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching work:", error);
                setLoading(false);
            });
    }, [id]);

    // 2. Handle Form Submission — sent as real form-data (multipart), like a native <form>
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        const formData = new FormData();
        formData.append("_method", "PUT"); // Laravel method spoofing — only works with form-data, not JSON
        formData.append("title", title);
        formData.append("description", description);

        try {
            await axios.post(`${API_URL}/works/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                },
            });

            setMessage("✨ Updated successfully!");
        } catch (error) {
            console.error("Error updating work:", error);
            setMessage("❌ Failed to update data. Please try again.");
        } finally {
            setIsSubmitting(false);
            router.push("/works");
        }
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading data...</div>;

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>

            <div style={{ marginBottom: "30px", padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
                <h2 style={{ marginTop: 0 }}>Section 1: Current Live Data</h2>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Title:</strong> {title || "(Empty)"}</p>
                <p><strong>Description:</strong> {description || "(Empty)"}</p>
            </div>

            <hr style={{ border: "0", borderTop: "2px dashed #ccc", margin: "30px 0" }} />

            <div>
                <h2>Section 2: Edit Information</h2>

                {message && (
                    <div style={{ padding: "10px", marginBottom: "15px", borderRadius: "4px", backgroundColor: message.includes("✨") ? "#e6fffa" : "#fff5f5", color: message.includes("✨") ? "#00816a" : "#e53e3e" }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label htmlFor="title"><strong>Work Title</strong></label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label htmlFor="description"><strong>Description</strong></label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc", resize: "vertical" }}
                        />
                    </div>

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
                            fontWeight: "bold"
                        }}
                    >
                        {isSubmitting ? "Updating..." : "Save Changes"}
                    </button>

                </form>
            </div>

        </div>
    );
}