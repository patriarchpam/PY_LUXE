import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/payments/initialize
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { booking_id, amount, payment_type, email } = body;

    if (!booking_id || !amount || !email) {
      return NextResponse.json(
        { error: "booking_id, amount, and email are required" },
        { status: 400 }
      );
    }

    const reference = `PLX-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    // Initialize with Paystack
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Paystack uses kobo
        reference,
        metadata: {
          booking_id,
          payment_type,
          customer_id: user.id,
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/verify`,
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      throw new Error(paystackData.message || "Paystack initialization failed");
    }

    // Store pending payment record
    await supabase.from("booking_payments").insert({
      booking_id,
      amount,
      payment_type,
      payment_method: "paystack",
      paystack_reference: reference,
      status: "pending",
    });

    return NextResponse.json({
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference,
    });
  } catch (error) {
    console.error("Payment initialize error:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  }
}
