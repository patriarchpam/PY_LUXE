"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Star, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

const SHOP_CATEGORIES = ["All", "Wigs", "Hair Products", "Nail Products", "Makeup", "Accessories", "Fashion"];

const PRODUCTS = [
  { id: "p1", slug: "full-lace-wig-straight", name: "Full Lace Wig — Straight", category: "Wigs", price: 45000, compare_at_price: 55000, stock: 8, rating: 4.8, reviews: 34, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: true, isBestseller: false },
  { id: "p2", slug: "olaplex-no3", name: "Olaplex No. 3 Hair Perfector", category: "Hair Products", price: 12000, compare_at_price: null, stock: 15, rating: 4.9, reviews: 87, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: false, isBestseller: true },
  { id: "p3", slug: "press-on-nails-set", name: "Luxury Press-On Nail Set", category: "Nail Products", price: 3500, compare_at_price: 5000, stock: 30, rating: 4.7, reviews: 56, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: true, isBestseller: true },
  { id: "p4", slug: "fenty-beauty-foundation", name: "Fenty Beauty Pro Filt'r Foundation", category: "Makeup", price: 18000, compare_at_price: null, stock: 20, rating: 4.9, reviews: 142, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: false, isBestseller: true },
  { id: "p5", slug: "silk-hair-bonnet", name: "Silk Hair Bonnet — Premium", category: "Accessories", price: 4500, compare_at_price: 6000, stock: 25, rating: 4.6, reviews: 29, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: false, isBestseller: false },
  { id: "p6", slug: "body-wave-wig-20inch", name: "Body Wave Wig 20 inch", category: "Wigs", price: 60000, compare_at_price: 75000, stock: 5, rating: 4.8, reviews: 21, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: false, isBestseller: false },
  { id: "p7", slug: "gel-nail-kit", name: "Professional Gel Nail Kit", category: "Nail Products", price: 8500, compare_at_price: 12000, stock: 12, rating: 4.5, reviews: 43, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: true, isBestseller: false },
  { id: "p8", slug: "henna-kit-set", name: "Premium Henna Art Kit", category: "Accessories", price: 5000, compare_at_price: null, stock: 18, rating: 4.7, reviews: 15, images: ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+"], isNew: false, isBestseller: false },
];

type Product = (typeof PRODUCTS)[number];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  const filtered = PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        toast.success(`Updated ${product.name} quantity`);
        return prev.map((c) => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      }
      toast.success(`Added ${product.name} to cart! 🛍️`);
      return [...prev, { id: product.id, qty: 1 }];
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-brand-primary text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #D4AF37 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-inter text-brand-purple text-xs font-medium tracking-[0.4em] uppercase mb-4">
            PY Luxe Store
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-playfair text-5xl font-bold text-white mb-4">
            Shop <span className="text-purple-gradient">Premium</span> Beauty
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-inter text-white/60">
            Curated beauty products, wigs, accessories, and more — delivered to your door.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-950 border-b border-brand-border dark:border-zinc-800 sticky top-16 z-30 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto flex-1">
            {SHOP_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                id={`shop-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-purple text-black shadow-luxury"
                    : "bg-brand-surface dark:bg-zinc-900 text-brand-muted hover:text-brand-purple"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="shop-search"
            className="w-full sm:w-64 h-10 rounded-xl border border-brand-border dark:border-zinc-700 px-4 text-sm font-inter bg-brand-surface dark:bg-zinc-900 text-brand-text dark:text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-purple"
          />
        </div>
      </div>

      {/* Products Grid */}
      <section className="section-padding bg-brand-surface dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <p className="font-inter text-sm text-brand-muted mb-6">
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    onAddToCart={() => addToCart(product)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag className="h-12 w-12 text-brand-muted mx-auto mb-4" />
              <p className="font-inter text-brand-muted text-lg">No products found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Cart FAB */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-40"
        >
          <Link href="/shop/cart" id="shop-cart-fab">
            <Button variant="primary" className="shadow-glass-lg pr-6 pl-5">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Cart ({cart.reduce((acc, c) => acc + c.qty, 0)})
            </Button>
          </Link>
        </motion.div>
      )}
    </>
  );
}

function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
}) {
  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : null;

  return (
    <Card hover padding="none" className="group overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-square img-zoom-container bg-brand-surface dark:bg-zinc-800">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestseller && <Badge variant="purple" size="sm">Bestseller</Badge>}
          {product.isNew && <Badge variant="pink" size="sm">New</Badge>}
          {discount && <Badge variant="success" size="sm">-{discount}%</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); onToggleWishlist(); }}
          id={`wishlist-${product.id}`}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? "bg-brand-pink text-rose-600"
              : "bg-white/80 dark:bg-zinc-800/80 text-brand-muted hover:text-rose-500"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Stock warning */}
        {product.stock <= 5 && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="warning" size="sm">Only {product.stock} left</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="font-inter text-xs text-brand-purple font-medium mb-1">{product.category}</p>
        <Link href={`/shop/${product.slug}`} id={`product-${product.id}`}>
          <h3 className="font-inter font-semibold text-sm text-brand-text dark:text-white hover:text-brand-purple transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="h-3 w-3 fill-brand-purple text-brand-purple" />
          <span className="font-inter text-xs font-medium text-brand-text dark:text-white">{product.rating}</span>
          <span className="font-inter text-xs text-brand-muted">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="font-playfair font-bold text-lg text-brand-purple">
            {formatCurrency(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="font-inter text-sm text-brand-muted line-through">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>

        <Button
          variant="purple"
          size="sm"
          fullWidth
          onClick={onAddToCart}
          id={`add-to-cart-${product.id}`}
          icon={<ShoppingBag className="h-4 w-4" />}
          iconPosition="left"
          className="font-semibold"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
