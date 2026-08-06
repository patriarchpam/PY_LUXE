import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PY Luxe — Our premier luxury beauty studio. Our story, mission, and the passionate team behind every transformation.",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: aboutContent } = await supabase.from("about_content").select("*").single();
  const { data: settings } = await supabase.from("business_settings").select("*").single();

  return <AboutPageClient aboutContent={aboutContent} settings={settings} />;
}

// Triggers TS Server reload - refreshed
