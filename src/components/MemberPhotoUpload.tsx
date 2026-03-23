"use client";

import { useState, useRef } from "react";
import { getBlobUrl } from "@/app/team/blobImageMap";

type MemberPhotoUploadProps = {
  value: string;
  onChange: (path: string) => void;
  nameHint: string;
};

export function MemberPhotoUpload({
  value,
  onChange,
  nameHint,
}: MemberPhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!nameHint.trim()) {
      setError("Enter member name first (used for filename)");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("name", nameHint.trim());
      formData.set("type", "member");

      const res = await fetch("/api/admin/upload-photo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-[var(--body-text)]">
        Photo
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {value && (
          <div className="relative w-12 h-12 rounded overflow-hidden border border-[var(--light-gray)] bg-[var(--light-gray)]">
            <img
              src={value.startsWith("/") ? getBlobUrl(value) : value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            disabled={uploading || !nameHint.trim()}
            className="text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border file:border-[var(--light-gray)] file:bg-white file:text-sm file:font-medium"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-[var(--body-text)] hover:underline"
            >
              Clear photo
            </button>
          )}
        </div>
      </div>
      {uploading && (
        <p className="text-xs text-[var(--body-text)]">Uploading…</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
      {!nameHint.trim() && (
        <p className="text-xs text-[var(--body-text)]">
          Enter name above to upload (saved as firstname_lastname.webp)
        </p>
      )}
    </div>
  );
}
