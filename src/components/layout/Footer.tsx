"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart, MessageCircle } from "lucide-react";

// Social icons not available in this lucide-react version — use inline SVGs
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
import { BRAND, NAV_LINKS, SERVICES } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const serviceLinks = SERVICES.slice(0, 8).map((s) => ({
  label: s.name,
  href: `/services#${s.slug}`,
}));

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Refund Policy", href: "/refunds" },
];

export function Footer({ initialSettings }: { initialSettings?: any }) {
  const currentYear = new Date().getFullYear();
  const name = initialSettings?.business_name || BRAND.name;
  const whatsapp = initialSettings?.whatsapp_number || BRAND.whatsapp;
  const instagram = initialSettings?.instagram_url || BRAND.instagram;
  const facebook = initialSettings?.facebook_url || BRAND.facebook;
  const tiktok = initialSettings?.tiktok_url || BRAND.tiktok;
  const email = initialSettings?.email || BRAND.email;
  const phone = initialSettings?.phone_number || BRAND.phone;
  const address = initialSettings?.business_address || BRAND.address;
  const hours = initialSettings?.business_hours || "Update your business hours in the Admin Dashboard";

  return (
    <footer className="bg-brand-primary text-white" aria-label="Site footer">
      {/* Top CTA Band */}
      <div className="bg-brand-purple py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-inter text-sm font-medium text-black/70 tracking-widest uppercase mb-3"
          >
            Ready for your glow-up?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl font-bold text-black mb-6"
          >
            Book Your Luxury Experience Today
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/booking"
              id="footer-book-now"
              className="bg-black text-white px-8 py-3.5 rounded-2xl font-semibold font-inter text-sm hover:bg-zinc-800 transition-colors duration-200 inline-block text-center"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappLink(whatsapp, "Hello! I'd like to book an appointment at PY Luxe.")}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-whatsapp"
              className="bg-white/20 text-black border border-black/20 px-8 py-3.5 rounded-2xl font-semibold font-inter text-sm hover:bg-white/30 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="font-playfair font-black text-3xl tracking-wider">
                {name}
              </p>
              <p className="font-inter text-xs text-white/50 tracking-[0.3em] uppercase mt-1">
                Beauty · Style · Confidence
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {BRAND.description}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-purple hover:text-black rounded-xl flex items-center justify-center text-white/70 transition-all duration-200"
                aria-label="Instagram"
                id="footer-instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-purple hover:text-black rounded-xl flex items-center justify-center text-white/70 transition-all duration-200"
                aria-label="TikTok"
                id="footer-tiktok"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.84 1.56V6.81a4.85 4.85 0 01-1.07-.12z"/>
                </svg>
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-purple hover:text-black rounded-xl flex items-center justify-center text-white/70 transition-all duration-200"
                aria-label="Facebook"
                id="footer-facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 bg-white/10 hover:bg-brand-purple hover:text-black rounded-xl flex items-center justify-center text-white/70 transition-all duration-200"
                aria-label="Email us"
                id="footer-email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair font-bold text-lg text-white mb-6">Quick Links</h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-purple text-sm font-inter transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-white/30 hover:text-brand-purple text-sm font-inter transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-playfair font-bold text-lg text-white mb-6">Our Services</h3>
            <ul className="space-y-3" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-purple text-sm font-inter transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair font-bold text-lg text-white mb-6">Get In Touch</h3>
            <ul className="space-y-4" role="list">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="flex items-start gap-3 text-white/60 hover:text-brand-purple text-sm font-inter transition-colors duration-200 group"
                  id="footer-phone"
                >
                  <Phone className="h-4 w-4 mt-0.5 text-brand-purple flex-shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-3 text-white/60 hover:text-brand-purple text-sm font-inter transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-brand-purple flex-shrink-0" />
                  {email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm font-inter">
                  <MapPin className="h-4 w-4 mt-0.5 text-brand-purple flex-shrink-0" />
                  <span>{address}</span>
                </div>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-white text-sm font-semibold mb-2">Business Hours</p>
              <p className="text-white/50 text-xs whitespace-pre-line">{hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-inter text-center">
            © {currentYear} {name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-4 flex-wrap justify-center" role="list">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/40 hover:text-brand-purple text-xs font-inter transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
