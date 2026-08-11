import { BookingForm } from "./BookingForm";
import { BRAND, BOOKING_DEPOSIT } from "@/lib/constants";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Book Appointment",
  description: "Book your luxury beauty appointment with PY Luxe in Abuja.",
};

export default function BookingPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="font-playfair font-black text-4xl md:text-5xl text-brand-black mb-4">
            Book an Appointment
          </h1>
          <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138]" />
          <p className="text-brand-muted font-inter mt-4">
            Fill out the form below to request an appointment. You will be redirected to WhatsApp to complete your booking.
          </p>
        </div>

        {/* Booking Policy Alert */}
        <div className="bg-brand-blush/40 border border-brand-blush rounded-2xl p-6 mb-10 shadow-sm">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-playfair font-bold text-lg text-brand-black mb-2">Booking Policy</h3>
              <p className="font-inter text-sm text-brand-text mb-2">
                A <strong>{BOOKING_DEPOSIT} deposit</strong> is required to secure every appointment.
              </p>
              <p className="font-inter text-sm text-brand-text mb-2">
                Your appointment is only confirmed after the deposit has been received and verified by {BRAND.name}.
              </p>
              <p className="font-inter text-sm text-brand-text">
                After payment, please send your payment screenshot to our WhatsApp Business number for confirmation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-card">
          <BookingForm />
        </div>

      </div>
    </div>
  );
}
