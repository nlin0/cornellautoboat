import { NextResponse } from "next/server";
import { auth } from "auth";
import { sql } from "lib/db";

const SLUG_TO_MANAGED_SLUGS: Record<string, string[]> = {
  hardware: ["hardware", "mechanical", "robotics", "esys"],
  software: ["software", "perception", "ai", "controls", "ros"],
  business: ["business"],
  mechanical: ["mechanical"],
  robotics: ["robotics"],
  esys: ["esys"],
  perception: ["perception"],
  ai: ["ai"],
  controls: ["controls"],
  ros: ["ros"],
};

function canManage(
  managed: string[] | null,
  isSuperAdmin: boolean,
  slug: string
): boolean {
  if (isSuperAdmin) return true;
  if (!managed || managed.length === 0) return false;
  const allowed = new Set<string>();
  for (const key of managed) {
    const expanded = SLUG_TO_MANAGED_SLUGS[key] || [key];
    for (const s of expanded) allowed.add(s);
  }
  return allowed.has(slug);
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const isSuperAdmin = session.user.role === "super_admin";
  if (!canManage(session.user.managed_subteams, isSuperAdmin, slug)) {
    return NextResponse.json({ error: "Cannot manage this subteam" }, { status: 403 });
  }

  try {
    const { rows } = await sql`
      SELECT subteam_slug, description, hero_image, content_json
      FROM subteam_page_content
      WHERE subteam_slug = ${slug}
      LIMIT 1
    `;
    const row = rows[0];
    return NextResponse.json(row || { subteam_slug: slug, description: null, hero_image: null, content_json: null });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, description, hero_image, content_json } = body;

    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const isSuperAdmin = session.user.role === "super_admin";
    if (!canManage(session.user.managed_subteams, isSuperAdmin, slug)) {
      return NextResponse.json({ error: "Cannot manage this subteam" }, { status: 403 });
    }

    const descVal = description ?? null;
    const heroVal = hero_image ?? null;
    const jsonVal = content_json ? JSON.stringify(content_json) : null;

    await sql`
      INSERT INTO subteam_page_content (subteam_slug, description, hero_image, content_json, updated_at)
      VALUES (${slug}, ${descVal}, ${heroVal}, ${jsonVal}, NOW())
      ON CONFLICT (subteam_slug) DO UPDATE SET
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        content_json = EXCLUDED.content_json,
        updated_at = NOW()
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update subteam content:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
