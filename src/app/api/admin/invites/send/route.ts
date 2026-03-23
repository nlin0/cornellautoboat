import { NextResponse } from "next/server";
import { auth } from "auth";
import { sendAdminInviteEmail } from "@/lib/send-admin-invite-email";

/** Optional: resend invite email manually (same as server send on create). */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, joinUrl } = body;

    if (!email || !joinUrl) {
      return NextResponse.json(
        { error: "email and joinUrl required" },
        { status: 400 }
      );
    }

    const result = await sendAdminInviteEmail({
      toEmail: String(email).toLowerCase().trim(),
      joinUrl: String(joinUrl),
    });

    if (!result.sent) {
      if (result.reason === "not_configured") {
        return NextResponse.json(
          { error: "Email not configured. Set RESEND_API_KEY." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send invite email failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500 }
    );
  }
}
