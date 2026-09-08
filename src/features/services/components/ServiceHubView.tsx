import Link from "next/link";
import { ArrowRight, ArrowUpRight, HelpCircle } from "lucide-react";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import type { HubPageConfig } from "@/src/features/services/types";
import { ServicePageHeader } from "./ServicePageHeader";

export function ServiceHubView({ config }: { config: HubPageConfig }) {
  const { eyebrow, heading, description, groupSlug, services, icons, ctaHeading, ctaDescription, ctaButtonText } = config;

  return (
    <div className="ds-services-page">
      <ServicePageHeader backHref="/" backLabel="Back to Home" />

      <section className="ds-service-hero ds-service-hub-hero">
        <div>
          <span className="ds-service-kicker">{eyebrow}</span>
          <h1>{heading}</h1>
          <p>{description}</p>
          <div className="ds-service-hub-meta">
            <span>{services.length} specialist disciplines</span>
            <span>Built around your operating model</span>
          </div>
        </div>
      </section>

      <section className="ds-service-section ds-service-hub-section">
        <div className="ds-service-section-heading">
          <div>
            <span className="ds-service-section-kicker">Specialist capabilities</span>
            <h2>Choose the right starting point.</h2>
          </div>
          <p className="ds-service-section-intro">Every engagement is shaped around a clear business outcome, a practical delivery plan, and systems your team can own.</p>
        </div>

        <div className="ds-service-hub-grid">
          {services.map((service, index) => {
            const IconComponent = icons[service.slug] ?? HelpCircle;
            return (
              <Link key={service.slug} href={`/services/${groupSlug}/${service.slug}`} className="ds-service-hub-card">
                <div className="ds-service-hub-card-top">
                  <span className="ds-service-hub-card-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="ds-service-hub-icon"><IconComponent size={21} /></div>
                </div>
                <h2>{service.title}</h2>
                <p>{service.shortDescription || service.description || service.headline}</p>
                <span className="ds-service-hub-card-link">View capability <ArrowRight size={15} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="ds-service-cta">
        <div>
          <h2>{ctaHeading}</h2>
          <p>{ctaDescription}</p>
        </div>
        <PrimaryButton href="/#contact">{ctaButtonText} <ArrowUpRight size={16} /></PrimaryButton>
      </section>

      <AgencyFooter />
    </div>
  );
}
