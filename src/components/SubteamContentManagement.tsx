"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getBlobUrl } from "@/app/team/blobImageMap";

const TECHNICAL_SUBTEAMS = [
  { slug: "mechanical", name: "Mechanical" },
  { slug: "robotics", name: "Robotics" },
  { slug: "esys", name: "Electrical Systems" },
  { slug: "perception", name: "Perception" },
  { slug: "ai", name: "Artificial Intelligence" },
  { slug: "controls", name: "Controls" },
  { slug: "ros", name: "ROS + Simulations" },
];

type SubteamContentManagementProps = {
  isSuperAdmin: boolean;
  managedSubteams: string[] | null;
};

function canManage(managed: string[] | null, slug: string): boolean {
  if (!managed) return true;
  return managed.includes(slug);
}

export function SubteamContentManagement({ isSuperAdmin, managedSubteams }: SubteamContentManagementProps) {
  const [selectedSlug, setSelectedSlug] = useState("");
  const [content, setContent] = useState<{ description: string | null; hero_image: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroUploading, setHeroUploading] = useState(false);
  const [heroError, setHeroError] = useState<string | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const allowed = TECHNICAL_SUBTEAMS.filter((s) => canManage(managedSubteams, s.slug));

  const fetchContent = useCallback(async () => {
    if (!selectedSlug) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/subteam-content?slug=${selectedSlug}`);
      if (res.ok) {
        const data = await res.json();
        setContent(data);
        setDescription(data.description || "");
        setHeroImage(data.hero_image || "");
      }
    } catch {
      setContent(null);
    } finally {
      setLoading(false);
    }
  }, [selectedSlug]);

  useEffect(() => {
    if (allowed.length > 0 && !selectedSlug) setSelectedSlug(allowed[0].slug);
  }, [allowed, selectedSlug]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  async function handleHeroFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !selectedSlug) return;

    setHeroError(null);
    setHeroUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("name", selectedSlug);
      formData.set("type", "hero");

      const res = await fetch("/api/admin/upload-photo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setHeroImage(data.path);
    } catch (err) {
      setHeroError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setHeroUploading(false);
      e.target.value = "";
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/subteam-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selectedSlug,
          description: description || null,
          hero_image: heroImage || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      fetchContent();
    } catch {
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  }

  if (allowed.length === 0) return null;

  return (
    <section className="bg-white rounded-lg border border-[var(--light-gray)] p-6">
      <h2 className="text-lg font-semibold text-[var(--accent)] mb-4">(WIP DON'T TOUCHY!!) Subteam Page Content</h2>
      <p className="text-sm text-[var(--body-text)] mb-4">
        ignore this page for now. this might break something.
        Future usage would be to edit description and hero image for technical subteam pages.
      </p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Subteam</label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
        >
          {allowed.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
            placeholder="Subteam description..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hero Image</label>
          <div className="flex flex-wrap items-center gap-3">
            {heroImage && (
              <div className="relative w-24 h-16 rounded overflow-hidden border border-[var(--light-gray)] bg-[var(--light-gray)]">
                <img
                  src={heroImage.startsWith("/") ? getBlobUrl(heroImage) : heroImage}
                  alt="Hero preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <input
                ref={heroInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleHeroFileChange}
                disabled={heroUploading || !selectedSlug}
                className="text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border file:border-[var(--light-gray)] file:bg-white file:text-sm file:font-medium"
              />
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="w-64 px-2 py-1 border border-[var(--light-gray)] rounded text-sm"
                placeholder="Or paste path: /team/subteamHeroes/mechanical.webp"
              />
            </div>
          </div>
          {heroUploading && <p className="text-xs text-[var(--body-text)] mt-1">Uploading…</p>}
          {heroError && <p className="text-xs text-red-600 mt-1">{heroError}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-md hover:bg-[var(--primary-dark)] disabled:opacity-60"
        >
          Save
        </button>
      </form>
    </section>
  );
}
