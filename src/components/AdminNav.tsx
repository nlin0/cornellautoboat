"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

type AdminNavProps = {
  user: {
    email?: string | null;
    role?: string;
    super_admin_type?: string | null;
  };
};

export function AdminNav({ user }: AdminNavProps) {
  return (
    <nav className="mt-8 bg-white border-b border-[var(--light-gray)] px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="font-semibold text-[var(--accent)] hover:text-[var(--primary)]"
          >
            Admin Dashboard
          </Link>
          <span className="text-sm text-[var(--body-text)]">
            {user.email}
            {user.role === "super_admin" && user.super_admin_type && (
              <span className="ml-2 text-[var(--primary)]">
                ({user.super_admin_type.replace("_", " ")})
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-[var(--body-text)] hover:text-[var(--accent)]"
          >
            View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-sm px-3 py-1.5 text-[var(--primary)] hover:bg-[var(--accent4)] rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
