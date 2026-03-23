import { auth } from "auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // No session: render children (login page) - proxy allows /admin/login
  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--secondary)]">
      <AdminNav user={session.user} />
      <div className="w-full max-w-[min(100%,1600px)] mx-auto px-4 sm:px-6 pt-16 pb-10">{children}</div>
    </div>
  );
}
