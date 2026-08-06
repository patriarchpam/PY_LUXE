"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppFAB({ phoneNumber }: { phoneNumber?: string }) {
  const link = whatsappLink(
    phoneNumber || BRAND.whatsapp,
    "Hello PY Luxe! I'd like to enquire about booking an appointment. 💅"
  );

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fab bg-[#25D366] text-white z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      id="whatsapp-fab"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <MessageCircle className="h-6 w-6 relative z-10" />
    </motion.a>
  );
}
