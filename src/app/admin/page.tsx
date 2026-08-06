"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Users,
  Image as ImageIcon,
  FileText,
  Tag,
  TrendingUp,
  Bell,
  Settings,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Eye,
  Megaphone,
  Package,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { SettingsTab } from "./components/SettingsTab";
import { AboutTab } from "./components/AboutTab";

// ─── Mock analytics data ────────────────────────────────────────────────────

const revenueData = [
  { month: "Mar", revenue: 420000, bookings: 34 },
  { month: "Apr", revenue: 380000, bookings: 29 },
  { month: "May", revenue: 520000, bookings: 41 },
  { month: "Jun", revenue: 480000, bookings: 38 },
  { month: "Jul", revenue: 650000, bookings: 52 },
  { month: "Aug", revenue: 580000, bookings: 45 },
];

const serviceData = SERVICES.slice(0, 6).map((s, i) => ({
  name: s.name.split(" ")[0],
  bookings: Math.floor(Math.random() * 50) + 10,
}));

const pendingBookings = [
  { id: "b001", customer: "Amaka Johnson", service: "Bridal Makeup", date: "Aug 12", time: "10:00 AM", amount: 50000 },
  { id: "b002", customer: "Temi Falode", service: "Acrylic Nails", date: "Aug 13", time: "2:00 PM", amount: 9000 },
  { id: "b003", customer: "Adunola Bello", service: "Hair Installation", date: "Aug 14", time: "11:00 AM", amount: 15000 },
  { id: "b004", customer: "Kemi Adeyemi", service: "Party Makeup", date: "Aug 15", time: "9:00 AM", amount: 20000 },
];

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "services", label: "Services", icon: Scissors },
  { id: "customers", label: "Customers", icon: Users },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "about", label: "About Page", icon: FileText },
  { id: "shop", label: "Shop", icon: Package },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "reports", label: "Reports", icon: TrendingUp },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "settings", label: "Settings", icon: Settings },
];

const statCards = [
  {
    label: "Total Revenue",
    value: formatCurrency(3030000),
    change: "+18.5%",
    positive: true,
    icon: TrendingUp,
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    label: "Total Bookings",
    value: "239",
    change: "+12.3%",
    positive: true,
    icon: CalendarDays,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "New Customers",
    value: "48",
    change: "+7.2%",
    positive: true,
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Pending Approvals",
    value: "4",
    change: "-2",
    positive: false,
    icon: CalendarDays,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState(pendingBookings);

  const handleApprove = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleDecline = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-40 hidden lg:flex">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <p className="font-playfair font-black text-xl text-white">
            PY <span className="text-brand-purple">Luxe</span>
          </p>
          <p className="font-inter text-xs text-zinc-500 tracking-widest uppercase mt-0.5">
            Admin Portal
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3" aria-label="Admin navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              id={`admin-nav-${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-inter mb-1 transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin User */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center text-black font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-inter text-sm font-medium text-white truncate">Admin</p>
              <p className="font-inter text-xs text-zinc-500 truncate">admin@pyluxe.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-white capitalize">
              {navItems.find((n) => n.id === activeTab)?.label || "Dashboard"}
            </h1>
            <p className="font-inter text-sm text-zinc-500 mt-0.5">
              {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative p-2.5 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
              aria-label="Notifications"
              id="admin-notifications"
            >
              <Bell className="h-5 w-5 text-zinc-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-purple rounded-full" />
            </button>
            <Button variant="purple" size="sm" id="admin-new-booking">
              + New Booking
            </Button>
          </div>
        </div>

        {/* ─── OVERVIEW TAB ──────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {statCards.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium font-inter ${stat.positive ? "text-green-500" : "text-orange-500"}`}>
                        {stat.positive ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        {stat.change}
                      </div>
                    </div>
                    <p className="font-playfair text-2xl font-bold text-white">{stat.value}</p>
                    <p className="font-inter text-xs text-zinc-500 mt-1">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="font-playfair font-bold text-white mb-6">Revenue Overview</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#71717a" tick={{ fontSize: 12 }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "12px", color: "#fff", fontFamily: "Inter" }}
                      formatter={(v: any) => [formatCurrency(Number(v)), "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#revenueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Service Breakdown */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="font-playfair font-bold text-white mb-6">Top Services</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={serviceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                    <XAxis type="number" stroke="#71717a" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 11 }} width={55} />
                    <Tooltip
                      contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "12px", color: "#fff" }}
                    />
                    <Bar dataKey="bookings" fill="#D4AF37" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pending Bookings Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="font-playfair font-bold text-white">
                  Pending Approvals
                </h2>
                <Badge variant="warning">{bookings.length} pending</Badge>
              </div>
              {bookings.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 font-inter">
                  ✓ All bookings are processed
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full" role="table">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="px-6 py-3 text-left text-xs font-medium font-inter text-zinc-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-inter text-zinc-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-inter text-zinc-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium font-inter text-zinc-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-right text-xs font-medium font-inter text-zinc-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, i) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                        >
                          <td className="px-6 py-4 font-inter text-sm text-white">{booking.customer}</td>
                          <td className="px-6 py-4 font-inter text-sm text-zinc-400">{booking.service}</td>
                          <td className="px-6 py-4 font-inter text-sm text-zinc-400">{booking.date} · {booking.time}</td>
                          <td className="px-6 py-4 font-inter text-sm text-brand-purple font-semibold">
                            {formatCurrency(booking.amount)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApprove(booking.id)}
                                id={`approve-${booking.id}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg text-xs font-medium font-inter hover:bg-green-500/20 transition-colors"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleDecline(booking.id)}
                                id={`decline-${booking.id}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-medium font-inter hover:bg-red-500/20 transition-colors"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                Decline
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── BOOKINGS TAB ─────────────────────────────── */}
        {activeTab === "bookings" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair font-bold text-xl text-white">All Bookings</h2>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-white" id="export-bookings">
                  Export CSV
                </Button>
                <Button variant="purple" size="sm" id="add-booking">+ Add Booking</Button>
              </div>
            </div>
            <p className="font-inter text-zinc-500 text-sm">
              Connect Supabase to see live booking data. All bookings, payments, and statuses will appear here.
            </p>
          </div>
        )}

        {/* ─── SETTINGS TAB ────────────────────────────────── */}
        {activeTab === "settings" && <SettingsTab />}

        {/* ─── ABOUT TAB ───────────────────────────────────── */}
        {activeTab === "about" && <AboutTab />}

        {/* ─── OTHER TABS ────────────────────────────────── */}
        {["services", "customers", "gallery", "blog", "shop", "coupons", "reports", "announcements"].includes(activeTab) && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {(() => {
                const item = navItems.find((n) => n.id === activeTab);
                return item ? <item.icon className="h-8 w-8 text-brand-purple" /> : null;
              })()}
            </div>
            <h2 className="font-playfair text-2xl font-bold text-white mb-2 capitalize">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h2>
            <p className="font-inter text-zinc-500 mb-6 max-w-md mx-auto">
              Connect your Supabase database to manage{" "}
              {navItems.find((n) => n.id === activeTab)?.label.toLowerCase()}. Full CRUD
              functionality will be available once connected.
            </p>
            <Button variant="purple" size="md" id={`admin-${activeTab}-connect`}>
              Configure {navItems.find((n) => n.id === activeTab)?.label}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
