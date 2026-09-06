"use client";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Brain,
  Share2,
  Cloud,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { ServicePageHeader } from "@/src/features/services/components/ServicePageHeader";
import { webDevServices } from "@/src/features/services/data/webDevelopmentData";

export const metadata: Metadata = {
  title: "Development Services — Digital Solutions",
  description: "Secure digital products, integrations, and platforms engineered for scale.",
};

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "web-app-engineering": Globe,
  "ai-product-development": Brain,
  "api-systems-integration": Share2,
  "cloud-devops": Cloud,
  "quality-automation": CheckCircle2,
};

export default function DevelopmentHubPage() {
  const subServices = webDevServices;

  return (
    <div className="vx-page min-h-screen bg-[#F4F9FF] text-[#050B14]">
      <div className="pt-4 px-4 sm:px-8">
        <ServicePageHeader backHref="/" backLabel="Back to Home" />
      </div>

      {/* Hero Header */}
      <section className="pt-12 pb-20 px-6 sm:px-12 max-w-7xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold uppercase tracking-wider mb-6">
          <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
          Production Engineering
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#050B14] tracking-tight leading-[1.06] max-w-4xl mb-6">
          Development Services Built for Scale
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
          Secure digital products, integrations, and platforms engineered for performance and reliability.
        </p>
      </section>

      {/* Sub‑Services Grid */}
      <section className="pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Specialized Sub‑Services</span>
          <h2 className="text-3xl font-extrabold text-[#050B14] mt-2">Explore Development Solutions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subServices.map((service) => {
            const IconComponent = SERVICE_ICONS[service.slug] ?? HelpCircle;
            return (
              <Link
                key={service.slug}
                href={`/services/development/${service.slug}`}
                className="group p-8 rounded-3xl bg-white border border-sky-100 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1 block">
                    {service.title}
                  </span>
                  <h3 className="text-xl font-bold text-[#050B14] mb-3 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider pt-4 border-t border-sky-50 group-hover:gap-3 transition-all">
                  Explore {service.title} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-sky-200">
        <div className="p-10 sm:p-14 rounded-3xl bg-linear-to-r from-[#071325] via-[#0A1B36] to-[#050B14] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-3">Scale Your Digital Products</h3>
            <p className="text-sky-200 text-sm max-w-xl">
              Build secure, performant, and maintainable applications with our expert development teams.
            </p>
          </div>
          <PrimaryButton href="/#contact">
            Start Growth Strategy <ArrowUpRight className="w-4 h-4" />
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}
