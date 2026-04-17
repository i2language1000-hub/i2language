"use client";
import { useState } from "react";
import SectionIntro from "@/components/SectionIntro";

export default function AdminLoginPage({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@example.com", // ✅ fixed
          password,
        }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        onLogin(data.token);
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="section-shell max-w-lg mx-auto">
        <SectionIntro
          eyebrow="Admin Access"
          title="Secure Panel Login"
          description="Enter admin password"
        />

        <div className="mt-8 bg-white p-8 rounded-xl shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password"
              className="input-shell w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />

            {error && <p className="text-red-500">{error}</p>}

            <button className="cta-primary w-full" disabled={loading}>
              {loading ? "Checking..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}