/**
 * Database client for admin and auth operations.
 * Uses Neon serverless driver (AUTOBOATDB_URL or POSTGRES_URL).
 */
import { neon } from "@neondatabase/serverless";

function getConnectionString(): string {
  const url =
    process.env.AUTOBOATDB_URL ||
    process.env.AUTOBOATDB_DATABASE_URL ||
    process.env.AUTOBOATDB_POSTGRES_URL ||
    process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "Missing database URL. Run: npm run env:pull (look for AUTOBOATDB_* or POSTGRES_URL)"
    );
  }
  return url;
}

let _sql: ReturnType<typeof neon<false, true>> | null = null;

function getSql() {
  if (!_sql) {
    _sql = neon(getConnectionString(), { fullResults: true });
  }
  return _sql;
}

/** Lazy sql client - only connects when first used (avoids build-time errors) */
export const sql = new Proxy(function () {} as unknown as ReturnType<typeof neon<false, true>>, {
  apply(_, __, args) {
    return getSql()(args[0], ...args.slice(1));
  },
  get(_, prop) {
    return getSql()[prop as keyof ReturnType<typeof neon<false, true>>];
  },
});

export type AdminRow = {
  id: string;
  email: string;
  password_hash: string;
  role: "super_admin" | "admin";
  super_admin_type: "team_lead" | "business_lead" | null;
  created_at: Date;
  updated_at: Date;
};
