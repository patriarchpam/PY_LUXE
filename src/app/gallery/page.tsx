import { GalleryClient } from "./GalleryClient";

export const metadata = {
  title: "Gallery",
  description: "View our portfolio of stunning hair, nails, makeup, and henna artistry.",
};

export default function GalleryPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="font-playfair font-black text-4xl md:text-5xl text-brand-black mb-4">
            Our Portfolio
          </h1>
          <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138]" />
          <p className="text-brand-muted max-w-2xl mx-auto font-inter mt-4">
            A glimpse into the PY Luxe experience. Filter by category to see our work.
          </p>
        </div>

        <GalleryClient />

      </div>
    </div>
  );
}
