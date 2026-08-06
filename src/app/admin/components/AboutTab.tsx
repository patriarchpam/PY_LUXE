"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function AboutTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchAbout() {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .single();
      
      if (data) {
        reset(data);
      }
      setLoading(false);
    }
    fetchAbout();
  }, [reset]);

  const onSubmit = async (data: any) => {
    setSaving(true);
    const { id, created_at, updated_at, certificates, awards, ...updateData } = data;
    
    const { error } = await supabase
      .from("about_content")
      .update(updateData)
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to update About content");
      console.error(error);
    } else {
      toast.success("About content updated successfully!");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading about content...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-playfair font-bold text-white mb-6">About Page Content</h2>
        <div className="space-y-6">
          <Textarea label="About Me" {...register("about_me")} rows={5} placeholder="Tell your story..." />
          <Textarea label="Mission" {...register("mission")} rows={3} placeholder="Your business mission..." />
          <Textarea label="Vision" {...register("vision")} rows={3} placeholder="Your vision..." />
          <Textarea label="Why Choose Us" {...register("why_choose_us")} rows={4} placeholder="What makes PY Luxe unique?" />
          <Textarea label="Owner Profile" {...register("owner_profile")} rows={4} placeholder="Brief bio of the founder..." />
        </div>
      </div>

      {/* Note: JSON arrays for Certificates and Awards can be added later in Phase 2/3 */}

      <div className="flex justify-end">
        <Button type="submit" variant="purple" disabled={saving}>
          {saving ? "Saving..." : "Save About Content"}
        </Button>
      </div>
    </form>
  );
}
