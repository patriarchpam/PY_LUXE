"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Sparkles,
  Shield,
  Award,
  Star,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import {
  SERVICES,
  TESTIMONIALS,
  STATS,
  FAQS,
  BRAND,
} from "@/lib/constants";
import { formatCurrency, formatDuration } from "@/lib/utils";

// ─── Section: Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-primary"
      aria-label="Hero section"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"
          alt="Luxury beauty salon"
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
      </motion.div>

      {/* Gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Floating decorative orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-px w-12 bg-brand-purple" />
          <span className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase">
            Location&apos;s Premier Beauty Studio
          </span>
          <div className="h-px w-12 bg-brand-purple" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6"
        >
          Beauty.{" "}
          <em className="not-italic text-purple-gradient block sm:inline">Style.</em>{" "}
          Confidence.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-inter text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          From flawless hair installations to editorial makeup and exquisite nails.
          Your luxury transformation starts here.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/booking" id="hero-book-now">
            <Button
              variant="purple"
              size="xl"
              className="font-semibold shadow-luxury-lg"
              icon={<Sparkles className="h-5 w-5" />}
              iconPosition="left"
            >
              Book Your Appointment
            </Button>
          </Link>
          <Link href="/services" id="hero-services">
            <Button
              variant="ghost"
              size="xl"
              className="border border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
            >
              Explore Services
            </Button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-8 lg:gap-12"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-2xl sm:text-3xl font-bold text-brand-purple">
                {stat.value}
              </p>
              <p className="font-inter text-xs text-white/50 tracking-wider uppercase mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-xs text-white/40 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-brand-purple" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Section: Marquee Strip ─────────────────────────────────────────────────
function MarqueeSection() {
  const items = [
    "Hair Installation",
    "Bridal Makeup",
    "Acrylic Nails",
    "Lash Extensions",
    "Wig Revamp",
    "Fashion Consulting",
    "Henna Art",
    "Natural Hair Care",
  ];

  return (
    <div className="bg-brand-purple py-4 overflow-hidden" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-6 text-black font-inter font-semibold text-sm tracking-wide"
          >
            <Star className="h-3 w-3 fill-black" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Featured Services ─────────────────────────────────────────────
function ServicesSection() {
  const featured = SERVICES.filter((s) => s.popular);

  return (
    <section className="section-padding bg-white dark:bg-zinc-950" aria-label="Featured services">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
            Our Specialties
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-4">
            Services That <em className="not-italic text-purple-gradient">Elevate</em> You
          </h2>
          <div className="purple-divider" />
          <p className="font-inter text-brand-muted text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Experience luxury beauty services crafted with precision, passion, and premium
            products. Every appointment is a bespoke experience.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              id="home-all-services"
            >
              View All 15 Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <Card hover padding="none" className="group overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="img-zoom-container relative h-52">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {service.popular && (
          <Badge
            variant="purple"
            className="absolute top-3 left-3"
          >
            ✨ Popular
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="font-inter font-bold text-white text-lg">
            {formatCurrency(service.price)}
          </span>
          <span className="flex items-center gap-1 text-white/80 text-xs font-inter">
            <Clock className="h-3 w-3" />
            {formatDuration(service.duration)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-brand-purple font-medium font-inter tracking-wider uppercase mb-1">
          {service.category}
        </p>
        <h3 className="font-playfair font-bold text-lg text-brand-text dark:text-white mb-2">
          {service.name}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed flex-1 line-clamp-3">
          {service.description}
        </p>
        <div className="mt-4">
          <Link href={`/booking?service=${service.id}`} id={`service-book-${service.id}`}>
            <Button variant="purple" size="sm" fullWidth className="font-semibold">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

// ─── Section: Beauty Collage ────────────────────────────────────────────────
function BeautyCollageSection() {
  const images = [
    {
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      alt: "Makeup artistry",
      className: "col-span-1 row-span-2",
    },
    {
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      alt: "Hair styling",
      className: "col-span-1 row-span-1",
    },
    {
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      alt: "Nail art",
      className: "col-span-1 row-span-1",
    },
    {
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      alt: "Bridal beauty",
      className: "col-span-1 row-span-1",
    },
    {
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      alt: "Henna art",
      className: "col-span-1 row-span-1",
    },
  ];

  return (
    <section
      className="section-padding bg-brand-surface dark:bg-zinc-900"
      aria-label="Beauty gallery collage"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
              The PY Luxe Experience
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-6 leading-tight">
              Where Art Meets{" "}
              <em className="not-italic text-purple-gradient">Luxury</em>
            </h2>
            <p className="font-inter text-brand-muted text-lg leading-relaxed mb-6">
              Every client that walks through our doors leaves feeling like the
              best version of themselves. We don&apos;t just do hair and nails — we
              craft transformations.
            </p>
            <p className="font-inter text-brand-muted leading-relaxed mb-8">
              Using only the finest products from globally-renowned brands, our
              team of certified experts brings your vision to life with
              uncompromising attention to detail.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: Shield, title: "Premium Products", desc: "Only the finest brands" },
                { icon: Award, title: "Certified Artists", desc: "Trained professionals" },
                { icon: Sparkles, title: "Luxury Experience", desc: "5-star ambiance" },
                { icon: Star, title: "Guaranteed Results", desc: "Your satisfaction first" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
                      {title}
                    </p>
                    <p className="font-inter text-xs text-brand-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
                id="home-our-story"
              >
                Our Story
              </Button>
            </Link>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-3 h-[500px]"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "relative rounded-2xl overflow-hidden img-zoom-container",
                  img.className
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper import
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Section: Stats Bar ────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section
      className="bg-brand-primary py-16 px-4"
      aria-label="Statistics"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="font-playfair text-4xl font-bold text-brand-purple mb-2">
              {stat.value}
            </p>
            <p className="font-inter text-sm text-white/50 tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Testimonials ─────────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="section-padding bg-white dark:bg-zinc-950 overflow-hidden"
      aria-label="Customer testimonials"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
            Client Love
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-4">
            What Our Clients{" "}
            <em className="not-italic text-purple-gradient">Say</em>
          </h2>
          <div className="purple-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card
                hover
                padding="lg"
                className="h-full flex flex-col bg-brand-surface dark:bg-zinc-900 border-brand-border dark:border-zinc-800"
              >
                {/* Stars */}
                <StarRating rating={t.rating} size="sm" className="mb-4" />

                {/* Quote */}
                <p className="font-inter text-brand-text dark:text-white/80 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Service */}
                <Badge variant="purple" className="self-start mb-4">
                  {t.service}
                </Badge>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-brand-border dark:border-zinc-800">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-brand-purple/10">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
                      {t.name}
                    </p>
                    <p className="font-inter text-xs text-brand-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/reviews">
            <Button
              variant="ghost"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              id="home-all-reviews"
            >
              Read All Reviews
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Gallery Preview ───────────────────────────────────────────────
function GalleryPreviewSection() {
  const previews = [
    { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+", alt: "Hair styling 1", category: "Hair" },
    { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+", alt: "Nail art 1", category: "Nails" },
    { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+", alt: "Makeup 1", category: "Makeup" },
    { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+", alt: "Bridal 1", category: "Makeup" },
    { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+", alt: "Henna 1", category: "Henna" },
    { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+", alt: "Braids 1", category: "Hair" },
  ];

  return (
    <section
      className="section-padding bg-brand-surface dark:bg-zinc-900"
      aria-label="Gallery preview"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
            Our Portfolio
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-4">
            Work We&apos;re{" "}
            <em className="not-italic text-purple-gradient">Proud Of</em>
          </h2>
          <div className="purple-divider" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative group rounded-2xl overflow-hidden aspect-square img-zoom-container"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-purple text-black text-xs font-semibold px-3 py-1.5 rounded-full font-inter">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/gallery">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              id="home-full-gallery"
            >
              View Full Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: FAQ ──────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="section-padding bg-white dark:bg-zinc-950"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
            Got Questions?
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-4">
            Frequently Asked{" "}
            <em className="not-italic text-purple-gradient">Questions</em>
          </h2>
          <div className="purple-divider" />
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <div
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === i
                    ? "border-brand-purple/40 shadow-luxury bg-brand-purple/5"
                    : "border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  id={`faq-${i}`}
                >
                  <span className="font-inter font-semibold text-sm text-brand-text dark:text-white pr-4">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 w-7 h-7 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple">
                    {openIndex === i ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 font-inter text-sm text-brand-muted leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="font-inter text-brand-muted text-sm mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <Link href="/contact">
            <Button variant="outline" size="md" id="home-contact-us">
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Instagram Feed ────────────────────────────────────────────────
function InstagramSection() {
  const posts = Array.from({ length: 6 }, (_, i) => ({
    src: [
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
    ][i],
    alt: `Instagram post ${i + 1}`,
  }));

  return (
    <section
      className="section-padding bg-brand-surface dark:bg-zinc-900 pt-0"
      aria-label="Instagram feed"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-inter text-brand-muted text-sm mb-1">Follow us on Instagram</p>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-playfair text-2xl font-bold text-brand-text dark:text-white hover:text-brand-purple transition-colors"
            id="home-instagram-link"
          >
            @pyluxe
          </a>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="relative aspect-square rounded-xl overflow-hidden group"
              aria-label={`Instagram post ${i + 1}`}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper for Instagram icon
function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

// ─── Page Entry Point ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <BeautyCollageSection />
      <StatsSection />
      <TestimonialsSection />
      <GalleryPreviewSection />
      <FAQSection />
      <InstagramSection />
    </>
  );
}
