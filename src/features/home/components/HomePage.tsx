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
  Quote,
  Search,
  Star,
  X,
} from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";
import { BrandBar } from "@/src/components/brand/BrandBar";
import { clientReviews, heroImages, whyChooseReasons } from "@/src/features/home/data/content";
import { getServiceItemHref, serviceMenuGroups } from "@/src/features/services/data/services";

type SiteSearchItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: "#services" | "#why" | "#method" | "#contact";
  groupIndex?: number;
  featured?: boolean;
};

const serviceSearchItems: SiteSearchItem[] = serviceMenuGroups.flatMap((group, groupIndex) => [
  {
    id: `group-${group.id}`,
    title: group.title,
    category: "Service area",
    description: group.description,
    href: "#services" as const,
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
  {
    id: "why-choose-us",
    title: "Why Choose Digital Solutions",
    category: "About Us",
    description: "Enterprise governance, multi-cloud speed, and proven ROI.",
    href: "#why" as const,
  },
  {
    id: "workflow-discovery",
    title: "Workflow Discovery & Strategy",
    category: "Approach",
    description: "Find the highest-value workflows and shape a practical automation roadmap.",
    href: "#method" as const,
  },
  {
    id: "production-approach",
    title: "Production AI Delivery",
    category: "Approach",
    description: "Secure integrations, human approvals, governance, and operational control.",
    href: "#method" as const,
  },
  {
    id: "start-project",
    title: "Start an AI Automation Project",
    category: "Contact",
    description: "Talk with Digital Solutions about your workflow automation opportunity.",
    href: "#contact" as const,
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
                  href="#why"
                  onPointerEnter={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(false)}
                  onClick={() => { setServicesOpen(false); closeSearch(); }}
                >
                  Why Choose Us
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
                  href={`/services/${activeMenuGroup.id}`}
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
                        <a className="vx-mega-group-title" href={`/services/${group.id}`} onClick={() => setServicesOpen(false)}>
                          {group.title} <ArrowRight size={15} aria-hidden="true" />
                        </a>
                        <ul>
                          {group.services.map((service, serviceIndex) => (
                            <li key={service}>
                              <a
                                ref={groupIndex === 0 && serviceIndex === 0 ? firstServiceLinkRef : undefined}
                                href={getServiceItemHref(service, group.id)}
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

          <div className={`vx-frost-panel vx-frost-panel--${activeHero}`} aria-hidden="true">
            <div className="vx-frost-tint" />
          </div>

          <div className="vx-frost-content">
            <div className="vx-frost-copy">
              <span>ENTERPRISE DIGITAL AGENCY &amp; AUTOMATION LAB</span>
              <h1><i>Smart Solutions.</i><i>Digital Growth.</i></h1>
              <p>We architect full-stack digital solutions—from autonomous AI agents and enterprise web applications to conversion-focused UI/UX design and high-ROAS Meta &amp; Google marketing funnels.</p>
              <div className="vx-frost-actions">
                <a href="#services">Explore 4 Core Services <ArrowRight size={15} aria-hidden="true" /></a>
                <a href="#why">Why Choose Us</a>
              </div>
            </div>

            <div className="vx-hero-services-grid" aria-label="Our 4 Core Service Capabilities">
              {/* Service 1: AI Automation */}
              <a href="/services/ai-automation" className="vx-hero-service-card" title="Explore AI Automation">
                <div className="vx-hsc-top">
                  <span className="vx-hsc-badge">
                    <span className="vx-hsc-dot" />
                    01 • AI AUTOMATION
                  </span>
                  <ArrowUpRight size={14} className="vx-hsc-arrow" aria-hidden="true" />
                </div>
                <h4>Autonomous Workflow Agents</h4>
                <div className="vx-hsc-metric">40% Lower Cost • 24/7 Execution</div>
                <div className="vx-hsc-tags">
                  <span className="vx-hsc-tag">Copilots</span>
                  <span className="vx-hsc-tag">RAG Agents</span>
                  <span className="vx-hsc-tag">Docs AI</span>
                </div>
              </a>

              {/* Service 2: Development */}
              <a href="/services/development" className="vx-hero-service-card" title="Explore Development">
                <div className="vx-hsc-top">
                  <span className="vx-hsc-badge" style={{ color: "#38bdf8" }}>
                    <span className="vx-hsc-dot" style={{ background: "#38bdf8" }} />
                    02 • DEVELOPMENT
                  </span>
                  <ArrowUpRight size={14} className="vx-hsc-arrow" aria-hidden="true" />
                </div>
                <h4>Next-Gen Web &amp; App Systems</h4>
                <div className="vx-hsc-metric">Sub-Second Latency • Cloud SLA</div>
                <div className="vx-hsc-tags">
                  <span className="vx-hsc-tag">Next.js / React</span>
                  <span className="vx-hsc-tag">DevOps</span>
                  <span className="vx-hsc-tag">APIs</span>
                </div>
              </a>

              {/* Service 3: Marketing & SEO */}
              <a href="/services/marketing-seo" className="vx-hero-service-card" title="Explore Marketing & SEO">
                <div className="vx-hsc-top">
                  <span className="vx-hsc-badge" style={{ color: "#60a5fa" }}>
                    <span className="vx-hsc-dot" style={{ background: "#60a5fa" }} />
                    03 • MARKETING &amp; SEO
                  </span>
                  <ArrowUpRight size={14} className="vx-hsc-arrow" aria-hidden="true" />
                </div>
                <h4>Meta &amp; Google Ads Engine</h4>
                <div className="vx-hsc-metric">4.2× Target ROAS • Organic SEO</div>
                <div className="vx-hsc-tags">
                  <span className="vx-hsc-tag">Meta Ads</span>
                  <span className="vx-hsc-tag">Google Ads</span>
                  <span className="vx-hsc-tag">Funnels</span>
                </div>
              </a>

              {/* Service 4: Design */}
              <a href="/services/design" className="vx-hero-service-card" title="Explore Design Services">
                <div className="vx-hsc-top">
                  <span className="vx-hsc-badge" style={{ color: "#818cf8" }}>
                    <span className="vx-hsc-dot" style={{ background: "#818cf8" }} />
                    04 • PRODUCT DESIGN
                  </span>
                  <ArrowUpRight size={14} className="vx-hsc-arrow" aria-hidden="true" />
                </div>
                <h4>UX/UI &amp; Scalable Systems</h4>
                <div className="vx-hsc-metric">+45% Conversion Lift • Figma</div>
                <div className="vx-hsc-tags">
                  <span className="vx-hsc-tag">Figma Systems</span>
                  <span className="vx-hsc-tag">Prototypes</span>
                  <span className="vx-hsc-tag">Tokens</span>
                </div>
              </a>
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

        {/* Agency Brand & Ecosystem Marquee Bar */}
        <BrandBar />

        <section className="vx-why" id="why" aria-labelledby="why-title">
          <div className="vx-why-heading">
            <span>Why Digital Solutions</span>
            <h2 id="why-title">Why choose us</h2>
            <p>We pair intelligent systems with the operational discipline to make them useful—across automation, products, marketing, and design.</p>
          </div>

          <div className="vx-why-grid">
            {whyChooseReasons.map((reason, index) => (
              <article className="vx-why-card" key={reason.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{reason.title}</h3>
                <p>{reason.copy}</p>
              </article>
            ))}
          </div>

          <div className="vx-reviews" aria-labelledby="reviews-title">
            <div className="vx-reviews-heading">
              <h3 id="reviews-title">What our clients say</h3>
              <a href="#services">See all services <ArrowRight size={15} aria-hidden="true" /></a>
            </div>

            <div className="vx-reviews-grid">
              {clientReviews.map((review) => (
                <blockquote className="vx-review-card" key={review.name}>
                  <div className="vx-review-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star key={starIndex} size={13} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <Quote className="vx-review-quote" size={22} aria-hidden="true" />
                  <p>{review.quote}</p>
                  <footer>
                    <strong>{review.name}</strong>
                    <span>{review.role}, {review.company}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="vx-deck" id="services">
          <div className="vx-services-showcase">
            <div className="vx-services-showcase-heading">
              <span>What We Deliver</span>
              <h2>Our Comprehensive Services</h2>
              <p>Explore our core service areas—engineered to transform operations, scale growth, and deliver high-impact digital experiences.</p>
            </div>

            <div className="vx-services-grid">
              {serviceMenuGroups.map((group) => (
                <article className="vx-service-card-main" key={group.id}>
                  <div>
                    <div className="vx-service-card-image">
                      <img src={group.image} alt={group.title} style={{ objectPosition: group.imagePosition }} />
                    </div>
                    <span className="vx-service-card-eyebrow">{group.eyebrow}</span>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <div className="vx-service-card-subservices">
                      {group.services.map((subService) => (
                        <a
                          key={subService}
                          href={getServiceItemHref(subService, group.id)}
                          className="vx-service-chip"
                        >
                          {subService}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a href={`/services/${group.id}`} className="vx-service-card-cta">
                    Explore {group.title} <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>

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
        </section>

        <footer className="vx-footer" id="contact">
          {/* Top CTA Banner */}
          <div className="vx-footer-cta-banner">
            <div className="vx-footer-cta-text">
              <h3>Ready to scale your digital presence &amp; operations?</h3>
              <p>Partner with Digital Solutions to engineer autonomous AI, custom software, and revenue-multiplying marketing systems.</p>
            </div>
            <a href="mailto:hello@digitalsolutions.ai" className="vx-footer-cta-btn">
              Start a Conversation <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="vx-footer-grid">
            {/* Brand Column */}
            <div className="vx-footer-brand-info">
              <a href="#top" aria-label="Digital Solutions home">
                <Brand />
              </a>
              <p>
                Smart Solutions, Digital Growth. We architect autonomous AI systems, enterprise-grade web applications, and high-converting marketing funnels for ambitious companies worldwide.
              </p>
              <div className="vx-footer-contact-items">
                <a href="mailto:hello@digitalsolutions.ai" className="vx-footer-contact-item">
                  <Mail size={14} className="text-sky-400" aria-hidden="true" /> hello@digitalsolutions.ai
                </a>
                <span className="vx-footer-contact-item">
                  <Globe2 size={14} className="text-sky-400" aria-hidden="true" /> Global Remote &amp; On-Site Delivery
                </span>
              </div>
              <div className="vx-footer-socials" style={{ margin: "12px 0 0", justifyContent: "flex-start" }}>
                <a href="#contact" aria-label="LinkedIn"><Linkedin size={15} aria-hidden="true" /></a>
                <a href="mailto:hello@digitalsolutions.ai" aria-label="Email Digital Solutions"><Mail size={15} aria-hidden="true" /></a>
                <a href="#top" aria-label="Digital Solutions website"><Globe2 size={15} aria-hidden="true" /></a>
              </div>
            </div>

            {/* Service Column 1: Development */}
            <div className="vx-footer-column">
              <h4>Development</h4>
              <a href="/services/development/web-app-engineering">Web &amp; App Engineering</a>
              <a href="/services/development/ai-product-development">AI Product Development</a>
              <a href="/services/development/api-systems-integration">API &amp; Integrations</a>
              <a href="/services/development/cloud-devops">Cloud &amp; DevOps</a>
              <a href="/services/development/quality-automation">Quality Automation</a>
            </div>

            {/* Service Column 2: Marketing & SEO */}
            <div className="vx-footer-column">
              <h4>Marketing &amp; SEO</h4>
              <a href="/services/marketing-seo/performance-marketing">Meta &amp; Google Ads</a>
              <a href="/services/marketing-seo/technical-seo">Technical SEO</a>
              <a href="/services/marketing-seo/ai-content-systems">AI Content Systems</a>
              <a href="/services/marketing-seo/crm-lifecycle-automation">CRM Automation</a>
              <a href="/services/marketing-seo/analytics-attribution">Attribution &amp; ROAS</a>
            </div>

            {/* Service Column 3: AI Automation */}
            <div className="vx-footer-column">
              <h4>AI Automation</h4>
              <a href="/services/ai-automation/ai-workflow-automation">Workflow Automation</a>
              <a href="/services/ai-automation/ai-agents-copilots">AI Agents &amp; Copilots</a>
              <a href="/services/ai-automation/process-intelligence">Process Intelligence</a>
              <a href="/services/ai-automation/document-intelligence">Document AI</a>
              <a href="/services/ai-automation/governance-observability">Governance &amp; RBAC</a>
            </div>

            {/* Service Column 4: Design */}
            <div className="vx-footer-column">
              <h4>Design</h4>
              <a href="/services/design/product-strategy">Product Strategy</a>
              <a href="/services/design/ux-ui-design">UX &amp; UI Design</a>
              <a href="/services/design/design-systems">Design Systems</a>
              <a href="/services/design/rapid-prototyping">Rapid Prototyping</a>
              <a href="/services/design/conversion-experience-design">Conversion Design</a>
            </div>
          </div>

          <div className="vx-footer-bottom">
            <span>© {new Date().getFullYear()} Digital Solutions. All rights reserved.</span>
            <div className="vx-footer-badges">
              <span className="vx-footer-badge">🔒 SOC-2 Type II Certified</span>
              <span className="vx-footer-badge">⚡ 99.98% System Uptime</span>
              <span className="vx-footer-badge">🌍 Multi-Cloud Scale</span>
            </div>
            <a href="#top">Back to top <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </footer>
      </main>
    </div>
  );
}
