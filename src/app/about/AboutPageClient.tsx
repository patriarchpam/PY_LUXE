"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Heart, Star, Users, ArrowRight } from "lucide-react";
import { STAFF, STATS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

const achievements = [
  { title: "Best Beauty Studio", org: "Location Style Awards 2023", year: "2023" },
  { title: "Top Bridal Service", org: "Nigerian Wedding Magazine", year: "2022" },
  { title: "Excellence in Beauty", org: "West Africa Beauty Week", year: "2023" },
  { title: "Customer Choice Award", org: "Beauty & Style Nigeria", year: "2024" },
];

export function AboutPageClient({ aboutContent, settings }: { aboutContent?: any, settings?: any }) {
  const businessName = settings?.business_name || "PY Luxe";
  const aboutMe = aboutContent?.about_me || "Eight years of passion, precision, and transformation. This is our story.";
  const mission = aboutContent?.mission || "We exist to bring out the inner glow in every woman...";
  const vision = aboutContent?.vision || "To be the leading luxury beauty brand in West Africa...";
  const whyUs = aboutContent?.why_choose_us || "We don't just do beauty, we do luxury.";
  const owner = aboutContent?.owner_profile || "Chiamaka Obi, Founder & Lead Stylist";
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-primary overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"
            alt="About PY Luxe"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6"
          >
            About <span className="text-purple-gradient">{businessName}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-white/70 text-lg leading-relaxed whitespace-pre-line"
          >
            {aboutMe}
          </motion.p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"
                  alt="Chiamaka Obi — Founder of PY Luxe"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-glass-lg border border-brand-border dark:border-zinc-800">
                <p className="font-playfair font-bold text-lg text-brand-text dark:text-white">
                  {owner.split(',')[0]}
                </p>
                <p className="font-inter text-xs text-brand-purple">{owner.split(',').slice(1).join(',').trim() || "Founder & Lead Stylist"}</p>
                <div className="flex items-center gap-1 mt-2">
                  <StarRating rating={4.9} size="sm" />
                  <span className="font-inter text-xs text-brand-muted ml-1">
                    4.9 · 248 reviews
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
                The Founder
              </p>
              <h2 className="font-playfair text-4xl font-bold text-brand-text dark:text-white mb-6">
                A Passion Born from Love of Beauty
              </h2>
              <div className="space-y-4 font-inter text-brand-muted leading-relaxed">
                <p>
                  PY Luxe was born in 2016 from a simple but powerful belief: every woman
                  deserves to feel extraordinarily beautiful. Founder Chiamaka Obi started
                  her journey doing hair for friends and family in her small apartment in
                  Location Island, armed with nothing but talent, passion, and an unwavering
                  commitment to excellence.
                </p>
                <p>
                  After training with some of the world&apos;s most renowned beauty academies
                  in London and New York, Chiamaka returned to Nigeria with a vision — to
                  bring world-class luxury beauty services to African women, celebrating
                  their natural beauty and unique style.
                </p>
                <p>
                  Today, PY Luxe is more than a beauty studio. It&apos;s a sanctuary where
                  women come to be celebrated, transformed, and empowered. With a team of
                  certified experts and thousands of satisfied clients, the dream has grown
                  beyond what Chiamaka ever imagined.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8 mb-8">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-playfair text-3xl font-bold text-brand-purple">
                      {stat.value}
                    </p>
                    <p className="font-inter text-sm text-brand-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/booking">
                <Button
                  variant="purple"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                  id="about-book-now"
                >
                  Book with Chiamaka
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-brand-surface dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl font-bold text-brand-text dark:text-white mb-4">
              Our <span className="text-purple-gradient">Mission & Vision</span>
            </h2>
            <div className="gold-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card padding="lg" className="h-full border-brand-purple/20 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="font-inter text-brand-muted leading-relaxed whitespace-pre-line">
                  {mission}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card padding="lg" className="h-full border-brand-purple/20 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-brand-text dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="font-inter text-brand-muted leading-relaxed whitespace-pre-line">
                  {vision}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
              Meet the Experts
            </p>
            <h2 className="font-playfair text-4xl font-bold text-brand-text dark:text-white mb-4">
              Our <span className="text-purple-gradient">Dream Team</span>
            </h2>
            <div className="gold-divider" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STAFF.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card hover padding="none" className="text-center overflow-hidden">
                  <div className="relative h-64 img-zoom-container">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-playfair font-bold text-lg text-brand-text dark:text-white">
                      {member.name}
                    </h3>
                    <p className="font-inter text-xs text-brand-purple mt-0.5">{member.role}</p>
                    <StarRating rating={member.rating} size="sm" showValue className="justify-center mt-2" />
                    <p className="font-inter text-xs text-brand-muted mt-3 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                      {member.specialties.slice(0, 2).map((s) => (
                        <Badge key={s} variant="purple" size="sm">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-brand-primary">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
              Recognition
            </p>
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              Awards & <span className="text-purple-gradient">Achievements</span>
            </h2>
            <div className="gold-divider" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl"
              >
                <div className="w-12 h-12 bg-brand-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <p className="font-inter font-semibold text-white">{achievement.title}</p>
                  <p className="font-inter text-xs text-white/50">{achievement.org}</p>
                  <Badge variant="purple" size="sm" className="mt-1">{achievement.year}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
