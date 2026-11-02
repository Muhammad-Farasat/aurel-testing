import "server-only";

/**
 * Sends transactional email. Without a RESEND_API_KEY, this logs the message
 * to the server console instead of sending it — a real dev-mode fallback, not
 * a disguised no-op. Swap in the Resend SDK once a key is configured.
 */
export async function sendEmail(input: { to: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[email:dev-mode] to=${input.to} subject="${input.subject}"\n${input.text}`,
    );
    return { delivered: false, mode: "dev-mode" as const };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "AUREL <no-reply@aurel.example>",
    to: input.to,
    subject: input.subject,
    text: input.text,
  });
  return { delivered: true, mode: "resend" as const };
}
