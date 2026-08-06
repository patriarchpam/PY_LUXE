"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

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
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { BRAND } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import type { Metadata } from "next";

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^(?:\+234|0)[789]\d{9}$/, "Must be a valid Nigerian phone number (e.g. 080... or +234...)").optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPageClient({ initialSettings }: { initialSettings?: any }) {
  const name = initialSettings?.business_name || BRAND.name;
  const whatsapp = initialSettings?.whatsapp_number || BRAND.whatsapp;
  const instagram = initialSettings?.instagram_url || BRAND.instagram;
  const facebook = initialSettings?.facebook_url || BRAND.facebook;
  const email = initialSettings?.email || BRAND.email;
  const phone = initialSettings?.phone_number || BRAND.phone;
  const address = initialSettings?.business_address || BRAND.address;
  const mapsUrl = initialSettings?.maps_location || "https://maps.google.com/?q=Lagos";
  const hours = initialSettings?.business_hours || "Update your business hours in the Admin Dashboard";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: POST to /api/send-email
      await new Promise((r) => setTimeout(r, 1500));
      toast.success("Message sent! We'll get back to you within 24 hours. 💌");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      id: "contact-phone",
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      id: "contact-email",
    },
    {
      icon: MapPin,
      label: "Address",
      value: address,
      href: mapsUrl,
      id: "contact-address",
    },
  ];

  const socialLinks = [
    { icon: InstagramIcon, label: "Instagram", href: instagram, color: "hover:bg-pink-500/20 hover:text-pink-500" },
    { icon: FacebookIcon, label: "Facebook", href: facebook, color: "hover:bg-blue-500/20 hover:text-blue-500" },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: whatsappLink(whatsapp, "Hello PY Luxe!"),
      color: "hover:bg-green-500/20 hover:text-green-500",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-brand-primary text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
            Contact <span className="text-purple-gradient">Us</span>
          </h1>
          <p className="font-inter text-white/60 text-lg">
            We&apos;d love to hear from you. Reach out with questions, bookings, or just to say hi!
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-brand-surface dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-bold text-brand-text dark:text-white mb-8">
              Let&apos;s Connect
            </h2>

            <div className="space-y-5 mb-8">
              {contactItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  id={item.id}
                  className="flex items-start gap-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-brand-border dark:border-zinc-800 hover:border-brand-purple/40 hover:shadow-luxury transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-brand-purple/10 group-hover:bg-brand-purple/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <item.icon className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-brand-muted uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-inter font-medium text-brand-text dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-brand-border dark:border-zinc-800 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-brand-purple" />
                <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
                  Business Hours
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-inter text-sm text-brand-muted whitespace-pre-line">{hours}</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-inter text-sm font-medium text-brand-text dark:text-white mb-4">
                Follow us on social media
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 bg-brand-surface dark:bg-zinc-800 border border-brand-border dark:border-zinc-700 rounded-xl flex items-center justify-center text-brand-muted transition-all duration-200 ${social.color}`}
                    aria-label={social.label}
                    id={`social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink(BRAND.whatsapp, "Hello PY Luxe! I'd like to enquire about an appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-contact"
              className="mt-6 flex items-center gap-3 p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-colors"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
                  Chat on WhatsApp
                </p>
                <p className="font-inter text-xs text-brand-muted">
                  Typically responds within 1 hour
                </p>
              </div>
            </a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-brand-border dark:border-zinc-800 p-8 shadow-glass">
              <h2 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Your Name"
                    placeholder="Full name"
                    required
                    error={errors.name?.message}
                    {...register("name")}
                    id="contact-form-name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    error={errors.email?.message}
                    {...register("email")}
                    id="contact-form-email"
                  />
                </div>
                <Input
                  label="Phone (optional)"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  {...register("phone")}
                  id="contact-form-phone"
                />
                <Select
                  label="Subject"
                  required
                  error={errors.subject?.message}
                  placeholder="Select a subject"
                  options={[
                    { value: "booking", label: "Booking Enquiry" },
                    { value: "pricing", label: "Pricing Information" },
                    { value: "complaint", label: "Complaint / Feedback" },
                    { value: "collaboration", label: "Collaboration / Partnership" },
                    { value: "other", label: "Other" },
                  ]}
                  {...register("subject")}
                  id="contact-form-subject"
                />
                <Textarea
                  label="Message"
                  placeholder="Tell us how we can help..."
                  required
                  error={errors.message?.message}
                  {...register("message")}
                  id="contact-form-message"
                />
                <Button
                  type="submit"
                  variant="purple"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  id="contact-form-submit"
                  className="font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-brand-border dark:border-zinc-800 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7288557965!2d3.4230!3d6.4280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDAuOCJOIDPCsDI1JzIyLjgiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PY Luxe Location"
                aria-label="Map showing PY Luxe location in Victoria Island, Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
