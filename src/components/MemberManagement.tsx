"use client";

import { useState, useEffect, useCallback } from "react";
import { MemberPhotoUpload } from "./MemberPhotoUpload";
import { getBlobUrl } from "@/app/team/blobImageMap";

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

type Member = {
  id: string;
  netid: string | null;
  name: string;
  image: string | null;
  role: string;
  subteam: string;
  year: string | null;
  major: string | null;
  hometown: string | null;
  email: string | null;
  linkedin: string | null;
  portfolio: string | null;
  display_order: number;
};

type MemberManagementProps = {
  isSuperAdmin: boolean;
  managedSubteams: string[] | null;
};

function getAllowedSubteams(managed: string[] | null, isSuperAdmin: boolean): string[] {
  if (!managed) {
    return [...new Set(Object.values(SLUG_TO_SUBTEAMS).flat())];
  }
  const set = new Set<string>();
  for (const slug of managed) {
    for (const s of SLUG_TO_SUBTEAMS[slug] || []) set.add(s);
  }
  if (!isSuperAdmin) {
    set.delete("Team Leads");
  }
  return Array.from(set);
}

export function MemberManagement({ isSuperAdmin, managedSubteams }: MemberManagementProps) {
  const allowed = getAllowedSubteams(managedSubteams, isSuperAdmin);
  const [selectedSubteam, setSelectedSubteam] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState<Partial<Member>>({});
  const [search, setSearch] = useState("");
  const [showUnfinishedOnly, setShowUnfinishedOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [addSubteam, setAddSubteam] = useState(allowed[0] || "");

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const url = selectedSubteam
        ? `/api/admin/members?subteam=${encodeURIComponent(selectedSubteam)}`
        : "/api/admin/members";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [selectedSubteam]);

  useEffect(() => {
    if (allowed.length > 0 && !addSubteam) setAddSubteam(allowed[0]);
  }, [allowed, addSubteam]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const DEFAULT_IMAGE = "/team/teamPhotos/Full_Team_2.webp";
  const isUnfinished = (m: Member) => {
    const img = (m.image || "").trim();
    const major = (m.major || "").trim();
    const hometown = (m.hometown || "").trim();
    const year = (m.year || "").trim();
    return (
      !img ||
      img === DEFAULT_IMAGE ||
      !major ||
      major.toUpperCase() === "MAJOR" ||
      !hometown ||
      hometown.toUpperCase() === "PLACE" ||
      !year
    );
  };

  const filteredMembers = members.filter((m) => {
    if (showUnfinishedOnly && !isUnfinished(m)) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (m.name || "").toLowerCase().includes(q) ||
      (m.netid || "").toLowerCase().includes(q) ||
      (m.email || "").toLowerCase().includes(q) ||
      (m.role || "").toLowerCase().includes(q) ||
      (m.subteam || "").toLowerCase().includes(q)
    );
  });

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, subteam: addSubteam }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setShowAdd(false);
      setFormData({});
      setAddSubteam(allowed[0] || "");
      fetchMembers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/members", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...formData }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setEditing(null);
      setFormData({});
      fetchMembers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this member?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/members?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      fetchMembers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Remove ${selectedIds.size} selected member(s)?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/members?ids=${Array.from(selectedIds).join(",")}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setSelectedIds(new Set());
      fetchMembers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  async function moveMemberInSubteam(member: Member, direction: "up" | "down") {
    const peers = members
      .filter((m) => m.subteam === member.subteam)
      .sort((a, b) => a.display_order - b.display_order || a.name.localeCompare(b.name));
    const idx = peers.findIndex((m) => m.id === member.id);
    if (idx < 0) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= peers.length) return;

    const other = peers[swapIdx];
    setLoading(true);
    try {
      const first = await fetch("/api/admin/members", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: member.id, display_order: other.display_order }),
      });
      if (!first.ok) throw new Error((await first.json()).error || "Failed to move member");

      const second = await fetch("/api/admin/members", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: other.id, display_order: member.display_order }),
      });
      if (!second.ok) throw new Error((await second.json()).error || "Failed to move member");

      fetchMembers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to move member");
    } finally {
      setLoading(false);
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === filteredMembers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredMembers.map((m) => m.id)));
    }
  }

  if (allowed.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[var(--light-gray)] p-6">
        <p className="text-[var(--body-text)]">You do not have permission to manage any subteams.</p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-lg border border-[var(--light-gray)] p-6">
      <h2 className="text-lg font-semibold text-[var(--accent)] mb-4">Manage Members</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Filter by subteam</label>
          <select
            value={selectedSubteam}
            onChange={(e) => setSelectedSubteam(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
          >
            <option value="">All subteams</option>
            {allowed.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, netid, email, role..."
            className="w-full px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnfinishedOnly}
              onChange={(e) => setShowUnfinishedOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Missing Fields (missing major or hometown)</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => {
            setShowAdd(true);
            setEditing(null);
            setFormData({});
            setAddSubteam(allowed[0] || "");
          }}
          className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-md hover:bg-[var(--primary-dark)]"
        >
          Add Member
        </button>
        {selectedIds.size > 0 && (
          <button
            type="button"
            onClick={handleBulkDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 disabled:opacity-60"
          >
            Delete {selectedIds.size} selected
          </button>
        )}
      </div>
      <p className="text-xs text-[var(--body-text)] mb-3">
        Use the arrows in Rank to reorder members within the same subteam.
      </p>

      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 p-4 border rounded space-y-2">
          <h3 className="font-medium">Add Member</h3>
          <div>
            <label className="block text-sm mb-1">Subteam</label>
            <select
              value={addSubteam}
              onChange={(e) => setAddSubteam(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              {allowed.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <input placeholder="NetID" value={formData.netid || ""} onChange={(e) => setFormData({ ...formData, netid: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Role" value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <MemberPhotoUpload value={formData.image || ""} onChange={(path: string) => setFormData({ ...formData, image: path })} nameHint={formData.name || ""} />
          <input placeholder="Year" value={formData.year || ""} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Major" value={formData.major || ""} onChange={(e) => setFormData({ ...formData, major: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Hometown" value={formData.hometown || ""} onChange={(e) => setFormData({ ...formData, hometown: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Email" type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="LinkedIn" value={formData.linkedin || ""} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Portfolio" value={formData.portfolio || ""} onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="px-3 py-1 bg-[var(--primary)] text-white text-sm rounded">Add</button>
            <button type="button" onClick={() => setShowAdd(false)} className="px-3 py-1 border rounded text-sm">Cancel</button>
          </div>
        </form>
      )}

      {editing && (
        <form onSubmit={handleUpdate} className="mb-6 p-4 border rounded space-y-2">
          <h3 className="font-medium">Edit Member</h3>
          <div>
            <label className="block text-sm mb-1">Subteam</label>
            <select
              value={formData.subteam ?? editing.subteam}
              onChange={(e) => setFormData({ ...formData, subteam: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              {allowed.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <input placeholder="NetID" value={formData.netid ?? editing.netid ?? ""} onChange={(e) => setFormData({ ...formData, netid: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Name" value={formData.name ?? editing.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Role" value={formData.role ?? editing.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <MemberPhotoUpload value={formData.image ?? editing.image ?? ""} onChange={(path: string) => setFormData({ ...formData, image: path })} nameHint={formData.name ?? editing.name ?? ""} />
          <input placeholder="Year" value={formData.year ?? editing.year ?? ""} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Major" value={formData.major ?? editing.major ?? ""} onChange={(e) => setFormData({ ...formData, major: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Hometown" value={formData.hometown ?? editing.hometown ?? ""} onChange={(e) => setFormData({ ...formData, hometown: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Email" type="email" value={formData.email ?? editing.email ?? ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="LinkedIn" value={formData.linkedin ?? editing.linkedin ?? ""} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <input placeholder="Portfolio" value={formData.portfolio ?? editing.portfolio ?? ""} onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" />
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="px-3 py-1 bg-[var(--primary)] text-white text-sm rounded">Save</button>
            <button type="button" onClick={() => { setEditing(null); setFormData({}); }} className="px-3 py-1 border rounded text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--light-gray)]">
              <th className="text-left py-2 px-2">
                <input
                  type="checkbox"
                  checked={filteredMembers.length > 0 && selectedIds.size === filteredMembers.length}
                  onChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th className="text-left py-2 px-2">Photo</th>
              <th className="text-left py-2 px-2">Name</th>
              <th className="text-left py-2 px-2">NetID</th>
              <th className="text-left py-2 px-2">Subteam</th>
              <th className="text-left py-2 px-2">Rank</th>
              <th className="text-left py-2 px-2">Role</th>
              <th className="text-left py-2 px-2">Year</th>
              <th className="text-left py-2 px-2">Major</th>
              <th className="text-left py-2 px-2">Email</th>
              <th className="text-left py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((m) => (
              <tr key={m.id} className="border-b border-[var(--light-gray)] hover:bg-[var(--light-gray-bg)]">
                <td className="py-2 px-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(m.id)}
                    onChange={() => toggleSelect(m.id)}
                    aria-label={`Select ${m.name}`}
                  />
                </td>
                <td className="py-2 px-2">
                  {m.image ? (
                    <img
                      src={getBlobUrl(m.image)}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <span className="text-[var(--body-text)]">—</span>
                  )}
                </td>
                <td className="py-2 px-2 font-medium">{m.name}</td>
                <td className="py-2 px-2">{m.netid || "—"}</td>
                <td className="py-2 px-2">{m.subteam}</td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs min-w-[2ch]">{m.display_order + 1}</span>
                    <button
                      type="button"
                      onClick={() => moveMemberInSubteam(m, "up")}
                      disabled={loading}
                      className="px-1.5 py-0.5 border rounded text-xs disabled:opacity-50"
                      title="Move up within subteam"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMemberInSubteam(m, "down")}
                      disabled={loading}
                      className="px-1.5 py-0.5 border rounded text-xs disabled:opacity-50"
                      title="Move down within subteam"
                    >
                      ↓
                    </button>
                  </div>
                </td>
                <td className="py-2 px-2">{m.role}</td>
                <td className="py-2 px-2">{m.year || "—"}</td>
                <td className="py-2 px-2">{m.major || "—"}</td>
                <td className="py-2 px-2">{m.email || "—"}</td>
                <td className="py-2 px-2">
                  <button
                    type="button"
                    onClick={() => { setEditing(m); setShowAdd(false); setFormData({}); }}
                    className="text-[var(--primary)] hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    disabled={loading}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredMembers.length === 0 && !loading && (
        <p className="text-sm text-[var(--body-text)] py-4">
          {search ? "No members match your search." : "No members in selected subteam(s)."}
        </p>
      )}
    </section>
  );
}
