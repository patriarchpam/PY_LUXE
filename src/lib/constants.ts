export const BRAND = {
  name: "PY Luxe",
  tagline: "Beauty. Style. Confidence.",
  description: "Hair, nails, makeup and henna services in Abuja.",
  location: "Abuja, Nigeria",
  primary_service_location: "Veritas University, Abuja",
  whatsapp: "2347055034041",
  display_whatsapp: "07055034041",
  url: "https://pyluxe.com", // Adjust as necessary
} as const;

export const COLORS = {
  black: "#171717",
  blush: "#F8E8EC",
  cream: "#FFF9F5",
  white: "#FFFFFF",
  gold: "#C9A227",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceCategory = "Hair" | "Nails" | "Makeup" | "Henna";

export type Service = {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number | "Price available on request";
  duration?: string; // e.g. "2 hours"
  image?: string; 
};

export const SERVICES: Service[] = [
  {
    id: "hair-braids",
    category: "Hair",
    name: "Knotless Braids",
    description: "Elegant, protective knotless braids styled to perfection.",
    price: "Price available on request",
    image: "/images/hair.png",
  },
  {
    id: "hair-cornrows",
    category: "Hair",
    name: "Cornrows",
    description: "Classic and intricate cornrow designs.",
    price: "Price available on request",
    image: "/images/hair.png",
  },
  {
    id: "hair-wig",
    category: "Hair",
    name: "Wig Styling & Installation",
    description: "Flawless wig installations and styling.",
    price: "Price available on request",
    image: "/images/hair.png",
  },
  {
    id: "nails-acrylic",
    category: "Nails",
    name: "Acrylic Nails",
    description: "Beautifully sculpted acrylic nail extensions.",
    price: "Price available on request",
    image: "/images/nails.png",
  },
  {
    id: "nails-gel",
    category: "Nails",
    name: "Gel Polish",
    description: "Long-lasting, glossy gel polish application.",
    price: "Price available on request",
    image: "/images/nails.png",
  },
  {
    id: "nails-art",
    category: "Nails",
    name: "Custom Nail Art",
    description: "Intricate, hand-painted nail designs.",
    price: "Price available on request",
    image: "/images/nails.png",
  },
  {
    id: "makeup-soft-glam",
    category: "Makeup",
    name: "Soft Glam",
    description: "Enhance your natural beauty with a flawless soft glam look.",
    price: "Price available on request",
    image: "/images/makeup.png",
  },
  {
    id: "makeup-event-glam",
    category: "Makeup",
    name: "Event / Bridal Glam",
    description: "Show-stopping makeup for your special occasions.",
    price: "Price available on request",
    image: "/images/makeup.png",
  },
  {
    id: "henna-simple",
    category: "Henna",
    name: "Simple Henna Design",
    description: "Elegant and minimal henna artistry.",
    price: "Price available on request",
    image: "/images/henna.png",
  },
  {
    id: "henna-intricate",
    category: "Henna",
    name: "Intricate / Bridal Henna",
    description: "Detailed, traditional-inspired intricate henna patterns.",
    price: "Price available on request",
    image: "/images/henna.png",
  },
];

export const GALLERY_CATEGORIES = ["All", "Hair", "Nails", "Makeup", "Henna"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryImage = {
  id: string;
  category: Exclude<GalleryCategory, "All">;
  src: string;
  alt: string;
};

// Populated with generated brand imagery
export const GALLERY: GalleryImage[] = [
  { id: "gal-1", category: "Hair", src: "/images/hair.png", alt: "Elegant Hair Styling" },
  { id: "gal-2", category: "Nails", src: "/images/nails.png", alt: "Professional Nail Art" },
  { id: "gal-3", category: "Makeup", src: "/images/makeup.png", alt: "Flawless Soft Glam Makeup" },
  { id: "gal-4", category: "Henna", src: "/images/henna.png", alt: "Intricate Henna Design" },
];

export const FAQS = [
  {
    q: "Where are you located?",
    a: "PY Luxe is based in Abuja and is available at Veritas University.",
  },
  {
    q: "Do you offer home service?",
    a: "Yes, home service is available.",
  },
  {
    q: "How do I book?",
    a: "Choose your service, fill in the booking form and continue to WhatsApp.",
  },
  {
    q: "Is there a deposit?",
    a: "Yes. A ₦1,000 deposit is required to secure your appointment.",
  },
  {
    q: "How do I confirm my deposit?",
    a: "After making your deposit, send your payment screenshot to PY Luxe on WhatsApp for verification.",
  },
];

export const BOOKING_DEPOSIT = "₦1,000";
