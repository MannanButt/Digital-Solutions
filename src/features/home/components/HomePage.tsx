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
  Plug,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { Brand } from "@/src/components/brand/Brand";
import { BrandBar } from "@/src/components/brand/BrandBar";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import { clientReviews, heroImages, whyChooseReasons } from "@/src/features/home/data/content";
import { blogPosts } from "@/src/features/blog/data/blogData";
import { getServiceItemHref, serviceMenuGroups } from "@/src/features/services/data/services";
import "@/src/features/blog/styles/blog.css";

const whyIcons: Record<string, React.ReactNode> = {
  Rocket: <Rocket size={20} aria-hidden="true" />,
  ShieldCheck: <ShieldCheck size={20} aria-hidden="true" />,
  Plug: <Plug size={20} aria-hidden="true" />,
  TrendingUp: <TrendingUp size={20} aria-hidden="true" />,
};


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
                  WHY US
                </a>
                <a
                  href="#contact"
                  onPointerEnter={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(false)}
                  onClick={() => { setServicesOpen(false); closeSearch(); }}
                >
                  CONTACT
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
                <a href="#services" className="vx-frost-actions"><span>Explore 4 Core Services </span><ArrowRight size={15} aria-hidden="true" /></a>
              <a href="#contact" className="vx-frost-actions"><span>Contact Us </span><ArrowRight size={15} aria-hidden="true" /></a>
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
            <h2 id="why-title">WHY US</h2>
            <p>We pair intelligent systems with the operational discipline to make them useful—across automation, products, marketing, and design.</p>
          </div>

          <div className="vx-why-grid">
            {whyChooseReasons.map((reason, index) => (
              <article
                className="vx-why-card"
                key={reason.title}
                style={{ animationDelay: `${index * 110}ms`, "--why-accent": reason.accent } as React.CSSProperties}
              >
                <div className="vx-why-card-icon" style={{ background: `${reason.accent}22`, color: reason.accent }}>
                  {whyIcons[reason.icon]}
                </div>
                <div className="vx-why-card-num">{String(index + 1).padStart(2, "0")}</div>
                <h3>{reason.title}</h3>
                <p>{reason.copy}</p>
                <div className="vx-why-card-stat">
                  <strong style={{ color: reason.accent }}>{reason.stat}</strong>
                  <span>{reason.statLabel}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="vx-reviews" aria-labelledby="reviews-title">
            <div className="vx-reviews-heading">
              <h3 id="reviews-title">What our clients say</h3>
              <Link href="/reviews">All client reviews <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>

            <div className="vx-reviews-grid">
              {clientReviews.map((review, idx) => (
                <blockquote className="vx-review-card" key={review.name} style={{ animationDelay: `${idx * 120}ms` }}>
                  <div className="vx-review-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star key={starIndex} size={13} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <Quote className="vx-review-quote" size={22} aria-hidden="true" />
                  <p>{review.quote}</p>
                  <footer>
                    <div className="vx-review-avatar" aria-hidden="true">
                      {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="vx-review-author-info">
                      <strong>{review.name}</strong>
                      <span>{review.role}, {review.company}</span>
                    </div>
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
        </section>

        {/* ─── Insights & Thinking (Digital Solutions Blog) ─── */}
        <section className="vx-blog" id="blog" aria-labelledby="blog-title">
          <div className="vx-blog-heading">
            <span>Insights &amp; Thinking</span>
            <h2 id="blog-title">From the Digital Solutions team</h2>
            <p>Practical perspectives on AI automation, systems integration, and performance marketing—written by the people building them.</p>
          </div>

          <div className="vx-blog-grid">
            {blogPosts.map((post, idx) => (
              <article
                className="vx-blog-card"
                key={post.slug}
                style={{ animationDelay: `${idx * 130}ms` }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}
                  aria-label={`Read article: ${post.title}`}
                >
                  <div className="vx-blog-cover" style={{ background: post.accent }} aria-hidden="true">
                    <div className="vx-blog-cover-noise" />
                    <span className="vx-blog-cover-initials">{post.author.initials}</span>
                  </div>
                  <div className="vx-blog-body">
                    <div className="vx-blog-meta">
                      <span className="vx-blog-category">{post.category}</span>
                      <span className="vx-blog-dot" aria-hidden="true" />
                      <span className="vx-blog-time">{post.readTime}</span>
                      <span className="vx-blog-dot" aria-hidden="true" />
                      <time>{post.lastUpdated}</time>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <footer>
                      <div className="vx-blog-author">
                        <div className="vx-blog-author-avatar" aria-hidden="true">{post.author.initials}</div>
                        <div>
                          <strong>{post.author.name}</strong>
                          <span>{post.author.role}</span>
                        </div>
                      </div>
                      <span className="vx-blog-cta">
                        Read article <ArrowRight size={13} aria-hidden="true" />
                      </span>
                    </footer>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ─── Premium Agency Footer (Matching Reference Design) ─── */}
        <AgencyFooter />
      </main>
    </div>
  );
}
