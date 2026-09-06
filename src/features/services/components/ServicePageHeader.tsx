"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
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
    <header className="vx-header" style={{ position: "sticky", top: "16px", zIndex: 50, marginInline: "auto", maxWidth: "1280px" }}>
      <Link href="/" aria-label="Digital Solutions home">
        <Brand />
      </Link>

      <div className="vx-header-center">
        <nav aria-label="Inner page navigation">
          <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-200 hover:text-white transition-colors">
            <ChevronLeft size={14} /> {backLabel}
          </Link>
          <Link href="/#services">All Services</Link>
          <Link href="/#work">Capabilities</Link>
        </nav>
      </div>

      <div className="vx-header-actions">
        <Link href="/#contact" className="vx-header-cta">
          Book Consultation <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
