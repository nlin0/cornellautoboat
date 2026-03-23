import { NextResponse } from "next/server";
import { sql } from "lib/db";

/**
 * GET /api/health/db - Test Neon database connection.
 * Safe to call without auth (diagnostic only).
 */
export async function GET() {
  try {
    const url = process.env.AUTOBOATDB_URL || process.env.POSTGRES_URL;
    if (!url) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing AUTOBOATDB_URL or POSTGRES_URL",
          hint: "Run: npm run env:pull",
        },
        { status: 500 }
      );
    }

    // Test basic connection
    const ping = await sql`SELECT 1 as ok`;
    if (!ping?.rows?.[0]?.ok) {
      return NextResponse.json(
        { ok: false, error: "Connection test returned no rows" },
        { status: 500 }
      );
    }

    // Check if admins table exists
    let adminsExist = false;
    let adminsCount = 0;
    try {
      const adminsResult = await sql`
        SELECT COUNT(*)::int as n FROM admins
      `;
      adminsExist = true;
      adminsCount = (adminsResult?.rows?.[0] as { n: number })?.n ?? 0;
    } catch {
      adminsExist = false;
    }

    return NextResponse.json({
      ok: true,
      database: "connected",
      adminsTableExists: adminsExist,
      adminsCount,
      envVar: url.includes("@") ? "AUTOBOATDB_URL/POSTGRES_URL is set" : "check env",
    });
  } catch (err) {
    console.error("DB health check failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
        details: err instanceof Error ? err.stack : String(err),
      },
      { status: 500 }
    );
  }
}
