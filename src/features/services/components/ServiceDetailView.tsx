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
  Zap, Code2, Search, Globe, Cpu, FileText, CheckCircle2, Share2, Target, Layout,
  TrendingUp, Mail, Users, PieChart, Database, BarChart3, LineChart, Bell, Brain,
};

type ServiceDetailViewProps = { detail: ServiceDetail };

export function ServiceDetailView({ detail }: ServiceDetailViewProps) {
  return (
    <div className="ds-services-page">
      <ServicePageHeader backHref="/#services" backLabel="Back to Services" />

      <section className="ds-service-hero">
        <div>
          <span className="ds-service-kicker">{detail.eyebrow || "Digital Solutions service"}</span>
          <h1>{detail.title}</h1>
          <p className="ds-service-hero-lede">{detail.heroSubtitle || detail.headline}</p>
          <p className="ds-service-hero-description">{detail.shortDescription || detail.description}</p>
          <div className="ds-service-actions">
            <Link href="/#contact" className="ds-service-primary">Start a conversation <ArrowRight size={16} /></Link>
            <Link href="#deliverables" className="ds-service-secondary">View deliverables</Link>
          </div>
        </div>

        <aside className="ds-service-brief" aria-label="Service outcomes">
          <span className="ds-service-brief-label">Engagement snapshot</span>
          <h2>What success looks like</h2>
          <div className="ds-service-metrics">
            {detail.metrics.map((metric) => (
              <div key={metric.label} className="ds-service-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </aside>
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
            <h2>A measured path from brief to launch.</h2>
          </div>
          <p className="ds-service-section-intro">A focused process keeps the work aligned, testable, and ready for the realities of production.</p>
        </div>
        <ServiceTimeline steps={detail.workflowSteps} />
      </section>

      <section className="ds-service-section">
        <div className="ds-service-split">
          <div>
            <span className="ds-service-section-kicker">Tools and foundations</span>
            <h2>Designed for your stack.</h2>
            <div className="ds-service-tech">
              {detail.techStack.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </div>

          <div>
            <span className="ds-service-section-kicker">Questions, answered</span>
            <h2>Useful context before we start.</h2>
            <div className="ds-service-faq">
              {detail.faq.map((q) => (
                <details key={q.question}>
                  <summary><HelpCircle size={15} /> {q.question}</summary>
                  <p>{q.answer}</p>
                </details>
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
    </div>
  );
}
