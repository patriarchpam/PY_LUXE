// ─── Brand Constants ─────────────────────────────────────────────────────────

export const BRAND = {
  name: "PY Luxe",
  tagline: "Beauty. Style. Confidence.",
  description:
    "Premium luxury beauty destination.",
  email: "contact@yourdomain.com",
  phone: "+234 000 000 0000",
  address: "Your Business Address",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2340000000000",
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  facebook: "https://facebook.com/",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com",
} as const;

// ─── Color Palette ────────────────────────────────────────────────────────────

export const COLORS = {
  primary: "#000000",
  secondary: "#7c3aed",
  accent: "#F8D7E8",
  background: "#FFFFFF",
  surface: "#FAFAFA",
  text: "#1A1A1A",
} as const;

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    id: "hair",
    slug: "hair",
    category: "Hair",
    name: "Hair Services",
    description: "Please update via Admin Dashboard",
    price: 0,
    duration: 60,
    icon: "✨",
    image: "", // Placeholder empty image
    popular: true,
  },
  {
    id: "nails",
    slug: "nails",
    category: "Nails",
    name: "Nail Services",
    description: "Please update via Admin Dashboard",
    price: 0,
    duration: 60,
    icon: "💅",
    image: "",
    popular: false,
  },
  {
    id: "makeup",
    slug: "makeup",
    category: "Makeup",
    name: "Makeup Services",
    description: "Please update via Admin Dashboard",
    price: 0,
    duration: 60,
    icon: "💄",
    image: "",
    popular: false,
  },
  {
    id: "lashes",
    slug: "lashes",
    category: "Lashes",
    name: "Lash Services",
    description: "Please update via Admin Dashboard",
    price: 0,
    duration: 60,
    icon: "👁️",
    image: "",
    popular: false,
  },
  {
    id: "henna",
    slug: "henna",
    category: "Henna",
    name: "Henna Services",
    description: "Please update via Admin Dashboard",
    price: 0,
    duration: 60,
    icon: "🌸",
    image: "",
    popular: false,
  },
  {
    id: "fashion",
    slug: "fashion",
    category: "Fashion",
    name: "Fashion Consultation",
    description: "Please update via Admin Dashboard",
    price: 0,
    duration: 60,
    icon: "👗",
    image: "",
    popular: false,
  },
] as const;

export type Service = (typeof SERVICES)[number];
export type ServiceCategory =
  | "Hair"
  | "Nails"
  | "Makeup"
  | "Lashes"
  | "Henna"
  | "Fashion";

// ─── Staff ────────────────────────────────────────────────────────────────────

export const STAFF = [
  {
    id: "staff-placeholder",
    name: "Staff Name",
    role: "Staff Role",
    specialties: ["Update via Admin"],
    image: "",
    bio: "Update staff details via the Admin Dashboard.",
    rating: 0,
    reviews: 0,
  }
] as const;

// ─── Constants ─────────────────────────────────────────────────────────────

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara"
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  service: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = []; // Empty array, replace with dynamic reviews in Phase 3

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = [
  { label: "Happy Clients", value: "0", icon: "❤️" },
  { label: "Services Completed", value: "0", icon: "✨" },
  { label: "Years of Excellence", value: "0", icon: "🏆" },
  { label: "5-Star Reviews", value: "0", icon: "⭐" },
] as const;

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "Update via Admin Dashboard.",
  },
  {
    q: "Do I need to pay a deposit?",
    a: "Update via Admin Dashboard.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Update via Admin Dashboard.",
  },
  {
    q: "Do you offer home service?",
    a: "Update via Admin Dashboard.",
  },
] as const;

// ─── Gallery Categories ────────────────────────────────────────────────────────

export const GALLERY_CATEGORIES = [
  "All",
  "Hair",
  "Nails",
  "Makeup",
  "Lashes",
  "Henna",
  "Fashion",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

// ─── Time Slots ───────────────────────────────────────────────────────────────

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

// ─── Payment Options ──────────────────────────────────────────────────────────

export const DEPOSIT_PERCENTAGE = 0.5; // 50%

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
