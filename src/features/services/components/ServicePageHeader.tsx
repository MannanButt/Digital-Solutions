"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, Home, Menu, X } from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";

type ServicePageHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

export function ServicePageHeader({
  backHref = "/",
  backLabel = "Back to Home",
}: ServicePageHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ds-service-header-wrap">
      <header className="ds-service-header">
        <Link href="/" aria-label="Digital Solutions home">
          <Brand compact />
        </Link>

        <nav aria-label="Service page navigation" className="ds-service-header-nav">
          <Link href={backHref} className="ds-service-header-back">
            <ChevronLeft size={15} /> {backLabel}
          </Link>
          <Link href="/" aria-label="Home"><Home size={14} /> Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/blog">Insights</Link>
        </nav>

        <div>
          <Link href="/#contact" className="ds-service-header-cta">
            Book a call <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="ds-service-menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav aria-label="Mobile service page navigation" className="ds-service-mobile-nav">
          <Link href={backHref} onClick={() => setMenuOpen(false)}>{backLabel}</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Insights</Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>Book a call</Link>
        </nav>
      )}
    </div>
  );
}
