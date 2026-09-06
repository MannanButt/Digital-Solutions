"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";
import { capabilityCards, heroImages } from "@/src/features/home/data/content";
import { serviceMenuGroups } from "@/src/features/services/data/services";

type SiteSearchItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: "#services" | "#work" | "#method" | "#contact";
  groupIndex?: number;
  featured?: boolean;
};

const serviceSearchItems: SiteSearchItem[] = serviceMenuGroups.flatMap((group, groupIndex) => [
  {
    id: `group-${group.id}`,
    title: group.title,
    category: "Service area",
    description: group.description,
    href: "#services",
    groupIndex,
    featured: groupIndex === 0,
  },
  ...group.services.map((service, serviceIndex) => ({
    id: `${group.id}-${serviceIndex}`,
    title: service,
    category: group.title,
    description: group.description,
    href: "#services" as const,
    groupIndex,
    featured: (groupIndex === 0 && serviceIndex < 2) || (groupIndex > 0 && serviceIndex === 0),
  })),
]);

const siteSearchItems: SiteSearchItem[] = [
  ...serviceSearchItems,
  ...capabilityCards.map((card, index) => ({
    id: `capability-${index}`,
    title: card.title,
    category: "Capability",
    description: card.copy,
    href: "#work" as const,
  })),
  {
    id: "workflow-discovery",
    title: "Workflow Discovery & Strategy",
    category: "Approach",
    description: "Find the highest-value workflows and shape a practical automation roadmap.",
    href: "#method",
  },
  {
    id: "production-approach",
    title: "Production AI Delivery",
    category: "Approach",
    description: "Secure integrations, human approvals, governance, and operational control.",
    href: "#method",
  },
  {
    id: "start-project",
    title: "Start an AI Automation Project",
    category: "Contact",
    description: "Talk with Digital Solutions about your workflow automation opportunity.",
    href: "#contact",
  },
].filter((item, index, items) => (
  items.findIndex((candidate) => candidate.title.toLocaleLowerCase() === item.title.toLocaleLowerCase()) === index
));

