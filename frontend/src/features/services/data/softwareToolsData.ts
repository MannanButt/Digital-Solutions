export type SoftwareToolPlan = {
  readonly product: string;
  readonly plan: string;
  readonly logoSlug: string;
  readonly officialPrice: string;
  readonly price: string;
  readonly savings: string;
};

export type SoftwareToolCategory = {
  readonly id: string;
  readonly name: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly accent: "green" | "orange" | "blue";
  readonly plans: readonly SoftwareToolPlan[];
};

export const softwareToolCategories: readonly SoftwareToolCategory[] = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    eyebrow: "AI workspace",
    description: "Flexible access options for individual work, private use, and shared team seats.",
    accent: "green",
    plans: [
      { product: "Client Mail Private", plan: "25 Days Warranty", logoSlug: "openai", officialPrice: "Rs 5,600/mo", price: "Rs 4,000", savings: "Save 29%" },
      { product: "Shared", plan: "5 Users", logoSlug: "openai", officialPrice: "Rs 5,600/mo", price: "Rs 900", savings: "Save 84%" },
      { product: "Semi Private", plan: "3 Users", logoSlug: "openai", officialPrice: "Rs 5,600/mo", price: "Rs 2,000", savings: "Save 64%" },
      { product: "Separate Private Codex", plan: "Only 1 User", logoSlug: "openai", officialPrice: "Rs 5,600/mo", price: "Rs 2,500", savings: "Save 55%" },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    eyebrow: "Reasoning and writing",
    description: "Plans for deeper analysis, long-form work, and demanding AI-assisted workflows.",
    accent: "orange",
    plans: [
      { product: "Claude 1.5x Private", plan: "On User Mail Account", logoSlug: "anthropic", officialPrice: "Rs 5,600/mo", price: "Rs 5,500", savings: "Save 2%" },
      { product: "Claude Max 20x Usage", plan: "Shared Per Seat", logoSlug: "anthropic", officialPrice: "Rs 56,000/mo", price: "Rs 12,000", savings: "Save 79%" },
      { product: "Claude Max 20x Usage", plan: "Private", logoSlug: "anthropic", officialPrice: "Rs 56,000/mo", price: "Rs 49,000", savings: "Save 13%" },
    ],
  },
  {
    id: "other-tools",
    name: "Creator & Productivity Tools",
    eyebrow: "The modern tool stack",
    description: "Popular tools for design, video, development, and everyday creative production.",
    accent: "blue",
    plans: [
      { product: "Cursor Pro", plan: "1 Year Private", logoSlug: "cursor", officialPrice: "Rs 67,200/yr", price: "Rs 35,000", savings: "Save 48%" },
      { product: "Canva Pro", plan: "1 Year with AI Credits", logoSlug: "canva", officialPrice: "Rs 33,600/yr", price: "Rs 1,000", savings: "Save 97%" },
      { product: "CapCut Pro", plan: "1 Month with AI Credits", logoSlug: "capcut", officialPrice: "Rs 5,600/mo", price: "Rs 1,000", savings: "Save 82%" },
      { product: "Gemini Pro / Google AI Plan", plan: "1 Year · 2 TB Storage · Up to 18 Months Available", logoSlug: "googlegemini", officialPrice: "Rs 33,600/yr", price: "Rs 2,500", savings: "Save 93%" },
    ],
  },
];
