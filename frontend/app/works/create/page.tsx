"use client"; // Crucial for forms and interactivity

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import axios from "axios";

export default function WorkCreatePage() {
    const router = useRouter();

    // States to track input values and submission status
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            await axios.post(`${API_URL}/works`, {
                title: title,
                description: description,
                department: department,
            });

            setMessage("✨ New work opportunity created!");

            // Redirect the user back to the main list after a brief delay
            setTimeout(() => {
                router.push("/works");
                router.refresh(); // Ensures the new item shows up immediately
            }, 1200);

        } catch (error) {
            console.error("Error creating work opportunity:", error);
            setMessage("❌ Failed to create work opportunity.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h1 style={{ marginBottom: "20px" }}>Add New Work Opportunity</h1>

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
                    <label htmlFor="title"><strong>Work Department</strong></label>
                    <input
                        id="department"
                        name="department"
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
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
                    {isSubmitting ? "Creating..." : "Create Opportunity"}
                </button>
            </form>
        </div>
    );
}