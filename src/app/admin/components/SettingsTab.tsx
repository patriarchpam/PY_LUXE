"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function SettingsTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from("business_settings")
        .select("*")
        .single();
      
      if (data) {
        reset(data);
      }
      setLoading(false);
    }
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: any) => {
    setSaving(true);
    const { id, created_at, updated_at, ...updateData } = data;
    
    const { error } = await supabase
      .from("business_settings")
      .update(updateData)
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to update settings");
      console.error(error);
    } else {
      toast.success("Business settings updated successfully!");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading settings...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-playfair font-bold text-white mb-6">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Business Name" {...register("business_name")} />
          <Input label="Business Address" {...register("business_address")} />
          <Input label="Maps Location URL" {...register("maps_location")} />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-playfair font-bold text-white mb-6">Contact & Socials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="WhatsApp Number" {...register("whatsapp_number")} />
          <Input label="Phone Number" {...register("phone_number")} />
          <Input label="Email Address" type="email" {...register("email")} />
          <Input label="Instagram URL" {...register("instagram_url")} />
          <Input label="TikTok URL" {...register("tiktok_url")} />
          <Input label="Facebook URL" {...register("facebook_url")} />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-playfair font-bold text-white mb-6">Policies & Hours</h2>
        <div className="space-y-6">
          <Textarea label="Business Hours" {...register("business_hours")} rows={3} />
          <Textarea label="Booking Policy" {...register("booking_policy")} rows={3} />
          <Textarea label="Deposit Policy" {...register("deposit_policy")} rows={3} />
          <Textarea label="Cancellation Policy" {...register("cancellation_policy")} rows={3} />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-playfair font-bold text-white mb-6">Fees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Travel Fee" type="number" {...register("travel_fee")} />
          <Input label="Home Service Fee" type="number" {...register("home_service_fee")} />
          <Input label="Delivery Fee" type="number" {...register("delivery_fee")} />
          <Input label="Emergency Booking Fee" type="number" {...register("emergency_booking_fee")} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="purple" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
