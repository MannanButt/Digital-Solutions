import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/src/features/services/components/ServiceDetailView";
import { designServices } from "@/src/features/services/data/designData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return designServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = designServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Design Services`,
    description: `${service.heroSubtitle} ${service.shortDescription}`,
  };
}

export default async function DesignDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = designServices.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const detail = {
    slug: service.slug,
    title: service.title,
    eyebrow: service.title,
    headline: service.heroSubtitle,
    description: service.shortDescription,
    metrics: service.metrics,
    deliverables: service.deliverables,
    workflowSteps: service.workflowSteps,
    techStack: service.techStack,
    faq: service.faq,
  };

  return (
    <ServiceDetailView
      detail={detail}
      backHref="/services/design"
      backLabel="Back to Design"
    />
  );
}
