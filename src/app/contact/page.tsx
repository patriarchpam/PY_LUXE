import { BRAND } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import Link from "next/link";
import { MessageCircle, Calendar } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with PY Luxe to book your next luxury beauty appointment in Abuja.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-luxury text-center border border-brand-gold/20">
          <h1 className="font-playfair font-black text-4xl md:text-5xl text-brand-black mb-4">
            {BRAND.name}
          </h1>
          <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138]" />
          
          <div className="space-y-4 my-10 font-inter text-lg text-brand-text">
            <p className="font-semibold">{BRAND.location}</p>
            <p>Available at {BRAND.primary_service_location}</p>
            <p>Home service available</p>
            <p className="text-brand-gold font-semibold pt-4">
              WhatsApp: {BRAND.display_whatsapp}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a
              href={whatsappLink(BRAND.whatsapp, "Hello PY Luxe! 💕 I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold font-inter text-sm md:text-base hover:bg-[#20b858] transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              CHAT ON WHATSAPP
            </a>
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-brand-black text-white border border-brand-black px-8 py-4 rounded-xl font-bold font-inter text-sm md:text-base hover:bg-zinc-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              BOOK AN APPOINTMENT
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
