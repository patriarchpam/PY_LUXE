"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { SERVICES, BRAND } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

type BookingFormData = {
  fullName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  location: string;
  message: string;
};

export function BookingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: BookingFormData) => {
    setIsSubmitting(true);
    
    // Find service name from ID if possible, otherwise use the raw value
    const selectedService = SERVICES.find(s => s.id === data.service)?.name || data.service;

    const message = `Hello PY Luxe! 💕

I would like to book an appointment.

Name: ${data.fullName}
Phone: ${data.phone}
Service: ${selectedService}
Preferred Date: ${data.date}
Preferred Time: ${data.time}
Location: ${data.location}

I understand that a ₦1,000 deposit is required to secure my appointment.

Additional Message: ${data.message || "None"}

Thank you!`;

    // Open WhatsApp
    const url = whatsappLink(BRAND.whatsapp, message);
    window.open(url, "_blank");
    
    setIsSubmitting(false);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent font-inter text-brand-black bg-brand-surface";
  const labelClasses = "block text-sm font-semibold text-brand-black mb-2 font-inter";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelClasses}>Full Name *</label>
          <input
            id="fullName"
            type="text"
            placeholder="Your name"
            className={inputClasses}
            {...register("fullName", { required: "Name is required" })}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1 font-inter">{errors.fullName.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number *</label>
          <input
            id="phone"
            type="tel"
            placeholder="0800 000 0000"
            className={inputClasses}
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 font-inter">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className={labelClasses}>Select Service *</label>
        <select
          id="service"
          className={inputClasses}
          {...register("service", { required: "Please select a service" })}
          defaultValue=""
        >
          <option value="" disabled>Choose a service</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>{s.name} - {s.price}</option>
          ))}
        </select>
        {errors.service && <p className="text-red-500 text-xs mt-1 font-inter">{errors.service.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className={labelClasses}>Preferred Date *</label>
          <input
            id="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={inputClasses}
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p className="text-red-500 text-xs mt-1 font-inter">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className={labelClasses}>Preferred Time *</label>
          <input
            id="time"
            type="time"
            className={inputClasses}
            {...register("time", { required: "Time is required" })}
          />
          {errors.time && <p className="text-red-500 text-xs mt-1 font-inter">{errors.time.message}</p>}
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className={labelClasses}>Location *</label>
        <select
          id="location"
          className={inputClasses}
          {...register("location", { required: "Please select a location" })}
          defaultValue=""
        >
          <option value="" disabled>Choose location</option>
          <option value={BRAND.primary_service_location}>{BRAND.primary_service_location}</option>
          <option value="Home Service">Home Service</option>
        </select>
        {errors.location && <p className="text-red-500 text-xs mt-1 font-inter">{errors.location.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>Additional Message (Optional)</label>
        <textarea
          id="message"
          rows={4}
          placeholder="Any special requests or details..."
          className={inputClasses}
          {...register("message")}
        />
        <p className="text-xs text-brand-muted mt-2 font-inter">
          * Note: You can attach inspiration photos directly in WhatsApp after submitting this form.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold font-inter text-base hover:bg-[#20b858] transition-colors shadow-lg flex items-center justify-center gap-2 mt-8 disabled:opacity-70"
      >
        <MessageCircle className="w-5 h-5" />
        BOOK VIA WHATSAPP
      </button>

      {/* Payment Proof Button (Separate flow visually) */}
      <div className="mt-12 pt-8 border-t border-brand-border text-center">
        <h3 className="font-playfair font-bold text-xl text-brand-black mb-2">Already paid your deposit?</h3>
        <p className="text-brand-muted text-sm font-inter mb-6">
          If you have already contacted us and made your deposit, send us your payment screenshot.
        </p>
        <a
          href={whatsappLink(BRAND.whatsapp, `Hello PY Luxe! 💕\n\nI have made my ₦1,000 booking deposit.\n\nName:\nService:\nPreferred Date:\nPreferred Time:\n\nI have attached my payment screenshot for verification.\n\nThank you!`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-black text-white px-8 py-3 rounded-xl font-medium font-inter text-sm hover:bg-zinc-800 transition-colors"
        >
          SEND PAYMENT PROOF ON WHATSAPP
        </a>
      </div>
    </form>
  );
}
