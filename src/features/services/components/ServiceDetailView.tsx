"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  FileText,
  Globe,
  HelpCircle,
  Layout,
  LineChart,
  Mail,
  PieChart,
  Search,
  Share2,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { ServiceDetail } from "@/src/features/services/types";
import { ServiceDeliverables, ServiceTimeline } from "./ServiceContent";
import { ServicePageHeader } from "./ServicePageHeader";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Code2,
  Search,
  Globe,
  Cpu,
  FileText,
  CheckCircle2,
  Share2,
  Target,
  Layout,
  TrendingUp,
  Mail,
  Users,
  PieChart,
  Database,
  BarChart3,
  LineChart,
  Bell,
  Brain,
};

type ServiceDetailViewProps = { detail: ServiceDetail };

export function ServiceDetailView({ detail }: ServiceDetailViewProps) {
  return (
    <div className="vx-page min-h-screen bg-[#F4F9FF] text-[#050B14]">
      {/* Top Header Navigation Bar */}
      <ServicePageHeader backHref="/#services" backLabel="Back to Services" />

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 border border-sky-300/60 text-sky-800 text-xs font-bold uppercase tracking-wider mb-6">
            {detail.eyebrow || detail.title}
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#050B14] tracking-tight leading-[1.08] mb-6">
            {detail.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
            {detail.headline || detail.heroSubtitle} {detail.description || detail.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-sky-500 to-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
            >
              Start This Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#deliverables"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-sky-200 text-sky-900 font-semibold text-sm hover:bg-sky-50 transition-all shadow-sm"
            >
              View Deliverables
            </Link>
          </div>
        </div>

      </section>

      {/* Deliverables Grid */}
      <section id="deliverables" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">What We Build & Deliver</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050B14] mt-2">Core Capabilities & Output</h2>
        </div>

        <ServiceDeliverables items={detail.deliverables} getIcon={(iconName) => ICON_MAP[iconName] ?? Zap} />
      </section>

      {/* Process Workflow Steps */}
      <section className="py-20 px-6 sm:px-12 bg-white border-y border-sky-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Implementation Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050B14] mt-2">How We Execute</h2>
          </div>

          <ServiceTimeline steps={detail.workflowSteps} />
        </div>
      </section>

      {/* Tech Stack & FAQ */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Tech Stack */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Tooling & Infrastructure</span>
          <h3 className="text-2xl font-extrabold text-[#050B14] mt-2 mb-6">Technologies We Deploy</h3>
          <div className="flex flex-wrap gap-2.5">
            {detail.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-white border border-sky-200 text-slate-800 text-xs font-semibold shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Frequently Asked</span>
          <h3 className="text-2xl font-extrabold text-[#050B14] mt-2 mb-6">Got Questions?</h3>
          <div className="space-y-4">
            {detail.faq.map((q) => (
              <div key={q.question} className="p-5 rounded-2xl bg-white border border-sky-100">
                <div className="flex items-center gap-2 font-bold text-sm text-[#050B14] mb-2">
                  <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                  {q.question}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-linear-to-r from-[#071325] via-[#0A1B36] to-[#050B14] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">Ready to transform your {detail.title}?</h3>
            <p className="text-sky-200 text-sm max-w-xl">
              Talk directly with Digital Solutions specialists to design a high-ROI automation strategy.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-400 text-slate-950 font-extrabold text-sm hover:bg-sky-300 transition-all shrink-0 shadow-lg"
          >
            Contact Us <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <AgencyFooter />
    </div>
  );
}
