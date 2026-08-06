import { NextRequest, NextResponse } from "next/server";

// POST /api/send-email — Send email via Resend
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, subject, html, type } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "to, subject, and html are required" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      console.warn("Resend API key not configured — email not sent");
      return NextResponse.json({ success: true, mock: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "PY Luxe <bookings@pyluxe.com>",
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
