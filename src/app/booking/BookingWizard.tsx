"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { NIGERIAN_STATES } from "@/lib/constants";
import {
  CheckCircle2,
  Sparkles,
  User,
  CalendarDays,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Clock,
  Upload,
  X,
} from "lucide-react";
import { SERVICES, STAFF, TIME_SLOTS, DEPOSIT_PERCENTAGE } from "@/lib/constants";
import {
  formatCurrency,
  formatDuration,
  formatDate,
  formatTime,
  calculateDeposit,
  generateBookingRef,
} from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const bookingSchema = z.object({
  service_id: z.string().min(1, "Please select a service"),
  staff_id: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
  payment_type: z.enum(["deposit", "full"]),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^(?:\+234|0)[789]\d{9}$/, "Must be a valid Nigerian phone number"),
  service_location: z.enum(["remote", "in-studio"]),
  state: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => {
  if (data.service_location === "remote") {
    if (!data.address || !data.state) return false;
  }
  return true;
}, {
  message: "Please provide both state and address for home/remote services",
  path: ["address"],
});

type BookingFormData = z.infer<typeof bookingSchema>;

// ─── Step Config ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Service", icon: Sparkles },
  { id: 2, label: "Specialist", icon: User },
  { id: 3, label: "Date & Time", icon: CalendarDays },
  { id: 4, label: "Details", icon: User },
  { id: 5, label: "Payment", icon: CreditCard },
  { id: 6, label: "Confirmed", icon: CheckCircle2 },
];

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export function BookingWizard() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [step, setStep] = useState(1);
  const [inspirationImage, setInspirationImage] = useState<File | null>(null);
  const [inspirationPreview, setInspirationPreview] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service_id: preselectedService || "",
      payment_type: "deposit",
      service_location: "remote",
    },
  });

  const watchedService = watch("service_id");
  const watchedStaff = watch("staff_id");
  const watchedDate = watch("date");
  const watchedTime = watch("time");
  const watchedPaymentType = watch("payment_type");

  const selectedService = SERVICES.find((s) => s.id === watchedService);
  const selectedStaff = STAFF.find((s) => s.id === watchedStaff);
  const payAmount = selectedService
    ? watchedPaymentType === "deposit"
      ? calculateDeposit(selectedService.price)
      : selectedService.price
    : 0;

  // Disable past dates
  const today = new Date().toISOString().split("T")[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInspirationImage(file);
      setInspirationPreview(URL.createObjectURL(file));
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const payload = {
        service_id: watchedService,
        staff_id: watchedStaff,
        date: watchedDate,
        time: watchedTime,
        payment_type: watchedPaymentType,
        service_location: watch("service_location"),
        address: watch("address"),
        notes: watch("notes"),
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      const { booking } = await res.json();
      setBookingRef(booking.booking_ref);

      // Initialize payment
      const payRes = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: booking.id,
          amount: payAmount,
          payment_type: watchedPaymentType,
          email: payload.email,
        }),
      });

      if (!payRes.ok) {
        const errorData = await payRes.json();
        throw new Error(errorData.error || "Failed to initialize payment");
      }

      const payData = await payRes.json();
      window.location.href = payData.authorization_url;
      
      // Note: the step(6) confirmation will now be handled by the success redirect page.
    } catch (error: any) {
      toast.error(error.message || "An error occurred during booking. Please make sure you are signed in.");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1: return !!watchedService;
      case 2: return true; // Staff is optional
      case 3: return !!watchedDate && !!watchedTime;
      case 4: return true;
      default: return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Header */}
      <div className="text-center py-10">
        <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-3">
          Reserve Your Experience
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-text dark:text-white">
          Book an Appointment
        </h1>
      </div>

      {/* Step Progress */}
      {step < 6 && (
        <div className="flex items-center justify-between mb-10 px-2">
          {STEPS.slice(0, 5).map((s, i) => {
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            return (
              <div key={s.id} className="flex items-center gap-0 flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-brand-purple border-brand-purple text-black"
                        : isCurrent
                        ? "border-brand-purple text-brand-purple bg-brand-purple/10"
                        : "border-brand-border text-brand-muted dark:border-zinc-700"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <s.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`text-xs font-inter mt-1.5 hidden sm:block ${
                    isCurrent ? "text-brand-purple font-medium" : "text-brand-muted"
                  }`}>
                    {s.label}
                  </span>
                </div>
                {i < 4 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                    step > s.id ? "bg-brand-purple" : "bg-brand-border dark:bg-zinc-800"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {step === 1 && <StepService setValue={setValue} selectedId={watchedService} />}
          {step === 2 && <StepStaff setValue={setValue} selectedId={watchedStaff} serviceId={watchedService} />}
          {step === 3 && <StepDateTime register={register} errors={errors} watchedDate={watchedDate} setValue={setValue} watchedTime={watchedTime} today={today} />}
          {step === 4 && (
            <StepDetails
              register={register}
              errors={errors}
              inspirationPreview={inspirationPreview}
              onImageUpload={handleImageUpload}
              onRemoveImage={() => { setInspirationImage(null); setInspirationPreview(null); }}
            />
          )}
          {step === 5 && (
            <StepPayment
              service={selectedService}
              staff={selectedStaff}
              date={watchedDate}
              time={watchedTime}
              watchedPaymentType={watchedPaymentType}
              setValue={setValue}
              payAmount={payAmount}
              loading={loading}
              onPay={handlePayment}
            />
          )}
          {step === 6 && (
            <StepConfirmation
              service={selectedService}
              bookingRef={bookingRef}
              date={watchedDate}
              time={watchedTime}
              payAmount={payAmount}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step < 5 && step < 6 && (
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            icon={<ChevronLeft className="h-4 w-4" />}
            iconPosition="left"
            id="booking-back"
          >
            Back
          </Button>
          <Button
            variant="purple"
            onClick={() => canProceed(step) && setStep((s) => s + 1)}
            disabled={!canProceed(step)}
            icon={<ChevronRight className="h-4 w-4" />}
            iconPosition="right"
            id="booking-next"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Step 1: Service Selection ────────────────────────────────────────────────

function StepService({
  setValue,
  selectedId,
}: {
  setValue: (name: "service_id", value: string) => void;
  selectedId: string;
}) {
  const categories = [...new Set(SERVICES.map((s) => s.category))];

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-2">
        Choose Your Service
      </h2>
      <p className="font-inter text-brand-muted text-sm mb-8">
        Select the service you&apos;d like to book. You can add more services later.
      </p>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="font-inter font-semibold text-sm text-brand-muted uppercase tracking-wider mb-3">
              {cat}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.filter((s) => s.category === cat).map((service) => (
                <button
                  key={service.id}
                  onClick={() => setValue("service_id", service.id)}
                  id={`select-service-${service.id}`}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    selectedId === service.id
                      ? "border-brand-purple bg-brand-purple/5 shadow-luxury"
                      : "border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-purple/50"
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{service.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
                      {service.name}
                    </p>
                    <p className="font-inter text-xs text-brand-muted mt-0.5 line-clamp-1">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-inter text-xs font-semibold text-brand-purple">
                        {formatCurrency(service.price)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-brand-muted">
                        <Clock className="h-3 w-3" />
                        {formatDuration(service.duration)}
                      </span>
                    </div>
                  </div>
                  {selectedId === service.id && (
                    <CheckCircle2 className="h-5 w-5 text-brand-purple flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Staff Selection ──────────────────────────────────────────────────

function StepStaff({
  setValue,
  selectedId,
  serviceId,
}: {
  setValue: (name: "staff_id", value: string) => void;
  selectedId?: string;
  serviceId: string;
}) {
  const selectedService = SERVICES.find((s) => s.id === serviceId);

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-2">
        Choose Your Specialist
      </h2>
      <p className="font-inter text-brand-muted text-sm mb-8">
        Select a specialist or let us assign the best available artist for your service.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* No preference option */}
        <button
          onClick={() => setValue("staff_id", "")}
          id="staff-no-preference"
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
            !selectedId
              ? "border-brand-purple bg-brand-purple/5 shadow-luxury"
              : "border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-purple/40"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-6 w-6 text-brand-purple" />
          </div>
          <div>
            <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
              No Preference
            </p>
            <p className="font-inter text-xs text-brand-muted mt-0.5">
              Assign best available artist
            </p>
          </div>
          {!selectedId && <CheckCircle2 className="h-5 w-5 text-brand-purple ml-auto" />}
        </button>

        {STAFF.map((staff) => (
          <button
            key={staff.id}
            onClick={() => setValue("staff_id", staff.id)}
            id={`staff-${staff.id}`}
            className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
              selectedId === staff.id
                ? "border-brand-purple bg-brand-purple/5 shadow-luxury"
                : "border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-purple/40"
            }`}
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-brand-surface">
              <Image
                src={staff.image}
                alt={staff.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
                {staff.name}
              </p>
              <p className="font-inter text-xs text-brand-purple">{staff.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-brand-purple">★</span>
                <span className="text-xs font-medium text-brand-text dark:text-white">
                  {staff.rating}
                </span>
                <span className="text-xs text-brand-muted">({staff.reviews} reviews)</span>
              </div>
            </div>
            {selectedId === staff.id && (
              <CheckCircle2 className="h-5 w-5 text-brand-purple flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 3: Date & Time ──────────────────────────────────────────────────────

function StepDateTime({
  register,
  errors,
  watchedDate,
  setValue,
  watchedTime,
  today,
}: {
  register: ReturnType<typeof useForm<BookingFormData>>["register"];
  errors: ReturnType<typeof useForm<BookingFormData>>["formState"]["errors"];
  watchedDate: string;
  setValue: (name: "time", value: string) => void;
  watchedTime: string;
  today: string;
}) {
  // Simulate some booked slots
  const bookedSlots = ["10:00", "14:30", "16:00"];

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-2">
        Select Date & Time
      </h2>
      <p className="font-inter text-brand-muted text-sm mb-8">
        Choose your preferred appointment date and time slot.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Picker */}
        <div>
          <label className="block font-inter text-sm font-medium text-brand-text dark:text-white mb-3">
            Preferred Date <span className="text-brand-purple">*</span>
          </label>
          <input
            type="date"
            min={today}
            {...register("date")}
            id="booking-date"
            className="w-full h-12 rounded-2xl border border-brand-border dark:border-zinc-700 px-4 text-sm font-inter bg-white dark:bg-zinc-900 text-brand-text dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all duration-200"
          />
          {errors.date && (
            <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Time Slots */}
        <div>
          <label className="block font-inter text-sm font-medium text-brand-text dark:text-white mb-3">
            Available Times <span className="text-brand-purple">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
            {TIME_SLOTS.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const isSelected = watchedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked}
                  onClick={() => !isBooked && setValue("time", slot)}
                  id={`time-slot-${slot}`}
                  className={`py-2.5 rounded-xl text-xs font-medium font-inter transition-all duration-200 ${
                    isBooked
                      ? "bg-brand-surface dark:bg-zinc-800 text-brand-muted cursor-not-allowed line-through opacity-50"
                      : isSelected
                      ? "bg-brand-purple text-black shadow-luxury"
                      : "bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-700 text-brand-text dark:text-white hover:border-brand-purple hover:text-brand-purple"
                  }`}
                >
                  {formatTime(slot)}
                </button>
              );
            })}
          </div>
          {errors.time && (
            <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>
          )}
          <p className="text-xs text-brand-muted mt-2">
            Crossed slots are already booked
          </p>
        </div>
      </div>

      {watchedDate && watchedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-brand-purple/10 border border-brand-purple/30 rounded-2xl"
        >
          <p className="font-inter text-sm font-medium text-brand-purple">
            ✓ Selected: {formatDate(watchedDate)} at {formatTime(watchedTime)}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Step 4: Personal Details ─────────────────────────────────────────────────

function StepDetails({
  register,
  errors,
  inspirationPreview,
  onImageUpload,
  onRemoveImage,
}: {
  register: ReturnType<typeof useForm<BookingFormData>>["register"];
  errors: ReturnType<typeof useForm<BookingFormData>>["formState"]["errors"];
  inspirationPreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}) {
  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-2">
        Your Details
      </h2>
      <p className="font-inter text-brand-muted text-sm mb-8">
        Fill in your contact details and any special requests.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          placeholder="Your full name"
          required
          error={errors.full_name?.message}
          {...register("full_name")}
          id="booking-full-name"
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          required
          error={errors.email?.message}
          {...register("email")}
          id="booking-email"
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+234 800 000 0000"
          required
          error={errors.phone?.message}
          {...register("phone")}
          id="booking-phone"
          className="sm:col-span-2"
        />

        {/* Location Selection */}
        <div className="sm:col-span-2">
          <label className="block font-inter text-sm font-medium text-brand-text dark:text-white mb-2">
            Service Location
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 font-inter text-sm cursor-pointer text-brand-text dark:text-white">
              <input
                type="radio"
                value="remote"
                {...register("service_location")}
                className="w-4 h-4 text-brand-purple focus:ring-brand-purple border-brand-border"
              />
              Home Service / Remote
            </label>
            <label className="flex items-center gap-2 font-inter text-sm cursor-pointer text-brand-text dark:text-white">
              <input
                type="radio"
                value="in-studio"
                {...register("service_location")}
                className="accent-brand-purple"
              />
              In Studio
            </label>
          </div>
        </div>

        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            label="State (Home Service)"
            options={NIGERIAN_STATES.map(s => ({ label: s, value: s }))}
            placeholder="Select state"
            error={errors.state?.message}
            {...register("state")}
            id="booking-state"
          />
          <Input
            label="Home Address"
            placeholder="Enter your full address..."
            error={errors.address?.message}
            {...register("address")}
            id="booking-address"
          />
        </div>

        <div className="sm:col-span-2">
          <Textarea
            label="Special Notes"
            placeholder="Any special requests, allergies, or specific styles you want..."
            {...register("notes")}
            id="booking-notes"
          />
        </div>

        {/* Inspiration Image */}
        <div className="sm:col-span-2">
          <label className="block font-inter text-sm font-medium text-brand-text dark:text-white mb-2">
            Inspiration Image{" "}
            <span className="text-brand-muted font-normal">(optional)</span>
          </label>
          {inspirationPreview ? (
            <div className="relative w-full h-48 rounded-2xl overflow-hidden group">
              <Image
                src={inspirationPreview}
                alt="Inspiration"
                fill
                className="object-cover"
                sizes="600px"
              />
              <button
                type="button"
                onClick={onRemoveImage}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="inspiration-upload"
              className="flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-brand-border dark:border-zinc-700 hover:border-brand-purple/50 transition-colors cursor-pointer bg-brand-surface dark:bg-zinc-900"
            >
              <Upload className="h-8 w-8 text-brand-muted mb-2" />
              <p className="font-inter text-sm text-brand-muted">
                Click to upload inspiration image
              </p>
              <p className="font-inter text-xs text-brand-muted mt-1">
                PNG, JPG up to 5MB
              </p>
              <input
                id="inspiration-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageUpload}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: Payment ──────────────────────────────────────────────────────────

function StepPayment({
  service,
  staff,
  date,
  time,
  watchedPaymentType,
  setValue,
  payAmount,
  loading,
  onPay,
}: {
  service?: (typeof SERVICES)[number];
  staff?: (typeof STAFF)[number];
  date: string;
  time: string;
  watchedPaymentType: "deposit" | "full";
  setValue: (name: "payment_type", value: "deposit" | "full") => void;
  payAmount: number;
  loading: boolean;
  onPay: () => void;
}) {
  const depositAmount = service ? calculateDeposit(service.price) : 0;

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-2">
        Payment & Confirmation
      </h2>
      <p className="font-inter text-brand-muted text-sm mb-8">
        Review your booking and choose your payment option.
      </p>

      {/* Summary Card */}
      <Card padding="lg" className="mb-6 bg-white dark:bg-zinc-900">
        <h3 className="font-playfair font-bold text-lg text-brand-text dark:text-white mb-4">
          Booking Summary
        </h3>
        <div className="space-y-3">
          <Row label="Service" value={service?.name || "—"} />
          <Row label="Specialist" value={staff?.name || "Any available"} />
          <Row label="Date" value={date ? formatDate(date) : "—"} />
          <Row label="Time" value={time ? formatTime(time) : "—"} />
          <Row label="Duration" value={service ? formatDuration(service.duration) : "—"} />
          <div className="border-t border-brand-border dark:border-zinc-800 pt-3">
            <Row label="Total Amount" value={formatCurrency(service?.price || 0)} bold />
          </div>
        </div>
      </Card>

      {/* Payment Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setValue("payment_type", "deposit")}
          id="payment-deposit"
          className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
            watchedPaymentType === "deposit"
              ? "border-brand-purple bg-brand-purple/5 shadow-luxury"
              : "border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-purple/40"
          }`}
        >
          <p className="font-inter font-bold text-brand-text dark:text-white text-lg">
            {formatCurrency(depositAmount)}
          </p>
          <p className="font-inter font-semibold text-sm text-brand-purple mt-1">
            Deposit ({Math.round(DEPOSIT_PERCENTAGE * 100)}%)
          </p>
          <p className="font-inter text-xs text-brand-muted mt-1">
            Pay now to secure your slot. Balance due on arrival.
          </p>
          {watchedPaymentType === "deposit" && (
            <Badge variant="purple" className="mt-3">Selected</Badge>
          )}
        </button>

        <button
          onClick={() => setValue("payment_type", "full")}
          id="payment-full"
          className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
            watchedPaymentType === "full"
              ? "border-brand-purple bg-brand-purple/5 shadow-luxury"
              : "border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-purple/40"
          }`}
        >
          <p className="font-inter font-bold text-brand-text dark:text-white text-lg">
            {formatCurrency(service?.price || 0)}
          </p>
          <p className="font-inter font-semibold text-sm text-brand-purple mt-1">
            Full Payment
          </p>
          <p className="font-inter text-xs text-brand-muted mt-1">
            Pay the full amount now. No balance due on arrival.
          </p>
          {watchedPaymentType === "full" && (
            <Badge variant="purple" className="mt-3">Selected</Badge>
          )}
        </button>
      </div>

      {/* Pay Button */}
      <div className="p-5 bg-brand-surface dark:bg-zinc-900 rounded-2xl border border-brand-border dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <span className="font-inter font-semibold text-brand-text dark:text-white">
            Amount Due Now:
          </span>
          <span className="font-playfair font-bold text-2xl text-brand-purple">
            {formatCurrency(payAmount)}
          </span>
        </div>
        <Button
          variant="purple"
          size="lg"
          fullWidth
          loading={loading}
          onClick={onPay}
          id="pay-now-button"
          className="font-bold"
          icon={<CreditCard className="h-5 w-5" />}
          iconPosition="left"
        >
          {loading ? "Processing Payment..." : `Pay ${formatCurrency(payAmount)} with Paystack`}
        </Button>
        <p className="text-xs text-brand-muted text-center mt-3">
          🔒 Secured by Paystack · All card details are encrypted
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-inter text-sm text-brand-muted">{label}</span>
      <span className={`font-inter text-sm ${bold ? "font-bold text-brand-purple" : "text-brand-text dark:text-white"}`}>
        {value}
      </span>
    </div>
  );
}

// ─── Step 6: Confirmation ─────────────────────────────────────────────────────

function StepConfirmation({
  service,
  bookingRef,
  date,
  time,
  payAmount,
}: {
  service?: (typeof SERVICES)[number];
  bookingRef: string;
  date: string;
  time: string;
  payAmount: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-brand-purple/10 border-4 border-brand-purple rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle2 className="h-12 w-12 text-brand-purple" />
      </motion.div>

      <h2 className="font-playfair text-4xl font-bold text-brand-text dark:text-white mb-4">
        Booking Confirmed!
      </h2>
      <p className="font-inter text-brand-muted text-lg mb-2">
        Your appointment has been successfully booked.
      </p>
      <p className="font-inter text-brand-muted mb-8">
        We&apos;ve sent a confirmation email with all the details. See you soon! 💄
      </p>

      <Card padding="lg" className="max-w-sm mx-auto text-left mb-8">
        <p className="font-inter text-xs text-brand-muted uppercase tracking-wider mb-4">
          Booking Details
        </p>
        <div className="space-y-3">
          <Row label="Booking Ref" value={bookingRef} />
          <Row label="Service" value={service?.name || "—"} />
          <Row label="Date" value={date ? formatDate(date) : "—"} />
          <Row label="Time" value={time ? formatTime(time) : "—"} />
          <Row label="Amount Paid" value={formatCurrency(payAmount)} bold />
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="purple"
          size="lg"
          onClick={() => window.location.href = "/dashboard"}
          id="view-booking"
        >
          View My Booking
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.href = "/"}
          id="back-home"
        >
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
}
