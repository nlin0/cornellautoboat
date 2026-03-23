"use client";

import { useState, useEffect, useCallback } from "react";
import { SUBTEAMS } from "@/lib/subteams";

type Admin = {
  id: string;
  netid: string | null;
  email: string;
  role: string;
  super_admin_type: string | null;
  managed_subteams: string[] | null;
  created_at: string;
};

type ManageAdminsProps = {
  currentUserId: string;
};

export function ManageAdmins({ currentUserId }: ManageAdminsProps) {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteNetid, setInviteNetid] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "super_admin">("admin");
  const [inviteSuperAdminType, setInviteSuperAdminType] = useState<
    "team_lead" | "business_lead"
  >("team_lead");
  const [inviteManagedSubteams, setInviteManagedSubteams] = useState<string[]>(
    []
  );
  const [inviteSyncTeamCardRole, setInviteSyncTeamCardRole] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [inviteEmailError, setInviteEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addNetid, setAddNetid] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addSyncTeamCardRole, setAddSyncTeamCardRole] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState(false);
  const [migrateStatus, setMigrateStatus] = useState<string | null>(null);

  const fetchAdmins = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/admins");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data.admins || []);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  async function handleCreateInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviteLink(null);
    setInviteSent(false);
    setAddError(null);
    setLoading(true);
    try {
      const body: Record<string, unknown> = {
        email: inviteEmail,
        netid: inviteNetid || undefined,
        role: inviteRole,
      };
      if (inviteRole === "super_admin") {
        body.super_admin_type = inviteSuperAdminType;
      } else {
        body.managed_subteams = inviteManagedSubteams;
      }
      body.sync_team_card_role = inviteSyncTeamCardRole;
      const res = await fetch("/api/admin/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create invite");
      setInviteLink(data.joinUrl ?? null);

      if (data.emailSent === true) {
        setInviteSent(true);
        setInviteEmailError(null);
      } else if (data.emailError) {
        setInviteSent(false);
        setInviteEmailError(String(data.emailError));
      } else if (data.emailSkipped === "not_configured") {
        setInviteSent(false);
        setInviteEmailError(null);
      }

      setInviteEmail("");
      setInviteNetid("");
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to create invite");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    setAddError(null);
    setAddSuccess(false);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: addEmail,
          password: addPassword,
          netid: addNetid || undefined,
          sync_team_card_role: addSyncTeamCardRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error || "Failed to add admin");
        return;
      }
      setAddEmail("");
      setAddNetid("");
      setAddPassword("");
      setAddSuccess(true);
      fetchAdmins();
    } catch {
      setAddError("Failed to add admin");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveAdmin(id: string) {
    if (!confirm("Remove this admin?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/admins?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to remove admin");
        return;
      }
      fetchAdmins();
    } catch {
      alert("Failed to remove admin");
    } finally {
      setLoading(false);
    }
  }

  function toggleSubteam(slug: string) {
    setInviteManagedSubteams((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function handleMigrate() {
    if (
      !confirm(
        "Import CSV data into database? Rows with matching NetID/email will be updated."
      )
    )
      return;
    setMigrateStatus("Migrating...");
    try {
      const res = await fetch("/api/admin/migrate-team", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMigrateStatus(`Imported ${data.imported} members.`);
      } else {
        setMigrateStatus(data.error || "Failed");
      }
    } catch {
      setMigrateStatus("Failed");
    }
  }

  return (
    <div className="space-y-8">
      {/* Migrate CSV */}
      <section className="bg-white rounded-lg border border-[var(--light-gray)] p-6">
        <h2 className="text-lg font-semibold text-[var(--accent)] mb-4">
          Import Team Data
        </h2>
        <p className="text-sm text-[var(--body-text)] mb-2">
          DO NOT USE UNLESS YOU ARE WEBDEV. This was for the initial
          migration to a postgres DB, but I'm leaving this here just in 
          case we ever wanted to do a bulk csv upload. This should be removed if
          we find we don't need to do bulk CSV member uploads
        </p>
        <button
          type="button"
          onClick={handleMigrate}
          className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-md hover:bg-[var(--primary-dark)]"
        >
          Migrate CSV to Database
        </button>
        {migrateStatus && (
          <p className="mt-2 text-sm text-[var(--body-text)]">{migrateStatus}</p>
        )}
      </section>

      {/* Send Invite */}
      <section className="bg-white rounded-lg border border-[var(--light-gray)] p-6">
        <h2 className="text-lg font-semibold text-[var(--accent)] mb-4">
          Add New Admins
        </h2>
        <p className="text-sm text-[var(--body-text)] mb-4">
          This is connected to ReSend API, but it requires our own domain
          in order to send emails. So email send doesn't work LMAOAOA. If we
          want to autosend invite emails, we need to buy domain using pcard :3
          Anyway, the usage is: invite an admin or super-admin. The sign-up link is emailed to them.
        </p>
        <form onSubmit={handleCreateInvite} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
              placeholder="lead@cornell.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              NetID (optional; auto-derived from @cornell.edu email)
            </label>
            <input
              type="text"
              value={inviteNetid}
              onChange={(e) => setInviteNetid(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
              placeholder="abc123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={inviteRole}
              onChange={(e) =>
                setInviteRole(e.target.value as "admin" | "super_admin")
              }
              className="px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
            >
              <option value="admin">Admin (subteam lead)</option>
              <option value="super_admin">Super-admin</option>
            </select>
          </div>
          {inviteRole === "super_admin" && (
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={inviteSuperAdminType}
                onChange={(e) =>
                  setInviteSuperAdminType(
                    e.target.value as "team_lead" | "business_lead"
                  )
                }
                className="px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
              >
                <option value="team_lead">Team Lead</option>
                <option value="business_lead">Business Lead</option>
              </select>
            </div>
          )}
          {inviteRole === "admin" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Managed subteams
              </label>
              <div className="flex flex-wrap gap-2">
                {SUBTEAMS.filter((s) => s.slug !== "team_leads").map((s) => (
                  <label key={s.slug} className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={inviteManagedSubteams.includes(s.slug)}
                      onChange={() => toggleSubteam(s.slug)}
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
          )}
          <label className="flex items-start gap-2 text-sm cursor-pointer max-w-lg">
            <input
              type="checkbox"
              checked={inviteSyncTeamCardRole}
              onChange={(e) => setInviteSyncTeamCardRole(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span>
              <span className="font-medium">Sync team card title to lead role</span>
              <span className="block text-[var(--body-text)] mt-0.5">
                If checked, after they join, their public /team card &quot;role&quot;
                line updates to match this admin invite (e.g. ____ Lead). 
              </span>
            </span>
          </label>
          {addError && (
            <p className="text-sm text-red-600">{addError}</p>
          )}
          {inviteSent && (
            <p className="text-sm text-green-600">
              Invite created and email sent to the recipient.
            </p>
          )}
          {inviteEmailError && (
            <p className="text-sm text-red-600">
              Invite was created, but the email could not be sent: {inviteEmailError}
            </p>
          )}
          {inviteLink && !inviteSent && (
            <div className="p-3 bg-[var(--secondary)] rounded">
              <p className="text-sm font-medium mb-1">
                {inviteEmailError
                  ? "Copy this link and send it to them manually:"
                  : "Invite link (set RESEND_API_KEY to email automatically, or copy and send manually):"}
              </p>
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-md hover:bg-[var(--primary-dark)] disabled:opacity-60"
          >
            Create & Send Invite
          </button>
        </form>
      </section>

      {/* Direct Add + Current Admins */}
      <section className="bg-white rounded-lg border border-[var(--light-gray)] p-6">
        <h2 className="text-lg font-semibold text-[var(--accent)] mb-4">
          Manage Admins
        </h2>
        <p className="text-sm text-[var(--body-text)] mb-4">
          Add directly or use invite links above. Remove admins or super-admins.
        </p>

        <form onSubmit={handleAddAdmin} className="space-y-3 mb-6 max-w-2xl">
          <div className="flex flex-wrap gap-4 items-end">
            <input
              type="email"
              placeholder="Email"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              className="px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="NetID (optional)"
              value={addNetid}
              onChange={(e) => setAddNetid(e.target.value)}
              className="px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={addPassword}
              onChange={(e) => setAddPassword(e.target.value)}
              minLength={8}
              className="px-3 py-2 border border-[var(--light-gray)] rounded-md text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-md hover:bg-[var(--primary-dark)] disabled:opacity-60"
            >
              Add Admin Directly
            </button>
          </div>
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={addSyncTeamCardRole}
              onChange={(e) => setAddSyncTeamCardRole(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span>
              <span className="font-medium">Sync team card title to lead role</span>
              <span className="block text-[var(--body-text)] mt-0.5">
                Direct add doesn&apos;t set subteam scope here — if checked, their
                card role becomes &quot;Subteam Lead&quot;. For a specific title (e.g.
                Software Lead), use an invite with managed subteams, or edit their
                role on the Members page afterward.
              </span>
            </span>
          </label>
        </form>
        {addSuccess && <p className="text-sm text-green-600 mb-2">Admin added.</p>}

        <div>
          <h3 className="text-sm font-medium text-[var(--body-text)] mb-2">
            Current Admins
          </h3>
          <ul className="divide-y divide-[var(--light-gray)]">
            {admins.map((admin) => (
              <li
                key={admin.id}
                className="py-3 flex items-center justify-between"
              >
                <div>
                  <span className="font-medium">{admin.email}</span>
                  {admin.netid && (
                    <span className="ml-2 text-sm text-[var(--body-text)]">
                      ({admin.netid})
                    </span>
                  )}
                  <span className="ml-2 text-sm text-[var(--body-text)]">
                    {admin.role === "super_admin"
                      ? `(Super-admin${
                          admin.super_admin_type
                            ? ` - ${admin.super_admin_type.replace("_", " ")}`
                            : ""
                        })`
                      : `(Admin${
                          admin.managed_subteams?.length
                            ? `: ${admin.managed_subteams.join(", ")}`
                            : ""
                        })`}
                  </span>
                </div>
                {admin.id !== currentUserId && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAdmin(admin.id)}
                    disabled={loading}
                    className="text-sm text-[var(--primary)] hover:underline disabled:opacity-60"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
