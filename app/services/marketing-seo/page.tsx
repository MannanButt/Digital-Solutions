import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, Cpu, Mail, Search, Sparkles, Target, HelpCircle } from "lucide-react";
import { ServicePageHeader } from "@/src/features/services/components/ServicePageHeader";
import { marketingSeoSubServices } from "@/src/features/services/data/marketingSeoData";

export const metadata: Metadata = {
  title: "Marketing & SEO Services",
  description: "Connected search, content, performance marketing, and lifecycle automation systems engineered for measurable business growth.",
};

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "technical-seo": Search,
  "ai-content-systems": Cpu,
  "performance-marketing": Target,
  "crm-lifecycle-automation": Mail,
  "analytics-attribution": BarChart3,
};

export default function MarketingSeoHubPage() {
  const subServices = Object.values(marketingSeoSubServices);

  return (
    <div className="vx-page min-h-screen bg-[#F4F9FF] text-[#050B14]">
      <div className="pt-4 px-4 sm:px-8">
        <ServicePageHeader backHref="/" backLabel="Back to Home" />
      </div>

      {/* Hero Header */}
      <section className="pt-12 pb-20 px-6 sm:px-12 max-w-7xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold uppercase tracking-wider mb-6">
          <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
          Measurable Growth Engine
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#050B14] tracking-tight leading-[1.06] max-w-4xl mb-6">
          Marketing &amp; SEO Systems Designed for Scale
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
          Connected technical search, AI content pipelines, algorithmic paid media, and customer lifecycle automation built for high ROI.
        </p>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white border border-sky-100 shadow-sm mb-16">
          <div>
            <div className="text-3xl font-extrabold text-sky-600">+240%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Organic Traffic</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-sky-600">4.2×</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Average ROAS</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-sky-600">10×</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Content Speed</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-sky-600">100%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Attribution Accuracy</div>
          </div>
        </div>
      </section>

      {/* Sub-Services Navigation Cards Grid */}
      <section className="pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Specialized Sub-Services</span>
          <h2 className="text-3xl font-extrabold text-[#050B14] mt-2">Explore Marketing &amp; SEO Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subServices.map((service) => {
            const IconComponent = SERVICE_ICONS[service.slug] ?? HelpCircle;
            return (
              <Link
                key={service.slug}
                href={`/services/marketing-seo/${service.slug}`}
                className="group p-8 rounded-3xl bg-white border border-sky-100 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1 block">
                    {service.eyebrow}
                  </span>
                  <h3 className="text-xl font-bold text-[#050B14] mb-3 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
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

      {/* Booking Consultation Section */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-sky-200">
        <div className="p-10 sm:p-14 rounded-3xl bg-linear-to-r from-[#071325] via-[#0A1B36] to-[#050B14] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-3">Scale Your Marketing &amp; Search Growth</h3>
            <p className="text-sky-200 text-sm max-w-xl">
              Get an expert technical SEO audit, AI content roadmap, or performance marketing plan tailored to your product.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-sky-500 to-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all shrink-0"
          >
            Start Growth Strategy <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
