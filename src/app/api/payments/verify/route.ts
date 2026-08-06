import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// POST /api/payments/verify — called after Paystack redirect OR as webhook
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json({ error: "reference is required" }, { status: 400 });
    }

    // Verify with Paystack
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data?.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const { booking_id, payment_type } = paystackData.data.metadata;
    const amount = paystackData.data.amount / 100; // Convert from kobo

    // Use admin client to bypass RLS for payment updates
    const supabase = await createAdminClient();

    // Update payment record
    await supabase
      .from("booking_payments")
      .update({
        status: "success",
        paystack_transaction_id: paystackData.data.id.toString(),
        paid_at: new Date().toISOString(),
      })
      .eq("paystack_reference", reference);

    // Update booking payment status
    const newPaymentStatus =
      payment_type === "full" ? "fully_paid" : "deposit_paid";

    await supabase
      .from("bookings")
      .update({
        payment_status: newPaymentStatus,
        status: "confirmed", // Auto-confirm on payment
      })
      .eq("id", booking_id);

    // TODO: Send confirmation email via Resend
    // await sendBookingConfirmation(booking_id);

    return NextResponse.json({ success: true, payment_status: newPaymentStatus });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

// GET /api/payments/verify?reference=xxx — for redirect from Paystack
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(new URL("/booking?error=missing_reference", req.url));
  }

  const verifyRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/verify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    }
  );

  const data = await verifyRes.json();

  if (data.success) {
    return NextResponse.redirect(
      new URL(`/booking/success?ref=${reference}`, req.url)
    );
  }

  return NextResponse.redirect(
    new URL(`/booking?error=payment_failed&ref=${reference}`, req.url)
  );
}
