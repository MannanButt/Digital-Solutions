"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronLeft, Home } from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";

type ServicePageHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

export function ServicePageHeader({
  backHref = "/",
  backLabel = "Back to Home",
}: ServicePageHeaderProps) {
  return (
    <div className="w-full pt-4 pb-2 px-4 sm:px-8 max-w-7xl mx-auto sticky top-0 z-50">
      <header
        className="vx-header shadow-2xl"
        style={{
          position: "relative",
          zIndex: 50,
          marginInline: "auto",
          maxWidth: "1280px",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          backgroundColor: "rgba(7, 19, 37, 0.85)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          borderRadius: "9999px",
          padding: "10px 20px",
        }}
      >
        <Link href="/" aria-label="Digital Solutions home">
          <Brand />
        </Link>

        <div className="vx-header-center">
          <nav aria-label="Inner page navigation" className="flex items-center gap-5">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={14} /> {backLabel}
            </Link>
            <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1">
              <Home size={13} /> Home
            </Link>
            <Link href="/#services" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/#projects" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="/#why" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Why Us
            </Link>
          </nav>
        </div>

        <div className="vx-header-actions">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-linear-to-r from-sky-500 to-sky-600 text-white font-bold text-xs shadow-md hover:shadow-sky-500/30 hover:scale-105 transition-all"
          >
            Book a Demo <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </header>
    </div>
  );
}
