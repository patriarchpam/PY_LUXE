"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  CreditCard,
  Bell,
  Settings,
  Heart,
  FileText,
  User,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const mockBookings = [
  {
    id: "b1",
    service: "Acrylic Nails",
    staff: "Ngozi Eze",
    date: "2026-08-15",
    time: "10:00",
    status: "confirmed",
    amount: 9000,
    deposit_paid: 4500,
  },
  {
    id: "b2",
    service: "Hair Installation",
    staff: "Chiamaka Obi",
    date: "2026-08-20",
    time: "12:00",
    status: "pending",
    amount: 15000,
    deposit_paid: 7500,
  },
];

const mockPastBookings = [
  {
    id: "p1",
    service: "Bridal Makeup",
    staff: "Adaeze Nwosu",
    date: "2026-07-10",
    time: "09:00",
    status: "completed",
    amount: 50000,
    deposit_paid: 50000,
  },
];

const navItems = [
  { id: "upcoming", label: "Upcoming", icon: CalendarDays },
  { id: "history", label: "Booking History", icon: Clock },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "Profile Settings", icon: Settings },
];

const statusColors: Record<string, "success" | "warning" | "purple" | "danger" | "default"> = {
  confirmed: "success",
  pending: "warning",
  completed: "purple",
  cancelled: "danger",
  declined: "danger",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="min-h-screen bg-brand-surface dark:bg-zinc-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between py-8">
          <div>
            <p className="font-inter text-brand-muted text-sm">Welcome back,</p>
            <h1 className="font-playfair text-3xl font-bold text-brand-text dark:text-white">
              Simi Adeyemi ✨
            </h1>
          </div>
          <Link href="/booking" id="dashboard-book-new">
            <Button
              variant="purple"
              icon={<Plus className="h-4 w-4" />}
              iconPosition="left"
            >
              Book Appointment
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: "12", icon: CalendarDays, color: "text-blue-500" },
            { label: "Money Spent", value: formatCurrency(185000), icon: CreditCard, color: "text-brand-purple" },
            { label: "Upcoming", value: "2", icon: Clock, color: "text-green-500" },
            { label: "Saved Items", value: "5", icon: Heart, color: "text-pink-500" },
          ].map((stat) => (
            <Card key={stat.label} padding="md" className="bg-white dark:bg-zinc-900">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-inter text-xs text-brand-muted">{stat.label}</p>
                  <p className="font-playfair text-2xl font-bold text-brand-text dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <aside className="lg:col-span-1">
            <Card padding="sm" className="bg-white dark:bg-zinc-900 overflow-hidden">
              {/* User Avatar */}
              <div className="flex flex-col items-center py-6 px-4 border-b border-brand-border dark:border-zinc-800">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-brand-purple/20 flex items-center justify-center mb-3">
                  <User className="h-8 w-8 text-brand-purple" />
                </div>
                <p className="font-inter font-semibold text-brand-text dark:text-white">
                  Simi Adeyemi
                </p>
                <p className="font-inter text-xs text-brand-muted mt-0.5">
                  simi@example.com
                </p>
              </div>

              <nav className="p-2" aria-label="Dashboard navigation">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    id={`dash-nav-${item.id}`}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-inter transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-brand-purple/10 text-brand-purple"
                        : "text-brand-muted hover:bg-brand-surface dark:hover:bg-zinc-800 hover:text-brand-purple"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-brand-border dark:border-zinc-800 mt-2 pt-2 px-2">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-inter text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    id="dashboard-logout"
                  >
                    Sign Out
                  </button>
                </div>
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === "upcoming" && (
              <div>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                {mockBookings.length === 0 ? (
                  <Card padding="lg" className="text-center bg-white dark:bg-zinc-900">
                    <CalendarDays className="h-12 w-12 text-brand-muted mx-auto mb-4" />
                    <p className="font-inter text-brand-muted mb-4">No upcoming appointments</p>
                    <Link href="/booking">
                      <Button variant="purple" id="empty-book-now">Book Now</Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {mockBookings.map((booking, i) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <BookingCard booking={booking} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {mockPastBookings.map((booking, i) => (
                    <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <BookingCard booking={booking} isPast />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "invoices" && (
              <Card padding="lg" className="bg-white dark:bg-zinc-900 text-center">
                <FileText className="h-12 w-12 text-brand-muted mx-auto mb-4" />
                <p className="font-inter font-semibold text-brand-text dark:text-white mb-2">
                  Your Invoices
                </p>
                <p className="font-inter text-brand-muted text-sm">
                  Invoices and receipts will appear here after completed bookings.
                </p>
              </Card>
            )}

            {activeTab === "wishlist" && (
              <Card padding="lg" className="bg-white dark:bg-zinc-900 text-center">
                <Heart className="h-12 w-12 text-brand-muted mx-auto mb-4" />
                <p className="font-inter font-semibold text-brand-text dark:text-white mb-2">
                  Your Wishlist
                </p>
                <p className="font-inter text-brand-muted text-sm mb-4">
                  Save your favorite services and products here.
                </p>
                <Link href="/services">
                  <Button variant="outline" id="browse-services">Browse Services</Button>
                </Link>
              </Card>
            )}

            {activeTab === "notifications" && (
              <div>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <div className="space-y-3">
                  {[
                    { title: "Appointment Confirmed! ✅", msg: "Your Hair Installation on Aug 20 is confirmed.", time: "2 hours ago", read: false },
                    { title: "Reminder: Appointment Tomorrow 💅", msg: "Don't forget your Acrylic Nails appointment at 10:00 AM.", time: "Yesterday", read: true },
                    { title: "Payment Received 💳", msg: "Your deposit payment of ₦4,500 has been received.", time: "3 days ago", read: true },
                  ].map((notif, i) => (
                    <Card key={i} padding="md" className={`bg-white dark:bg-zinc-900 ${!notif.read ? "border-brand-purple/30" : ""}`}>
                      <div className="flex items-start gap-3">
                        {!notif.read && <div className="w-2 h-2 bg-brand-purple rounded-full mt-1.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="font-inter font-semibold text-sm text-brand-text dark:text-white">
                            {notif.title}
                          </p>
                          <p className="font-inter text-xs text-brand-muted mt-1">{notif.msg}</p>
                          <p className="font-inter text-xs text-brand-muted/70 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <Card padding="lg" className="bg-white dark:bg-zinc-900">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium font-inter text-brand-muted mb-1">Full Name</label>
                    <input defaultValue="Simi Adeyemi" className="w-full h-12 rounded-2xl border border-brand-border dark:border-zinc-700 px-4 text-sm bg-brand-surface dark:bg-zinc-800 text-brand-text dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-inter text-brand-muted mb-1">Email</label>
                    <input defaultValue="simi@example.com" className="w-full h-12 rounded-2xl border border-brand-border dark:border-zinc-700 px-4 text-sm bg-brand-surface dark:bg-zinc-800 text-brand-text dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-inter text-brand-muted mb-1">Phone</label>
                    <input defaultValue="+234 800 000 0000" className="w-full h-12 rounded-2xl border border-brand-border dark:border-zinc-700 px-4 text-sm bg-brand-surface dark:bg-zinc-800 text-brand-text dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="purple" id="save-profile">Save Changes</Button>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking, isPast = false }: { booking: typeof mockBookings[number]; isPast?: boolean }) {
  return (
    <Card padding="md" className="bg-white dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-playfair font-bold text-brand-text dark:text-white">
              {booking.service}
            </h3>
            <Badge variant={statusColors[booking.status] || "default"}>
              {booking.status}
            </Badge>
          </div>
          <p className="font-inter text-sm text-brand-muted">
            with <span className="text-brand-text dark:text-white font-medium">{booking.staff}</span>
          </p>
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-brand-muted font-inter">
              <CalendarDays className="h-3.5 w-3.5 text-brand-purple" />
              {formatDate(booking.date)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-muted font-inter">
              <Clock className="h-3.5 w-3.5 text-brand-purple" />
              {formatTime(booking.time)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-playfair font-bold text-lg text-brand-purple">
            {formatCurrency(booking.amount)}
          </p>
          <p className="font-inter text-xs text-brand-muted">
            Deposit: {formatCurrency(booking.deposit_paid)}
          </p>
          {!isPast && (
            <div className="flex gap-2 mt-3 justify-end">
              <Button variant="outline" size="sm" id={`reschedule-${booking.id}`}>
                Reschedule
              </Button>
              <Button variant="danger" size="sm" id={`cancel-${booking.id}`}>
                Cancel
              </Button>
            </div>
          )}
          {isPast && (
            <Button variant="ghost" size="sm" className="mt-3" id={`rebook-${booking.id}`}>
              Book Again
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
