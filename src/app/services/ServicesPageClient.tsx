"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Sparkles, Filter } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { formatCurrency, formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const categories = [
  "All",
  "Hair",
  "Nails",
  "Makeup",
  "Lashes",
  "Henna",
  "Fashion",
] as const;

type Category = (typeof categories)[number];

export function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"
            alt="Beauty services"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4"
        >
          <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
            What We Offer
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Our Luxury{" "}
            <span className="text-purple-gradient">Services</span>
          </h1>
          <p className="font-inter text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            From hair to nails to makeup — we offer a complete range of premium beauty
            services, each delivered with expert care and premium products.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="bg-white dark:bg-zinc-950 border-b border-brand-border dark:border-zinc-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Filter className="h-4 w-4 text-brand-muted flex-shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.toLowerCase()}`}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-purple text-black shadow-luxury"
                    : "bg-brand-surface dark:bg-zinc-900 text-brand-muted hover:text-brand-purple hover:bg-brand-purple/5 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-brand-surface dark:bg-zinc-900" aria-label="Services list">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <ServiceDetailCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-inter text-brand-muted text-lg">
                No services in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-primary py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Sparkles className="h-10 w-10 text-brand-purple mx-auto mb-4" />
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="font-inter text-white/60 mb-8">
            Book your appointment online in minutes. Instant confirmation, flexible scheduling.
          </p>
          <Link href="/booking" id="services-book-cta">
            <Button
              variant="purple"
              size="xl"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              className="font-semibold"
            >
              Book Your Appointment
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}

function ServiceDetailCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <Card hover padding="none" className="overflow-hidden h-full flex flex-col group">
      {/* Image */}
      <div className="relative h-60 img-zoom-container">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <Badge variant="purple" className="absolute top-4 left-4">
          {service.category}
        </Badge>

        {service.popular && (
          <Badge variant="pink" className="absolute top-4 right-4">
            ✨ Popular
          </Badge>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div>
            <p className="font-inter text-white/60 text-xs mb-0.5">Starting from</p>
            <p className="font-playfair text-white text-2xl font-bold">
              {formatCurrency(service.price)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Clock className="h-3 w-3 text-brand-purple" />
            <span className="font-inter text-white text-xs font-medium">
              {formatDuration(service.duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1" id={service.slug}>
        <h2 className="font-playfair text-xl font-bold text-brand-text dark:text-white mb-3">
          {service.name}
        </h2>
        <p className="font-inter text-brand-muted text-sm leading-relaxed flex-1">
          {service.description}
        </p>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/booking?service=${service.id}`}
            className="flex-1"
            id={`book-service-${service.slug}`}
          >
            <Button variant="purple" size="sm" fullWidth className="font-semibold">
              Book Now
            </Button>
          </Link>
          <Link
            href={`/services/${service.slug}`}
            id={`learn-service-${service.slug}`}
          >
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