export default function HomePage() {
  const [activeHero, setActiveHero] = useState(0);
  const [paused, setPaused] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeServiceGroup, setActiveServiceGroup] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const touchStart = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchResultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const firstServiceLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuReturnFocusRef = useRef<HTMLButtonElement | null>(null);
  const servicesCloseTimer = useRef<number | null>(null);

  const cancelServicesClose = () => {
    if (servicesCloseTimer.current !== null) {
      window.clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
  };

  const scheduleServicesClose = () => {
    cancelServicesClose();
    servicesCloseTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

  const openServices = (trigger: HTMLButtonElement | null) => {
    cancelServicesClose();
    setSearchOpen(false);
    setSearchQuery("");
    menuReturnFocusRef.current = trigger;
    setServicesOpen(true);
  };

  const changeHero = (direction: number) => {
    setActiveHero((current) => (current + direction + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    if (paused || servicesOpen || searchOpen) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroImages.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [paused, searchOpen, servicesOpen]);

  useEffect(() => {
    if (!servicesOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      window.requestAnimationFrame(() => menuReturnFocusRef.current?.focus());
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [servicesOpen]);

  useEffect(() => () => {
    if (servicesCloseTimer.current !== null) window.clearTimeout(servicesCloseTimer.current);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;

    window.requestAnimationFrame(() => searchInputRef.current?.focus());

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setSearchQuery("");
      window.requestAnimationFrame(() => searchButtonRef.current?.focus());
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  const activeMenuGroup = serviceMenuGroups[activeServiceGroup];
  const normalizedSearch = searchQuery.trim().toLocaleLowerCase();
  const searchResults = siteSearchItems.filter((item) => {
    if (!normalizedSearch) return item.featured;
    const searchable = `${item.title} ${item.category} ${item.description}`.toLocaleLowerCase();
    return normalizedSearch.split(/\s+/).every((term) => searchable.includes(term));
  }).slice(0, 6);

  const closeSearch = (restoreFocus = false) => {
    setSearchOpen(false);
    setSearchQuery("");
    if (restoreFocus) window.requestAnimationFrame(() => searchButtonRef.current?.focus());
  };

  const selectSearchResult = (item: SiteSearchItem) => {
    if (item.groupIndex !== undefined) setActiveServiceGroup(item.groupIndex);
    closeSearch();
  };

  return (
    <div className="vx-page">
      <main className="vx-frame" id="top">
        <section
          className="vx-hero"
          aria-label="Digital Solutions AI automation services"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
          onTouchStart={(event) => {
            touchStart.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const currentX = event.changedTouches[0]?.clientX ?? touchStart.current;
            const distance = currentX - touchStart.current;
            if (Math.abs(distance) > 50) changeHero(distance < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <div className="vx-hero-media">
            {heroImages.map((image, index) => (
              <div
                className={`vx-hero-slide${index === activeHero ? " is-active" : ""}`}
                aria-hidden={index !== activeHero}
                key={image.src}
              >
                <img
                  src={image.src}
                  alt={index === activeHero ? image.alt : ""}
                  style={{ objectPosition: image.position }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          <div className="vx-hero-shade" aria-hidden="true" />

          <header
            className={`vx-header${servicesOpen ? " has-mega-open" : ""}${searchOpen ? " is-searching" : ""}`}
            ref={headerRef}
            onPointerEnter={cancelServicesClose}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") scheduleServicesClose();
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
            }}
          >
            <a href="#top" aria-label="Digital Solutions home">
              <Brand />
            </a>
            <div className="vx-header-center">
              <nav aria-label="Primary navigation">
                <button
                  className="vx-services-trigger"
                  ref={servicesTriggerRef}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls="vertex-services-mega"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") openServices(servicesTriggerRef.current);
                  }}
                  onFocus={() => openServices(servicesTriggerRef.current)}
                  onClick={() => openServices(servicesTriggerRef.current)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    openServices(servicesTriggerRef.current);
                    window.requestAnimationFrame(() => firstServiceLinkRef.current?.focus());
                  }}
                >
                  Services <ChevronDown size={13} aria-hidden="true" />
                </button>
                <a
                  href="#work"
                  onPointerEnter={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(false)}
                  onClick={() => { setServicesOpen(false); closeSearch(); }}
                >
                  Capabilities
                </a>
                <a
                  href="#method"
                  onPointerEnter={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(false)}
                  onClick={() => { setServicesOpen(false); closeSearch(); }}
                >
                  Approach
                </a>
              </nav>

              <form
                className={`vx-header-search${searchOpen ? " is-open" : ""}`}
                role="search"
                aria-hidden={!searchOpen}
                onSubmit={(event) => {
                  event.preventDefault();
                  const firstResult = searchResults[0];
                  if (!firstResult) return;
                  selectSearchResult(firstResult);
                  window.requestAnimationFrame(() => {
                    document.querySelector(firstResult.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
              >
                <Search className="vx-header-search-icon" size={17} aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  disabled={!searchOpen}
                  tabIndex={searchOpen ? 0 : -1}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" || searchResults.length === 0) return;
                    event.preventDefault();
                    searchResultRefs.current[0]?.focus();
                  }}
                  aria-label="Search Digital Solutions services and capabilities"
                  aria-controls="vertex-search-results"
                  aria-describedby="vertex-search-status"
                  placeholder="Search services..."
                  autoComplete="off"
                />

                {searchOpen && <div className="vx-search-results" id="vertex-search-results">
                  <div className="vx-search-status" id="vertex-search-status" aria-live="polite">
                    {normalizedSearch
                      ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for “${searchQuery.trim()}”`
                      : "Popular searches"}
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="vx-search-results-list">
                      {searchResults.map((item, index) => (
                        <a
                          className="vx-search-result"
                          href={item.href}
                          ref={(node) => { searchResultRefs.current[index] = node; }}
                          onClick={() => selectSearchResult(item)}
                          onKeyDown={(event) => {
                            if (event.key === "ArrowDown") {
                              event.preventDefault();
                              searchResultRefs.current[(index + 1) % searchResults.length]?.focus();
                            }
                            if (event.key === "ArrowUp") {
                              event.preventDefault();
                              if (index === 0) searchInputRef.current?.focus();
                              else searchResultRefs.current[index - 1]?.focus();
                            }
                          }}
                          key={item.id}
                        >
                          <span>
                            <small>{item.category}</small>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                          </span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="vx-search-empty">
                      No matches yet. Try “automation”, “SEO”, “development”, or “design”.
                    </div>
                  )}
                </div>}
              </form>
            </div>
            <div className="vx-header-actions">
              <button
                className="vx-search-toggle"
                ref={searchButtonRef}
                type="button"
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                aria-controls="vertex-search-results"
                onClick={() => {
                  cancelServicesClose();
                  setServicesOpen(false);
                  setSearchQuery("");
                  setSearchOpen((open) => !open);
                }}
              >
                {searchOpen ? <X size={17} aria-hidden="true" /> : <Search size={17} aria-hidden="true" />}
              </button>
              <a href="#contact" onClick={() => { setServicesOpen(false); closeSearch(); }}>Book a Demo <ArrowUpRight size={14} aria-hidden="true" /></a>
              <button
                className="vx-menu-toggle"
                ref={menuButtonRef}
                type="button"
                aria-label={servicesOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={servicesOpen}
                aria-controls="vertex-services-mega"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                  menuReturnFocusRef.current = menuButtonRef.current;
                  setServicesOpen((open) => !open);
                }}
              >
                <Menu size={19} aria-hidden="true" />
              </button>
            </div>

            {servicesOpen && (
              <section
                className="vx-mega-menu is-open"
                id="vertex-services-mega"
                aria-label="Services navigation"
                style={{
                  backdropFilter: "blur(48px) saturate(92%) brightness(58%)",
                  WebkitBackdropFilter: "blur(48px) saturate(92%) brightness(58%)",
                }}
                onPointerEnter={cancelServicesClose}
              >
                <a
                  className="vx-mega-preview"
                  href="#services"
                  onClick={() => setServicesOpen(false)}
                  aria-label={`Explore ${activeMenuGroup.title}`}
                >
                  <div className="vx-mega-preview-images" aria-hidden="true">
                    {serviceMenuGroups.map((group, index) => (
                      <img
                        className={index === activeServiceGroup ? "is-active" : ""}
                        src={group.image}
                        alt=""
                        style={{ objectPosition: group.imagePosition }}
                        key={group.id}
                      />
                    ))}
                  </div>
                  <div className="vx-mega-preview-shade" aria-hidden="true" />
                  <div className="vx-mega-preview-copy">
                    <span>{activeMenuGroup.eyebrow}</span>
                    <h2>{activeMenuGroup.title}</h2>
                    <p>{activeMenuGroup.description}</p>
                    <strong>Explore service <ArrowRight size={14} aria-hidden="true" /></strong>
                  </div>
                </a>

                <div className="vx-mega-directory">
                  <div className="vx-mega-topline">
                    <div><span>What we do</span><strong>Services</strong></div>
                    <a href="#services" onClick={() => setServicesOpen(false)}>View all services <ArrowRight size={14} aria-hidden="true" /></a>
                  </div>

                  <div className="vx-mega-groups">
                    {serviceMenuGroups.map((group, groupIndex) => (
                      <section
                        className={`vx-mega-group${groupIndex === activeServiceGroup ? " is-active" : ""}`}
                        key={group.id}
                        onPointerEnter={() => setActiveServiceGroup(groupIndex)}
                        onFocusCapture={() => setActiveServiceGroup(groupIndex)}
                      >
                        <a className="vx-mega-group-title" href="#services" onClick={() => setServicesOpen(false)}>
                          {group.title} <ArrowRight size={15} aria-hidden="true" />
                        </a>
                        <ul>
                          {group.services.map((service, serviceIndex) => (
                            <li key={service}>
                              <a
                                ref={groupIndex === 0 && serviceIndex === 0 ? firstServiceLinkRef : undefined}
                                href="#services"
                                onPointerEnter={() => setActiveServiceGroup(groupIndex)}
                                onFocus={() => setActiveServiceGroup(groupIndex)}
                                onClick={() => setServicesOpen(false)}
                              >
                                {service} <ArrowRight size={12} aria-hidden="true" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </header>

          <div className="vx-running-badge">
            <div className="vx-running-faces" aria-hidden="true">
              <img src="/assets/images/home/hero-workflow.jpg" alt="" />
              <img src="/assets/images/home/hero-agents.jpg" alt="" />
              <img src="/assets/images/home/hero-customer.jpg" alt="" />
            </div>
            <div><strong>24/7</strong><small>Automations running</small></div>
          </div>

          <div className={`vx-frost-panel vx-frost-panel--${activeHero}`} aria-hidden="true">
            <div className="vx-frost-tint" />
          </div>

          <div className="vx-frost-content">
            <div className="vx-frost-copy">
              <span>01 / Core service</span>
              <h1><i>AI Automation</i><i>&amp; Workflow Agents</i></h1>
              <p>We design intelligent agents and connected workflows that move real operational work—with people in control.</p>
              <div className="vx-frost-actions">
                <a href="#services">Start with AI automation <ArrowRight size={15} aria-hidden="true" /></a>
                <a href="#work">Explore capabilities</a>
              </div>
            </div>

            <div className="vx-hero-metrics" aria-label="Automation outcomes">
              <div><strong>40%</strong><span>Less manual work</span></div>
              <div><strong>3×</strong><span>Faster process cycles</span></div>
              <div><strong>100%</strong><span>Observable workflows</span></div>
            </div>
          </div>

          <div className="vx-hero-controls" aria-label="Hero image controls">
            <button type="button" onClick={() => changeHero(-1)} aria-label="Previous hero image">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="vx-hero-dots">
              {heroImages.map((image, index) => (
                <button
                  type="button"
                  className={index === activeHero ? "is-active" : ""}
                  onClick={() => setActiveHero(index)}
                  aria-label={`Show hero image ${index + 1}`}
                  aria-current={index === activeHero ? "true" : undefined}
                  key={image.src}
                />
              ))}
            </div>
            <button type="button" onClick={() => changeHero(1)} aria-label="Next hero image">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="vx-deck" id="services">
          <div className="vx-service-intro">
            <div className="vx-service-index" aria-label="Service categories">
              <span>Strategy</span>
              <span>Workflow discovery</span>
              <span>AI agents</span>
              <span>Integrations</span>
              <span>Governance</span>
              <span>Managed optimization</span>
            </div>

            <div className="vx-service-summary">
              <span>01 / Core service</span>
              <h2>AI Automation &amp; Workflow Agents</h2>
              <p>From one painful process to an automation program, we build the operating system around the work.</p>
              <a href="#contact">Start a project <ArrowRight size={15} aria-hidden="true" /></a>
            </div>

            <article className="vx-feature-card" id="method">
              <img src="/assets/images/home/hero-integrations.jpg" alt="Modern connected enterprise architecture" />
              <div className="vx-feature-shade" aria-hidden="true" />
              <div className="vx-feature-copy">
                <span>Designed for production</span>
                <h2>Let&apos;s build work that runs itself.</h2>
                <p>Secure AI agents, dependable integrations, human approvals, and clear operational control.</p>
                <a href="#contact">Map your workflow <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </article>
          </div>

          <section className="vx-capabilities" id="work" aria-labelledby="capabilities-title">
            <div className="vx-capabilities-heading">
              <h2 id="capabilities-title">Capabilities, together.</h2>
              <span aria-hidden="true" />
              <a href="#contact">View all services <ArrowRight size={15} aria-hidden="true" /></a>
            </div>

            <div className="vx-card-rail">
              {capabilityCards.map((card) => (
                <article className="vx-capability-card" key={card.title}>
                  <div className="vx-card-image">
                    <img src={card.image} alt={card.alt} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <a href="#contact" aria-label={`Explore ${card.title}`}><ArrowUpRight size={15} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
          </section>
        </section>

        <footer className="vx-footer" id="contact">
          <div className="vx-footer-grid">
            <div className="vx-footer-brand">
              <a href="#top"><Brand /></a>
              <p>AI workflow automation for modern operations.</p>
            </div>

            <div className="vx-footer-column">
              <strong>Strategy</strong>
              <a href="#services">Workflow discovery</a>
              <a href="#services">Automation roadmap</a>
              <a href="#services">AI readiness</a>
            </div>
            <div className="vx-footer-column">
              <strong>Automation</strong>
              <a href="#work">AI agents</a>
              <a href="#work">Document intelligence</a>
              <a href="#work">Systems integration</a>
            </div>
            <div className="vx-footer-column">
              <strong>Operations</strong>
              <a href="#work">Human approvals</a>
              <a href="#work">Governance</a>
              <a href="#work">Managed optimization</a>
            </div>
          </div>

          <div className="vx-footer-socials" aria-label="Digital Solutions links">
            <a href="#contact" aria-label="LinkedIn"><Linkedin size={15} aria-hidden="true" /></a>
            <a href="mailto:hello@digitalsolutions.ai" aria-label="Email Digital Solutions"><Mail size={15} aria-hidden="true" /></a>
            <a href="#top" aria-label="Digital Solutions website"><Globe2 size={15} aria-hidden="true" /></a>
          </div>

          <div className="vx-footer-bottom">
            <span>© {new Date().getFullYear()} Digital Solutions</span>
            <span>Better workflows. Clearer decisions. Work that keeps moving.</span>
            <a href="#top">Back to top <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </footer>
      </main>
    </div>
  );
}
