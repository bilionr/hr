// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await api.post("/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            localStorage.setItem("auth_token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            router.push("/works");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h1>Register</h1>
            {error && <p style={{ color: "#e53e3e" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: "8px" }} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "8px" }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "8px" }} />
                <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required style={{ padding: "8px" }} />
                <button type="submit" disabled={isSubmitting} style={{ padding: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "4px" }}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}