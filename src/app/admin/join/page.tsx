"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function JoinForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [invite, setInvite] = useState<{ email: string; role: string; super_admin_type?: string | null; managed_subteams?: string[] | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("No invite token provided");
      return;
    }
    fetch(`/api/admin/invites/${token}`)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Invalid invite")))
      .then(setInvite)
      .catch(() => setError("Invalid or expired invite"));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--secondary2)] px-4">
        <div className="text-center text-[var(--primary-text)]">
          <p>No invite token provided.</p>
          <Link href="/admin/login" className="text-[var(--primary)] underline mt-2 inline-block">Go to login</Link>
        </div>
      </div>
    );
  }

  if (error && !invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--secondary2)] px-4">
        <div className="text-center">
          <p className="text-[var(--primary-text)]">{error}</p>
          <Link href="/admin/login" className="text-[var(--primary)] underline mt-2 inline-block">Go to login</Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--secondary2)] px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-[var(--accent)] mb-2">Account Created</h1>
          <p className="text-[var(--body-text)] mb-4">You can now sign in with your email and password.</p>
          <Link href="/admin/login" className="inline-block py-2 px-4 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)]">Sign In</Link>
        </div>
      </div>
    );
  }

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--secondary2)]">
        <p className="text-[var(--body-text)]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--secondary2)] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-[var(--light-gray)]">
        <h1 className="text-2xl font-bold text-[var(--accent)] mb-2">Create Admin Account</h1>
        <p className="text-[var(--body-text)] mb-6">
          You've been invited as {invite.role === "super_admin" ? "super-admin" : "admin"}.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded bg-[var(--accent4)] text-[var(--primary-text)] text-sm">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-[var(--body-text)] mb-1">Email</label>
            <input
              type="email"
              value={invite.email}
              readOnly
              className="w-full px-4 py-2 border border-[var(--light-gray)] rounded-md bg-[var(--light-gray-bg)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--body-text)] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border border-[var(--light-gray)] rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--body-text)] mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border border-[var(--light-gray)] rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[var(--primary)] text-white font-medium rounded-md hover:bg-[var(--primary-dark)] disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[var(--secondary2)]">Loading...</div>}>
      <JoinForm />
    </Suspense>
  );
}
