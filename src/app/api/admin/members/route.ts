import { NextResponse } from "next/server";
import { auth } from "auth";
import { sql } from "lib/db";

const SLUG_TO_SUBTEAMS: Record<string, string[]> = {
  team_leads: ["Team Leads"],
  hardware: ["Hardware", "Mechanical", "Robotics", "E-Systems"],
  software: ["Software", "Perception", "AI", "Controls", "ROS + Sims"],
  business: ["Business and Outreach"],
  mechanical: ["Mechanical"],
  robotics: ["Robotics"],
  esys: ["E-Systems"],
  perception: ["Perception"],
  ai: ["AI"],
  controls: ["Controls"],
  ros: ["ROS + Sims"],
};

function canManageSubteam(managed: string[] | null, subteam: string): boolean {
  if (!managed) return true;
  if (subteam === "Team Leads") return false;
  const allowed = new Set<string>();
  for (const slug of managed) {
    for (const s of SLUG_TO_SUBTEAMS[slug] || [slug]) {
      allowed.add(s);
    }
  }
  return allowed.has(subteam);
}

function getAllowedSubteams(managed: string[] | null): string[] {
  if (!managed) {
    return [...new Set(Object.values(SLUG_TO_SUBTEAMS).flat())];
  }
  const set = new Set<string>();
  for (const slug of managed) {
    for (const s of SLUG_TO_SUBTEAMS[slug] || []) set.add(s);
  }
  set.delete("Team Leads");
  return Array.from(set);
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const subteam = searchParams.get("subteam");
  const managed = session.user.managed_subteams;
  const allowedSubteams = getAllowedSubteams(managed);

  if (subteam && !canManageSubteam(managed, subteam)) {
    return NextResponse.json({ error: "Cannot manage this subteam" }, { status: 403 });
  }

  try {
    let rows: unknown[];
    if (subteam) {
      const result = await sql`
        SELECT id, netid, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, display_order
        FROM members
        WHERE subteam = ${subteam}
        ORDER BY display_order ASC, name
      `;
      rows = result.rows;
    } else {
      if (allowedSubteams.length === 0) {
        return NextResponse.json({ members: [] });
      }
      const result = await sql`
        SELECT id, netid, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, display_order
        FROM members
        WHERE subteam = ANY(${allowedSubteams})
        ORDER BY subteam ASC, display_order ASC, name
      `;
      rows = result.rows;
    }
    return NextResponse.json({ members: rows, subteams: allowedSubteams });
  } catch (err) {
    console.error("Failed to fetch members:", err);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { netid, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio } = body;

    if (!name || !subteam) {
      return NextResponse.json({ error: "name and subteam required" }, { status: 400 });
    }

    const managed = session.user.managed_subteams;
    if (!canManageSubteam(managed, subteam)) {
      return NextResponse.json({ error: "Cannot manage this subteam" }, { status: 403 });
    }

    const netidVal = netid ? String(netid).trim().toLowerCase() : null;

    if (netidVal) {
      const { rows: existingRows } = await sql`
        SELECT id, subteam FROM members WHERE netid = ${netidVal} LIMIT 1
      `;
      if (existingRows.length > 0) {
        const existingRow = existingRows[0] as { id: string; subteam: string };
        if (!canManageSubteam(managed, existingRow.subteam)) {
          return NextResponse.json({ error: "Cannot update member in that subteam" }, { status: 403 });
        }
        const { rows: orderRows } = await sql`
          SELECT COALESCE(MAX(display_order), -1) + 1 as next_order FROM members WHERE subteam = ${subteam}
        `;
        const nextOrder = (orderRows[0] as { next_order: number }).next_order;
        await sql`
          UPDATE members SET
            name = ${String(name)},
            image = ${image || null},
            role = ${role || ""},
            subteam = ${subteam},
            display_order = ${nextOrder},
            year = ${year || null},
            major = ${major || null},
            hometown = ${hometown || null},
            email = ${email || null},
            linkedin = ${linkedin || null},
            portfolio = ${portfolio || null},
            updated_at = NOW()
          WHERE id = ${existingRow.id}
        `;
        return NextResponse.json({ success: true, updated: true });
      }
    }

    const { rows } = await sql`
      SELECT COALESCE(MAX(display_order), -1) + 1 as next_order FROM members WHERE subteam = ${subteam}
    `;
    const nextOrder = (rows[0] as { next_order: number }).next_order;

    await sql`
      INSERT INTO members (netid, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, display_order)
      VALUES (
        ${netidVal},
        ${String(name)},
        ${image || null},
        ${role || ""},
        ${subteam},
        ${year || null},
        ${major || null},
        ${hometown || null},
        ${email || null},
        ${linkedin || null},
        ${portfolio || null},
        ${nextOrder}
      )
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to add member:", err);
    return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, netid, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, display_order } = body;

    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { rows } = await sql`
      SELECT name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, netid, display_order
      FROM members WHERE id = ${id}
    `;
    const existing = rows[0] as ({
      name: string | null;
      image: string | null;
      role: string | null;
      subteam: string | null;
      year: string | null;
      major: string | null;
      hometown: string | null;
      email: string | null;
      linkedin: string | null;
      portfolio: string | null;
      netid: string | null;
      display_order: number | null;
    }) | undefined;
    if (!existing) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    const targetSubteam = (subteam as string) || (existing.subteam as string);
    const managed = session.user.managed_subteams;
    if (!canManageSubteam(managed, existing.subteam as string) || !canManageSubteam(managed, targetSubteam)) {
      return NextResponse.json({ error: "Cannot manage this member" }, { status: 403 });
    }

    const netidVal = netid !== undefined ? (netid ? String(netid).trim().toLowerCase() : null) : (existing.netid as string | null);

    if (netidVal) {
      const { rows: conflict } = await sql`
        SELECT id FROM members WHERE netid = ${netidVal} AND id != ${id} LIMIT 1
      `;
      if (conflict.length > 0) {
        return NextResponse.json({ error: "NetID already used by another member" }, { status: 400 });
      }
    }

    const displayOrderVal =
      display_order !== undefined && display_order !== null && Number.isFinite(Number(display_order))
        ? Number(display_order)
        : (existing.display_order ?? 0);

    await sql`
      UPDATE members SET
        netid = ${netidVal},
        name = ${(name as string) ?? existing.name},
        image = ${(image as string) ?? existing.image},
        role = ${(role as string) ?? existing.role},
        subteam = ${targetSubteam},
        year = ${(year as string) ?? existing.year},
        major = ${(major as string) ?? existing.major},
        hometown = ${(hometown as string) ?? existing.hometown},
        email = ${(email as string) ?? existing.email},
        linkedin = ${(linkedin as string) ?? existing.linkedin},
        portfolio = ${(portfolio as string) ?? existing.portfolio},
        display_order = ${displayOrderVal},
        updated_at = NOW()
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update member:", err);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const idsParam = searchParams.get("ids");

  const idsToDelete = idsParam
    ? idsParam.split(",").map((s) => s.trim()).filter(Boolean)
    : id
      ? [id]
      : [];

  if (idsToDelete.length === 0) {
    return NextResponse.json({ error: "id or ids required" }, { status: 400 });
  }

  try {
    const managed = session.user.managed_subteams;
    const { rows } = await sql`
      SELECT id, subteam FROM members WHERE id = ANY(${idsToDelete})
    `;

    for (const row of rows as { id: string; subteam: string }[]) {
      if (!canManageSubteam(managed, row.subteam)) {
        return NextResponse.json(
          { error: `Cannot delete member in subteam: ${row.subteam}` },
          { status: 403 }
        );
      }
    }

    await sql`DELETE FROM members WHERE id = ANY(${idsToDelete})`;
    return NextResponse.json({ success: true, deleted: idsToDelete.length });
  } catch (err) {
    console.error("Failed to delete member:", err);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
