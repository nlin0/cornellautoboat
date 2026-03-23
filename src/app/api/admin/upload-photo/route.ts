import { NextResponse } from "next/server";
import { auth } from "auth";
import { put } from "@vercel/blob";
import sharp from "sharp";

/** Convert "John Doe" -> "john_doe" for blob path */
function nameToSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Image upload not configured. BLOB_READ_WRITE_TOKEN is required." },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string | null;
    const type = formData.get("type") as string | null; // "member" | "hero"

    if (!file || !file.size) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, JPEG, and PNG images are supported" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let blobPath: string;

    if (type === "hero" && name) {
      const slug = nameToSlug(name);
      blobPath = `team/subteamHeroes/${slug}.webp`;
    } else {
      if (!name || !name.trim()) {
        return NextResponse.json(
          { error: "Member name required to generate image path" },
          { status: 400 }
        );
      }
      const slug = nameToSlug(name);
      if (!slug) {
        return NextResponse.json(
          { error: "Could not derive filename from name" },
          { status: 400 }
        );
      }
      blobPath = `team/teamPhotos/${slug}.webp`;
    }

    const webpBuffer = await sharp(buffer)
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    await put(blobPath, webpBuffer, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });

    const storedPath = `/${blobPath.replace(/^\/+/, "")}`;
    return NextResponse.json({ path: storedPath });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
