import { Resend } from "resend";

const DEFAULT_FROM =
  "Cornell AutoBoat <onboarding@resend.dev>";

function fromAddress(): string {
  return process.env.INVITE_FROM_EMAIL?.trim() || DEFAULT_FROM;
}

export type SendAdminInviteResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" }
  | { sent: false; reason: "error"; message: string };

/**
 * Sends the admin join link via Resend. Requires `RESEND_API_KEY`.
 */
export async function sendAdminInviteEmail(input: {
  toEmail: string;
  joinUrl: string;
}): Promise<SendAdminInviteResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { sent: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: [input.toEmail],
    subject: "Cornell AutoBoat – Admin Invite",
    html: `
      <p>You've been invited to join the Cornell AutoBoat admin team.</p>
      <p><a href="${input.joinUrl}">Click here to set up your account</a></p>
      <p>This link expires in 7 days. If you didn't expect this invite, you can ignore this email.</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      sent: false,
      reason: "error",
      message: error.message || "Failed to send email",
    };
  }

  return { sent: true };
}
