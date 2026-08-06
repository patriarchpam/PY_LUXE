import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/availability?staff_id=xxx&date=2026-08-15
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const staff_id = searchParams.get("staff_id");
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "date is required" }, { status: 400 });
    }

    const supabase = await createClient();

    let query = supabase
      .from("blocked_slots")
      .select("time")
      .eq("date", date);

    if (staff_id) {
      query = query.eq("staff_id", staff_id);
    }

    const { data: blocked, error } = await query;

    if (error) throw error;

    const bookedTimes = blocked?.map((b: { time: string }) => b.time.slice(0, 5)) || [];

    return NextResponse.json({ bookedTimes });
  } catch (error) {
    console.error("GET /api/availability error:", error);
    return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
  }
}
