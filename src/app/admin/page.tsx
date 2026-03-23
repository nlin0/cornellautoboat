import { auth } from "auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/AdminLayout";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="w-full max-w-[min(100%,1600px)] mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--accent)] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[var(--body-text)]">
          Welcome, {session.user.email}. Manage the Cornell AutoBoat site from
          here.
        </p>
      </div>
      <div className="w-full flex justify-center">
        <AdminLayout
          isSuperAdmin={session.user.role === "super_admin"}
          currentUserId={session.user.id}
          managedSubteams={session.user.managed_subteams}
        />
      </div>
    </div>
  );
}
