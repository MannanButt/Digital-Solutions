export type ServiceGroup = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imagePosition: string;
  services: readonly string[];
};

export const serviceMenuGroups: readonly ServiceGroup[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    eyebrow: "Intelligent operations",
    description: "AI agents and dependable workflows designed around how your teams actually work.",
    image: "/assets/images/services/menu-ai-automation.jpg",
    imagePosition: "center center",
    services: [
      "AI Workflow Automation",
      "AI Agents & Copilots",
      "Process Intelligence",
      "Document Intelligence",
      "Governance & Observability",
    ],
  },
  {
    id: "marketing-seo",
    title: "Marketing & SEO",
    eyebrow: "Measurable growth",
    description: "Connected search, content, performance, and lifecycle systems that compound growth.",
    image: "/assets/images/services/menu-marketing-seo.jpg",
    imagePosition: "center center",
    services: [
      "Technical SEO",
      "AI Content Systems",
      "Performance Marketing",
      "CRM & Lifecycle Automation",
      "Analytics & Attribution",
    ],
  },
  {
    id: "development",
    title: "Development",
    eyebrow: "Production engineering",
    description: "Secure digital products, integrations, and platforms engineered for scale.",
    image: "/assets/images/services/menu-development.jpg",
    imagePosition: "center center",
    services: [
      "Web & App Engineering",
      "AI Product Development",
      "API & Systems Integration",
      "Cloud & DevOps",
      "Quality Automation",
    ],
  },
  {
    id: "design",
    title: "Design",
    eyebrow: "Human-centred systems",
    description: "Research-led experiences and design systems that make complex products feel simple.",
    image: "/assets/images/services/menu-design.jpg",
    imagePosition: "center center",
    services: [
      "Product Strategy",
      "UX & UI Design",
      "Design Systems",
      "Rapid Prototyping",
      "Conversion Experience Design",
    ],
  },
] as const;
