"use client";

import { useEffect, useState } from "react";
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
import type { FAQItem, ServiceDetail } from "@/src/features/services/types";
import { ServiceDeliverables, ServiceTimeline } from "./ServiceContent";
import { ServicePageHeader } from "./ServicePageHeader";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Code2, Search, Globe, Cpu, FileText, CheckCircle2, Share2, Target, Layout,
  TrendingUp, Mail, Users, PieChart, Database, BarChart3, LineChart, Bell, Brain,
};

type ServiceDetailViewProps = { detail: ServiceDetail; heroImage?: string };

export function ServiceDetailView({ detail, heroImage = "/assets/images/home/hero-workflow.jpg" }: ServiceDetailViewProps) {
  const [activeFaq, setActiveFaq] = useState<FAQItem | null>(null);

  useEffect(() => {
    if (!activeFaq) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveFaq(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeFaq]);

  return (
    <div className="ds-services-page">
      <ServicePageHeader backHref="/#services" backLabel="Back to Services" />

      <section className="ds-service-detail-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="ds-service-detail-hero-inner">
          <span className="ds-service-kicker">{detail.eyebrow || "Digital Solutions service"}</span>
          <h1>{detail.title}</h1>
          <p className="ds-service-hero-lede">{detail.heroSubtitle || detail.headline}</p>
          <p className="ds-service-hero-description">{detail.shortDescription || detail.description}</p>
          <div className="ds-service-actions">
            <Link href="/#contact" className="ds-service-primary">Start a conversation <ArrowRight size={16} /></Link>
            <Link href="#deliverables" className="ds-service-secondary">View deliverables</Link>
          </div>
          <div className="ds-service-hero-stats" aria-label="Service outcomes">
            {detail.metrics.map((metric) => (
              <div key={metric.label} className="ds-service-hero-stat">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="deliverables" className="ds-service-section">
        <div className="ds-service-section-heading">
          <div>
            <span className="ds-service-section-kicker">Scope of work</span>
            <h2>Clear outputs. Built to last.</h2>
          </div>
          <p className="ds-service-section-intro">We turn the brief into practical systems, documented decisions, and a delivery handover your team can confidently run.</p>
        </div>
        <ServiceDeliverables items={detail.deliverables} getIcon={(iconName) => ICON_MAP[iconName] ?? Zap} />
      </section>

      <section className="ds-service-section ds-service-section--wide">
        <div className="ds-service-section-heading">
          <div>
            <span className="ds-service-section-kicker">Delivery approach</span>
            <h2>A clear path from brief to production.</h2>
          </div>
          <p className="ds-service-section-intro">A focused process keeps delivery aligned, testable, and ready for the realities of production.</p>
        </div>
        <ServiceTimeline steps={detail.workflowSteps} />
      </section>

      <section className="ds-service-section">
        <div className="ds-service-split">
          <div>
            <span className="ds-service-section-kicker">Tools and foundations</span>
            <h2>Built around your stack.</h2>
            <div className="ds-service-tech-grid">
              {detail.techStack.map((tech, index) => (
                <span key={tech} style={{ animationDelay: `${index * 60}ms` }}>
                  <small>{String(index + 1).padStart(2, "0")}</small>{tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="ds-service-section-kicker">Common questions</span>
            <h2>What to know before we begin.</h2>
            <div className="ds-service-faq" aria-label="Frequently asked questions">
              {detail.faq.map((q) => (
                <button key={q.question} type="button" className="ds-service-faq-trigger" onClick={() => setActiveFaq(q)}>
                  <span><HelpCircle size={15} /> {q.question}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ds-service-cta">
        <div>
          <h2>Ready to make {detail.title.toLowerCase()} work harder?</h2>
          <p>Talk with a Digital Solutions specialist about the right scope, sequence, and next step for your team.</p>
        </div>
        <Link href="/#contact" className="ds-service-primary">Book a strategy call <ArrowUpRight size={16} /></Link>
      </section>

      <AgencyFooter />

      {activeFaq && (
        <div className="ds-service-modal-backdrop" role="presentation" onClick={() => setActiveFaq(null)}>
          <div className="ds-service-modal" role="dialog" aria-modal="true" aria-labelledby="service-faq-title" onClick={(event) => event.stopPropagation()}>
            <div className="ds-service-modal-topline">
              <span className="ds-service-section-kicker">Answer</span>
              <button type="button" className="ds-service-modal-close" onClick={() => setActiveFaq(null)} aria-label="Close answer">×</button>
            </div>
            <h2 id="service-faq-title">{activeFaq.question}</h2>
            <p>{activeFaq.answer}</p>
            <button type="button" className="ds-service-primary ds-service-modal-action" onClick={() => setActiveFaq(null)}>Close answer</button>
          </div>
        </div>
      )}
    </div>
  );
}
