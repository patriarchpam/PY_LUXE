import Image from "next/image";
import Link from "next/link";
import { SERVICES, ServiceCategory } from "@/lib/constants";

export const metadata = {
  title: "Services",
  description: "Explore our premium beauty services including hair, nails, makeup, and henna.",
};

export default function ServicesPage() {
  const categories: ServiceCategory[] = ["Hair", "Nails", "Makeup", "Henna"];

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-playfair font-black text-4xl md:text-5xl text-brand-black mb-4">
            Our Services
          </h1>
          <div className="purple-divider bg-gradient-to-r from-brand-gold to-[#e6c138]" />
          <p className="text-brand-muted max-w-2xl mx-auto font-inter mt-4">
            Browse our premium treatments tailored for elegance and style. 
            Select a service to book your appointment.
          </p>
        </div>

        <div className="space-y-20">
          {categories.map((category) => {
            const categoryServices = SERVICES.filter((s) => s.category === category);
            
            if (categoryServices.length === 0) return null;

            return (
              <section key={category} id={category.toLowerCase()} className="scroll-mt-32">
                <h2 className="font-playfair font-bold text-3xl text-brand-black mb-8 border-b border-brand-border pb-4">
                  {category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryServices.map((service) => (
                    <div 
                      key={service.id} 
                      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                    >
                      {service.image && (
                        <div className="relative h-60 w-full">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-playfair font-bold text-xl text-brand-black mb-2">
                          {service.name}
                        </h3>
                        <p className="text-brand-muted text-sm font-inter flex-1 mb-6">
                          {service.description}
                        </p>
                        
                        <div className="mt-auto space-y-4">
                          <div className="flex items-center justify-between text-sm font-inter">
                            <span className="font-semibold text-brand-text">Price:</span>
                            <span className="text-brand-gold font-medium text-right">
                              {service.price}
                            </span>
                          </div>
                          
                          {service.duration && (
                            <div className="flex items-center justify-between text-sm font-inter">
                              <span className="font-semibold text-brand-text">Duration:</span>
                              <span className="text-brand-muted text-right">
                                {service.duration}
                              </span>
                            </div>
                          )}

                          <Link
                            href="/booking"
                            className="block w-full text-center bg-brand-black text-white px-4 py-3 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors mt-4"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}
