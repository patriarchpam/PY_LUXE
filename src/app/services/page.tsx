import type { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore PY Luxe's full range of luxury beauty services — hair installations, nail art, bridal makeup, lash extensions, henna, and fashion consultation.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
