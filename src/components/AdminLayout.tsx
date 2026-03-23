"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  LayoutTemplate,
  Shield,
} from "lucide-react";
import { MemberManagement } from "./MemberManagement";
import { SubteamContentManagement } from "./SubteamContentManagement";
import { ManageAdmins } from "./ManageAdmins";

const SIDEBAR_KEY = "admin-sidebar-collapsed";

type TabId = "members" | "subteam-content" | "admins";

type AdminLayoutProps = {
  isSuperAdmin: boolean;
  currentUserId: string;
  managedSubteams: string[] | null;
};

export function AdminLayout({
  isSuperAdmin,
  currentUserId,
  managedSubteams,
}: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabId>("members");
  const [mounted, setMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_KEY);
      if (stored === "1") setSidebarCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  function toggleSidebar() {
    setSidebarCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  const tabs: {
    id: TabId;
    label: string;
    icon: typeof Users;
    adminOnly?: boolean;
  }[] = [
    { id: "members", label: "Manage Members", icon: Users },
    {
      id: "subteam-content",
      label: "Subteam Page Content",
      icon: LayoutTemplate,
    },
    { id: "admins", label: "Manage Admins", icon: Shield, adminOnly: true },
  ];

  return (
    <div className="flex gap-4 min-h-[60vh] w-full">
      <aside
        className={`shrink-0 transition-[width] duration-200 ease-out ${
          sidebarCollapsed ? "w-14" : "w-56"
        }`}
      >
        <div className="sticky top-4 space-y-1">
          <button
            type="button"
            onClick={toggleSidebar}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-[var(--body-text)] hover:bg-[var(--light-gray-bg)] border border-transparent hover:border-[var(--light-gray)] mb-2`}
            aria-expanded={!sidebarCollapsed}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 shrink-0 mx-auto" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 shrink-0" />
                <span className="truncate">Collapse</span>
              </>
            )}
          </button>
          <nav className="space-y-1" aria-label="Admin sections">
            {tabs.map((tab) => {
              if (tab.adminOnly && !isSuperAdmin) return null;
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--body-text)] hover:bg-[var(--light-gray-bg)]"
                  } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
                  title={sidebarCollapsed ? tab.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden />
                  {!sidebarCollapsed && (
                    <span className="truncate">{tab.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0 w-0">
        {mounted && activeTab === "members" && (
          <MemberManagement
            isSuperAdmin={isSuperAdmin}
            managedSubteams={managedSubteams}
          />
        )}
        {mounted && activeTab === "subteam-content" && (
          <SubteamContentManagement
            isSuperAdmin={isSuperAdmin}
            managedSubteams={managedSubteams}
          />
        )}
        {mounted && activeTab === "admins" && isSuperAdmin && (
          <ManageAdmins currentUserId={currentUserId} />
        )}
      </main>
    </div>
  );
}
