import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/app/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your luxury beauty appointment at PY Luxe. Choose your service, stylist, date, and time. Instant confirmation with Paystack payment.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-brand-surface dark:bg-zinc-900 pt-24">
      <Suspense fallback={<div className="p-8 text-center text-brand-muted">Loading booking system...</div>}>
        <BookingWizard />
      </Suspense>
    </div>
  );
}
