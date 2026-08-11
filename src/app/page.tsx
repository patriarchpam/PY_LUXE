import Image from "next/image";
import Link from "next/link";
import { BRAND, GALLERY } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="PY Luxe Luxury Beauty"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-playfair font-black text-5xl md:text-7xl text-white tracking-wider mb-4 drop-shadow-lg">
            {BRAND.name}
          </h1>
          <p className="font-inter font-light text-xl md:text-3xl text-brand-gold mb-6 drop-shadow-md">
            {BRAND.tagline}
          </p>
          <p className="font-inter text-base md:text-lg text-white/90 mb-2">
            Hair, nails, makeup and henna services in Abuja.
          </p>
          <p className="font-inter text-sm md:text-base text-brand-blush mb-10 font-medium">
            Available at {BRAND.primary_service_location} &bull; Home service available
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-brand-gold text-brand-black px-8 py-4 rounded-xl font-bold font-inter text-sm md:text-base hover:bg-[#e6c138] transition-colors shadow-lg"
            >
              BOOK AN APPOINTMENT
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold font-inter text-sm md:text-base hover:bg-white/20 transition-colors"
            >
              VIEW SERVICES
            </Link>
          </div>
          <div className="mt-6">
            <a
              href={whatsappLink(BRAND.whatsapp, "Hello PY Luxe! 💕 I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-brand-gold transition-colors font-inter text-sm underline underline-offset-4"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services Categories Section */}
      <section className="section-padding bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-4xl text-brand-black mb-4">Our Services</h2>
            <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138]" />
            <p className="text-brand-muted max-w-2xl mx-auto font-inter">
              Discover our premium beauty treatments designed to make you look and feel your absolute best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Hair", desc: "Expert styling, knotless braids, and flawless wig installations.", img: "/images/hair.png" },
              { title: "Nails", desc: "Elegant acrylics, gel polish, and custom nail art.", img: "/images/nails.png" },
              { title: "Makeup", desc: "Soft glam and event makeup for your special occasions.", img: "/images/makeup.png" },
              { title: "Henna", desc: "Intricate, beautiful henna artistry for hands and feet.", img: "/images/henna.png" },
            ].map((cat) => (
              <Link href="/services" key={cat.title} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="relative h-64 w-full img-zoom-container">
                    <Image src={cat.img} alt={cat.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-playfair font-bold text-2xl text-brand-black mb-2">{cat.title}</h3>
                    <p className="text-brand-muted text-sm font-inter">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why PY Luxe Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-luxury-lg">
              <Image src="/images/hero.png" alt="Why PY Luxe" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-playfair font-bold text-4xl text-brand-black mb-6">
                Why PY Luxe?
              </h2>
              <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138] mx-0 mb-8" />
              
              <ul className="space-y-6">
                {[
                  "Personalized beauty service tailored just for you",
                  "Meticulous attention to detail and quality",
                  "Convenient and straightforward booking process",
                  `Available exclusively at ${BRAND.primary_service_location}`,
                  "Comfortable home service available upon request"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="font-inter text-brand-text text-lg">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-brand-black font-semibold hover:text-brand-gold transition-colors"
                >
                  Learn more about us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="section-padding bg-brand-blush/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-4xl text-brand-black mb-4">Featured Work</h2>
            <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138]" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.slice(0, 4).map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-md img-zoom-container">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-white border border-brand-border text-brand-black px-8 py-3 rounded-xl font-medium hover:bg-brand-surface transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 text-brand-gold">
            Ready to Book?
          </h2>
          <p className="font-inter text-lg text-white/80 mb-10">
            Secure your appointment today and let us bring out your confidence and style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/booking"
              className="bg-brand-gold text-brand-black px-8 py-4 rounded-xl font-bold font-inter text-sm md:text-base hover:bg-[#e6c138] transition-colors shadow-lg"
            >
              BOOK AN APPOINTMENT
            </Link>
            <a
              href={whatsappLink(BRAND.whatsapp, "Hello PY Luxe! 💕 I'd like to chat.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold font-inter text-sm md:text-base hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              CHAT WITH PY LUXE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
