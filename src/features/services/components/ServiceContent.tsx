"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ElementType } from "react";
import type { Deliverable, WorkflowStep } from "@/src/features/services/types";

type ServiceDeliverablesProps = {
  items: readonly Deliverable[];
  getIcon: (iconName: string) => ElementType;
};

export function ServiceDeliverables({ items, getIcon }: ServiceDeliverablesProps) {
  const [activePage, setActivePage] = useState(0);
  const pageSize = 2;
  const pageCount = Math.ceil(items.length / pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => items.slice(index * pageSize, (index + 1) * pageSize));

  return (
    <>
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activePage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              {page.map((item) => {
                const Icon = getIcon(item.iconName);
                return (
                  <article
                    key={item.title}
                    className="min-h-60 rounded-2xl bg-white border border-sky-100 p-7 shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
                  >
                    <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#050B14] mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            type="button"
            onClick={() => setActivePage((current) => (current - 1 + pageCount) % pageCount)}
            className="w-11 h-11 rounded-full bg-white border border-sky-200 text-sky-700 grid place-items-center shadow-sm transition-colors hover:bg-sky-600 hover:border-sky-600 hover:text-white"
            aria-label="Previous capabilities"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold tracking-widest text-sky-700">
            {String(activePage + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setActivePage((current) => (current + 1) % pageCount)}
            className="w-11 h-11 rounded-full bg-white border border-sky-200 text-sky-700 grid place-items-center shadow-sm transition-colors hover:bg-sky-600 hover:border-sky-600 hover:text-white"
            aria-label="Next capabilities"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}

export function ServiceTimeline({ steps }: { steps: readonly WorkflowStep[] }) {
  return (
    <div className="relative">
      <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-sky-300 via-sky-500 to-sky-300" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-5">
        {steps.map((step) => (
          <article key={step.step} className="relative text-center md:text-left">
            <div className="w-14 h-14 mx-auto md:mx-0 rounded-full bg-white border-2 border-sky-400 text-sky-700 font-extrabold text-sm grid place-items-center shadow-sm mb-5">
              {step.step}
            </div>
            <h3 className="text-base font-bold text-[#050B14] mb-2">{step.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-52 mx-auto md:mx-0">{step.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
