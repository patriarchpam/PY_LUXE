"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ShoppingBag, User, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass border-b border-white/20 py-3 shadow-glass"
            : "bg-transparent py-5"
        )}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label={BRAND.name}>
            <div className="flex flex-col leading-none">
              <span className="font-playfair font-black text-2xl text-white tracking-wider group-hover:text-brand-purple transition-colors duration-200">
                PY
              </span>
              <span className="font-inter font-light text-xs text-brand-purple tracking-[0.3em] uppercase -mt-0.5">
                Luxe
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium font-inter rounded-xl transition-all duration-200",
                      "hover:text-brand-purple",
                      isActive
                        ? "text-brand-purple"
                        : isScrolled
                        ? "text-brand-text dark:text-white"
                        : "text-white"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-purple rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "p-2.5 rounded-xl transition-colors duration-200",
                  "hover:bg-white/10",
                  isScrolled
                    ? "text-brand-text dark:text-white"
                    : "text-white"
                )}
                aria-label="Toggle dark mode"
                id="dark-mode-toggle"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Cart */}
            <Link
              href="/shop/cart"
              className={cn(
                "relative p-2.5 rounded-xl transition-colors duration-200",
                "hover:bg-white/10",
                isScrolled ? "text-brand-text dark:text-white" : "text-white"
              )}
              aria-label="Shopping cart"
              id="cart-icon"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[10px] font-bold bg-brand-purple text-black rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Account */}
            <Link
              href="/dashboard"
              className={cn(
                "hidden sm:flex p-2.5 rounded-xl transition-colors duration-200",
                "hover:bg-white/10",
                isScrolled ? "text-brand-text dark:text-white" : "text-white"
              )}
              aria-label="My account"
              id="account-icon"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Book Now CTA */}
            <Link href="/booking" className="hidden sm:block" id="nav-book-now">
              <Button
                variant="purple"
                size="sm"
                className="font-semibold tracking-wide"
              >
                Book Now
              </Button>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className={cn(
                "lg:hidden p-2.5 rounded-xl transition-colors duration-200",
                "hover:bg-white/10",
                isScrolled ? "text-brand-text dark:text-white" : "text-white"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              id="mobile-menu-toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white dark:bg-zinc-950 shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-border dark:border-zinc-800">
                <div>
                  <p className="font-playfair font-black text-xl text-brand-text dark:text-white">
                    PY <span className="text-brand-purple">Luxe</span>
                  </p>
                  <p className="text-xs text-brand-muted font-inter tracking-widest uppercase mt-0.5">
                    Beauty · Style · Confidence
                  </p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-brand-surface dark:hover:bg-zinc-900 text-brand-muted"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-4" aria-label="Mobile navigation">
                <ul className="space-y-1" role="list">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-2xl font-medium font-inter text-sm transition-all duration-200",
                            isActive
                              ? "bg-brand-purple/10 text-brand-purple"
                              : "text-brand-text dark:text-white hover:bg-brand-surface dark:hover:bg-zinc-900 hover:text-brand-purple"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-brand-border dark:border-zinc-800 space-y-3">
                <Link href="/booking" className="block">
                  <Button variant="purple" fullWidth id="mobile-book-now">
                    Book Appointment
                  </Button>
                </Link>
                <div className="flex gap-3">
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="outline" fullWidth id="mobile-login">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register" className="flex-1">
                    <Button variant="secondary" fullWidth id="mobile-register">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
