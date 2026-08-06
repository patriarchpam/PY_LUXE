import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const { data: settings } = await supabase.from("business_settings").select("*").single();

    const name = settings?.business_name || BRAND.name;
    const tag = BRAND.tagline; // Can be added to DB later
    const desc = "A luxury beauty experience."; // Can be added to DB later

    return {
      title: {
        default: `${name} — ${tag}`,
        template: `%s | ${name}`,
      },
      description: desc,
      keywords: [
        `beauty salon`,
        `hair installation`,
        `luxury beauty Nigeria`,
        `nail salon`,
        `makeup artist`,
        `bridal makeup`,
        name,
      ],
      authors: [{ name: name, url: BRAND.url }],
      creator: name,
      openGraph: {
        type: "website",
        locale: "en_NG",
        url: BRAND.url,
        siteName: name,
        title: `${name} — ${tag}`,
        description: desc,
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} — ${tag}`,
        description: desc,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      },
      manifest: "/manifest.json",
      icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
      },
    };
  } catch (e) {
    return { title: BRAND.name, description: BRAND.description };
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("business_settings").select("*").single();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-inter antialiased bg-white dark:bg-zinc-950 text-brand-text dark:text-white min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Skip to content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-purple focus:text-black focus:rounded-xl font-semibold"
          >
            Skip to content
          </a>

          <Navbar />

          <div className="flex-1 flex flex-col pt-24" id="main-content" tabIndex={-1}>
            {children}
          </div>

          {/* Footer Component Wrapper */}
          <Footer initialSettings={settings} />

          {/* Floating WhatsApp Button */}
          <WhatsAppFAB phoneNumber={settings?.whatsapp_number || BRAND.whatsapp} />

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1A1A1A",
                color: "#fff",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                fontFamily: "Inter, sans-serif",
                border: "1px solid rgba(212, 175, 55, 0.3)",
              },
              success: {
                iconTheme: { primary: "#D4AF37", secondary: "#000" },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
