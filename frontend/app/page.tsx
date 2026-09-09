import type { Metadata } from "next";
import HomePage from "@/src/features/home/components/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Digital Solutions | AI Workflow Automation" },
  description:
    "Digital Solutions designs AI workflows, agents, integrations, and intelligent operations systems around the tools your business already uses.",
};

export default function Home() {
  return <HomePage />;
}
