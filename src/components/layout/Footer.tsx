"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <p className="font-playfair font-black text-3xl tracking-wider text-brand-gold mb-2">
              {BRAND.name}
            </p>
            <p className="font-inter text-sm text-brand-blush mb-4">
              {BRAND.tagline}
            </p>
            <p className="text-white/80 text-sm mb-2">Hair • Nails • Makeup • Henna</p>
            <p className="text-white/80 text-sm mb-2">{BRAND.location}</p>
            <p className="text-white/80 text-sm mb-2">Available at {BRAND.primary_service_location}</p>
            <p className="text-white/80 text-sm mb-4">Home service available</p>
            
            <a
              href={whatsappLink(BRAND.whatsapp, "Hello PY Luxe! 💕 I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-[#e6c138] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp: {BRAND.display_whatsapp}
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:pl-12">
            <h3 className="font-playfair font-bold text-lg text-white mb-6">Quick Links</h3>
            <ul className="space-y-3 inline-block text-left" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-gold text-sm font-inter transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Booking & Action */}
          <div>
            <h3 className="font-playfair font-bold text-lg text-white mb-6">Ready to Book?</h3>
            <p className="text-white/60 text-sm mb-6">
              Experience personalized beauty services tailored just for you.
            </p>
            <Link
              href="/booking"
              className="inline-block bg-brand-blush text-brand-black px-8 py-3 rounded-xl font-medium text-sm hover:bg-[#f3d3dc] transition-colors"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-white/40 text-xs font-inter">
            © 2026 {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
