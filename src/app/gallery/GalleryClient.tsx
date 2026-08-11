"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY, GALLERY_CATEGORIES, GalleryCategory } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const filteredGallery =
    activeCategory === "All"
      ? GALLERY
      : GALLERY.filter((img) => img.category === activeCategory);

  const slides = filteredGallery.map((img) => ({ src: img.src, alt: img.alt }));

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2 rounded-full font-inter text-sm font-medium transition-all duration-300",
              activeCategory === cat
                ? "bg-brand-gold text-brand-black shadow-md"
                : "bg-white text-brand-muted hover:bg-brand-surface border border-brand-border"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div layout className="masonry-grid">
        <AnimatePresence>
          {filteredGallery.map((img, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={img.id}
              className="masonry-item relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800} // Approximate aspect ratio, masonry handles height automatically if using CSS columns, but Next/Image needs explicit width/height or layout fill. Using responsive sizes.
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-playfair font-semibold text-lg tracking-wide bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredGallery.length === 0 && (
        <div className="text-center py-20 text-brand-muted font-inter">
          No images available in this category yet.
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
      />
    </>
  );
}
