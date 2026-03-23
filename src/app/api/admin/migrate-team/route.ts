import { NextResponse } from "next/server";
import { auth } from "auth";
import { sql } from "lib/db";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const FILES = [
  { file: "team_leads.csv", team: "Team Leads", useTeamAsSubteam: true },
  { file: "hardware.csv", team: "Hardware", useTeamAsSubteam: false },
  { file: "software.csv", team: "Software", useTeamAsSubteam: false },
  { file: "business.csv", team: "Business and Outreach", useTeamAsSubteam: false },
];

export async function POST() {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dataDir = path.join(process.cwd(), "src", "app", "team", "data");
    let order = 0;
    let total = 0;

    for (const { file, team, useTeamAsSubteam } of FILES) {
      const filePath = path.join(dataDir, file);
      if (!fs.existsSync(filePath)) continue;

      const csv = fs.readFileSync(filePath, "utf8");
      const result = Papa.parse<Record<string, string>>(csv, {
        header: true,
        skipEmptyLines: true,
      });

      for (const row of result.data) {
        const netid =
          row.netid?.trim().toLowerCase() ||
          (row.email?.includes("@cornell.edu")
            ? row.email.split("@")[0].toLowerCase()
            : null);
        const subteam = useTeamAsSubteam ? team : (row.subteam || team);

        if (netid) {
          await sql`
            INSERT INTO members (netid, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, display_order)
            VALUES (
              ${netid},
              ${row.name || ""},
              ${row.image || null},
              ${row.role || ""},
              ${subteam},
              ${row.year || null},
              ${row.major || null},
              ${row.hometown || null},
              ${row.email || null},
              ${row.linkedin || null},
              ${row.portfolio || null},
              ${order}
            )
            ON CONFLICT (netid) DO UPDATE SET
              name = EXCLUDED.name,
              image = EXCLUDED.image,
              role = EXCLUDED.role,
              subteam = EXCLUDED.subteam,
              year = EXCLUDED.year,
              major = EXCLUDED.major,
              hometown = EXCLUDED.hometown,
              email = EXCLUDED.email,
              linkedin = EXCLUDED.linkedin,
              portfolio = EXCLUDED.portfolio,
              display_order = EXCLUDED.display_order,
              updated_at = NOW()
          `;
        } else {
          await sql`
            INSERT INTO members (netid, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, display_order)
            VALUES (
              ${netid},
              ${row.name || ""},
              ${row.image || null},
              ${row.role || ""},
              ${subteam},
              ${row.year || null},
              ${row.major || null},
              ${row.hometown || null},
              ${row.email || null},
              ${row.linkedin || null},
              ${row.portfolio || null},
              ${order}
            )
          `;
        }
        order++;
        total++;
      }
    }

    return NextResponse.json({ success: true, imported: total });
  } catch (err) {
    console.error("Migration failed:", err);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}
