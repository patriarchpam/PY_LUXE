import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateBookingRef } from "@/lib/utils";
import { DEPOSIT_PERCENTAGE } from "@/lib/constants";

// GET /api/bookings — list bookings for current user
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("bookings")
      .select(`
        *,
        service:services(*),
        staff:staff(*, profile:profiles(full_name, avatar_url)),
        payments:booking_payments(*)
      `)
      .eq("customer_id", user.id)
      .order("date", { ascending: true });

    if (status) query = query.eq("status", status);

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ bookings: data });
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST /api/bookings — create a new booking
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      service_id,
      staff_id,
      date,
      time,
      notes,
      inspiration_image_url,
      payment_type,
      service_location,
      address,
    } = body;

    // Validate required fields
    if (!service_id || !date || !time) {
      return NextResponse.json(
        { error: "service_id, date, and time are required" },
        { status: 400 }
      );
    }

    // Get service price and duration
    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("price, duration")
      .eq("id", service_id)
      .single();

    if (serviceError || !service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Check slot availability
    if (staff_id) {
      const { data: blocked } = await supabase
        .from("blocked_slots")
        .select("id")
        .eq("staff_id", staff_id)
        .eq("date", date)
        .eq("time", time)
        .single();

      if (blocked) {
        return NextResponse.json(
          { error: "This time slot is already booked. Please choose another time." },
          { status: 409 }
        );
      }
    }

    const depositAmount = Math.round(service.price * DEPOSIT_PERCENTAGE);

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        booking_ref: generateBookingRef(),
        customer_id: user.id,
        service_id,
        staff_id: staff_id || null,
        date,
        time,
        duration: service.duration,
        notes,
        inspiration_image_url,
        service_location: service_location || 'remote',
        address,
        status: "pending",
        payment_status: "pending",
        total_amount: service.price,
        deposit_amount: depositAmount,
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
