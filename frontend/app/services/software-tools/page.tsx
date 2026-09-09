import type { Metadata } from "next";
import { SoftwareToolsView } from "@/src/features/services/components/SoftwareToolsView";
import "@/src/features/services/styles/software-tools.css";

export const metadata: Metadata = {
  title: "Software & AI Tools | Digital Solutions",
  description: "Compare clear PKR pricing for selected AI, creative, development, and productivity tools.",
};

export default function SoftwareToolsPage() {
  return <SoftwareToolsView />;
}
