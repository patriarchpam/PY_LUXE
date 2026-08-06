import { createClient } from "@/lib/supabase/server";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("business_settings").select("*").single();

  return <ContactPageClient initialSettings={settings} />;
}
