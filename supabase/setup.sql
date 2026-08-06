-- Create business_settings table
CREATE TABLE IF NOT EXISTS public.business_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL DEFAULT 'PY Luxe',
  business_address text,
  maps_location text,
  whatsapp_number text,
  phone_number text,
  email text,
  instagram_url text,
  tiktok_url text,
  facebook_url text,
  business_hours text,
  booking_policy text,
  deposit_policy text,
  cancellation_policy text,
  travel_fee numeric DEFAULT 0,
  home_service_fee numeric DEFAULT 0,
  delivery_fee numeric DEFAULT 0,
  emergency_booking_fee numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Ensure only one row exists for settings
CREATE UNIQUE INDEX IF NOT EXISTS business_settings_single_row ON public.business_settings((true));

-- Insert default empty settings if table is empty
INSERT INTO public.business_settings (business_name) 
SELECT 'PY Luxe' 
WHERE NOT EXISTS (SELECT 1 FROM public.business_settings);

-- Create about_content table
CREATE TABLE IF NOT EXISTS public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  about_me text,
  mission text,
  vision text,
  why_choose_us text,
  owner_profile text,
  certificates jsonb DEFAULT '[]'::jsonb,
  awards jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Ensure only one row exists for about_content
CREATE UNIQUE INDEX IF NOT EXISTS about_content_single_row ON public.about_content((true));

-- Insert default empty about_content if table is empty
INSERT INTO public.about_content (about_me) 
SELECT '' 
WHERE NOT EXISTS (SELECT 1 FROM public.about_content);

-- Enable RLS (Row Level Security) - optional but recommended
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public read access on business_settings" 
ON public.business_settings FOR SELECT USING (true);

CREATE POLICY "Allow public read access on about_content" 
ON public.about_content FOR SELECT USING (true);

-- Allow authenticated (admin) users to update settings
CREATE POLICY "Allow authenticated users to update business_settings" 
ON public.business_settings FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update about_content" 
ON public.about_content FOR UPDATE USING (auth.role() = 'authenticated');
