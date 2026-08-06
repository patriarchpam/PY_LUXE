"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { Metadata } from "next";

const BLOG_CATEGORIES = ["All", "Hair Care", "Nail Care", "Makeup Tips", "Fashion", "Lifestyle"];

const BLOG_POSTS = [
  {
    id: "1",
    slug: "how-to-maintain-your-wig-between-visits",
    title: "How to Maintain Your Wig Between Salon Visits",
    excerpt: "Keep your wig looking fresh and flawless with these expert-approved maintenance tips from our lead stylist.",
    category: "Hair Care",
    cover: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
    author: "Chiamaka Obi",
    readTime: "5 min read",
    date: "August 1, 2026",
  },
  {
    id: "2",
    slug: "top-nail-trends-2026",
    title: "Top 10 Nail Trends Dominating 2026",
    excerpt: "From glazed donut nails to chrome finishes — here are the nail looks you need to try this season.",
    category: "Nail Care",
    cover: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
    author: "Ngozi Eze",
    readTime: "4 min read",
    date: "July 28, 2026",
  },
  {
    id: "3",
    slug: "bridal-makeup-guide-nigeria",
    title: "The Ultimate Nigerian Bridal Makeup Guide",
    excerpt: "From traditional to modern — everything a bride needs to know about achieving the perfect wedding day look.",
    category: "Makeup Tips",
    cover: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
    author: "Adaeze Nwosu",
    readTime: "8 min read",
    date: "July 20, 2026",
  },
  {
    id: "4",
    slug: "build-your-capsule-wardrobe",
    title: "How to Build a Capsule Wardrobe That Works for You",
    excerpt: "Quality over quantity. Our fashion expert shares how to curate a versatile wardrobe with just 30 key pieces.",
    category: "Fashion",
    cover: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
    author: "Chiamaka Obi",
    readTime: "6 min read",
    date: "July 15, 2026",
  },
  {
    id: "5",
    slug: "natural-hair-moisture-guide",
    title: "The Science of Moisture: A Natural Hair Guide",
    excerpt: "Understanding the LOC method, porosity levels, and the best products for your natural hair texture.",
    category: "Hair Care",
    cover: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
    author: "Chiamaka Obi",
    readTime: "7 min read",
    date: "July 10, 2026",
  },
  {
    id: "6",
    slug: "skincare-routine-before-makeup",
    title: "The Perfect Skincare Routine Before Makeup",
    excerpt: "Great makeup starts with great skin. Here's how to prep your skin for a flawless, long-lasting application.",
    category: "Makeup Tips",
    cover: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+",
    author: "Adaeze Nwosu",
    readTime: "5 min read",
    date: "July 5, 2026",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-brand-primary text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">Beauty Insights</p>
          <h1 className="font-playfair text-5xl font-bold text-white mb-4">
            The PY Luxe <span className="text-purple-gradient">Blog</span>
          </h1>
          <p className="font-inter text-white/60 text-lg">
            Expert tips, trends, and beauty inspiration — curated by our team of specialists.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-950 border-b border-brand-border dark:border-zinc-800 sticky top-16 z-30 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto flex-1">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                id={`blog-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-purple text-black"
                    : "bg-brand-surface dark:bg-zinc-900 text-brand-muted hover:text-brand-purple"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full sm:w-64">
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="blog-search"
              className="w-full h-10 rounded-xl border border-brand-border dark:border-zinc-700 px-4 text-sm font-inter bg-brand-surface dark:bg-zinc-900 text-brand-text dark:text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="section-padding bg-brand-surface dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-inter text-brand-muted text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <Link href={`/blog/${featured.slug}`} id={`blog-featured-${featured.id}`}>
                    <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-brand-border dark:border-zinc-800 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                      <div className="relative h-72 lg:h-auto img-zoom-container">
                        <Image
                          src={featured.cover}
                          alt={featured.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                        />
                        <Badge variant="purple" className="absolute top-4 left-4">Featured</Badge>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <Badge variant="pink" className="self-start mb-4">{featured.category}</Badge>
                        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-text dark:text-white mb-4 group-hover:text-brand-purple transition-colors">
                          {featured.title}
                        </h2>
                        <p className="font-inter text-brand-muted leading-relaxed mb-6">{featured.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-brand-muted font-inter">
                          <span>By {featured.author}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {featured.readTime}
                          </span>
                          <span>·</span>
                          <span>{featured.date}</span>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-brand-purple font-inter text-sm font-medium group-hover:gap-3 transition-all">
                          Read Article <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Rest of posts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link href={`/blog/${post.slug}`} id={`blog-post-${post.id}`}>
                      <Card hover padding="none" className="group h-full overflow-hidden">
                        <div className="relative h-48 img-zoom-container">
                          <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-5">
                          <Badge variant="purple" size="sm" className="mb-3">{post.category}</Badge>
                          <h3 className="font-playfair font-bold text-lg text-brand-text dark:text-white group-hover:text-brand-purple transition-colors mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="font-inter text-sm text-brand-muted line-clamp-2 mb-4">{post.excerpt}</p>
                          <div className="flex items-center gap-3 text-xs text-brand-muted font-inter">
                            <span>{post.readTime}</span>
                            <span>·</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
