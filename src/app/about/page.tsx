import { BRAND } from "@/lib/constants";

export const metadata = {
  title: "About Us",
  description: "Learn more about PY Luxe, Abuja's premium beauty brand offering hair, nails, makeup, and henna services.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-playfair font-black text-4xl md:text-5xl text-brand-black mb-4 uppercase tracking-widest">
            About {BRAND.name}
          </h1>
          <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138]" />
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card text-center">
          <p className="font-inter text-lg md:text-xl text-brand-text leading-relaxed mb-8">
            {BRAND.name} is a beauty brand based in Abuja, offering premium hair, nail, makeup, and henna services with a focus on helping every client look and feel their absolute best.
          </p>
          
          <div className="inline-block bg-brand-blush/30 px-6 py-4 rounded-xl border border-brand-blush">
            <p className="font-inter text-brand-black font-semibold text-lg mb-2">
              Available at {BRAND.primary_service_location}
            </p>
            <p className="font-inter text-brand-black text-base">
              Home service available upon request.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
