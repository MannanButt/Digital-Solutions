import type { ElementType } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Deliverable, WorkflowStep } from "@/src/features/services/types";

type ServiceDeliverablesProps = {
  items: readonly Deliverable[];
  getIcon: (iconName: string) => ElementType;
};

export function ServiceDeliverables({ items, getIcon }: ServiceDeliverablesProps) {
  return (
    <div className="ds-service-deliverables">
      {items.map((item, index) => {
        const Icon = getIcon(item.iconName);
        return (
          <article key={item.title} className="ds-service-deliverable" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="ds-service-deliverable-topline">
              <span className="ds-service-deliverable-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="ds-service-deliverable-icon"><Icon size={19} /></div>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className="ds-service-deliverable-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
          </article>
        );
      })}
    </div>
  );
}

export function ServiceTimeline({ steps }: { steps: readonly WorkflowStep[] }) {
  return (
    <div className="ds-service-process">
      {steps.map((step) => (
        <article key={step.step} className="ds-service-step">
          <span className="ds-service-step-number">{step.step}</span>
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
        </article>
      ))}
    </div>
  );
}
