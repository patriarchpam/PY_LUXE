-- Run this SQL in your Supabase SQL Editor to add the new remote location fields to the bookings table.

ALTER TABLE public.bookings 
ADD COLUMN service_location text DEFAULT 'remote' CHECK (service_location IN ('remote', 'in-studio')),
ADD COLUMN address text;
