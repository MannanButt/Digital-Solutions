import React from "react";

const SERVICE_PLATFORMS = [
  {
    name: "Meta Ads (Facebook & Instagram)",
    category: "Marketing",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 112 24" fill="currentColor">
        {/* Meta infinity loop */}
        <path
          d="M13.2 5.2C10.7 2.1 6.8 1.8 3.9 4.3C1.2 6.6 0 10.3 0 13.8C0 17.6 1.4 20.8 4.2 22.4C6.5 23.7 9.4 23.3 11.9 21.2C13.5 19.8 14.8 17.9 16 16.2C17.2 17.9 18.5 19.8 20.1 21.2C22.6 23.3 25.5 23.7 27.8 22.4C30.6 20.8 32 17.6 32 13.8C32 10.3 30.8 6.6 28.1 4.3C25.2 1.8 21.3 2.1 18.8 5.2C17.7 6.6 16.8 8.1 16 9.6C15.2 8.1 14.3 6.6 13.2 5.2ZM7.2 6.5C8.9 6.5 10.5 7.6 11.7 9.6C12.8 11.4 13.4 13.4 12.8 15.3C12.3 16.9 11 18 9.4 18C7.5 18 6 16.6 6 14.2C6 11.5 6.4 9.1 7.2 6.5ZM24.8 6.5C25.6 9.1 26 11.5 26 14.2C26 16.6 24.5 18 22.6 18C21 18 19.7 16.9 19.2 15.3C18.6 13.4 19.2 11.4 20.3 9.6C21.5 7.6 23.1 6.5 24.8 6.5Z"
          fill="#0081FB"
        />
        <text x="38" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="800" fill="currentColor">Meta Ads</text>
      </svg>
    ),
  },
  {
    name: "Google Ads",
    category: "Marketing",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 125 24" fill="currentColor">
        <circle cx="9" cy="12" r="7" fill="#4285F4"/>
        <circle cx="16" cy="10" r="5" fill="#EA4335"/>
        <circle cx="19" cy="14" r="5" fill="#FBBC05"/>
        <circle cx="13" cy="16" r="4" fill="#34A853"/>
        <text x="32" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="750" fill="currentColor">Google Ads</text>
      </svg>
    ),
  },
  {
    name: "Figma",
    category: "Design",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 85 24" fill="currentColor">
        <path d="M4 2h4a4 4 0 0 1 4 4v4H8a4 4 0 0 1-4-4V2z" fill="#0ACF83"/>
        <path d="M4 10h4a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4V10z" fill="#A259FF"/>
        <path d="M12 2h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-4V2z" fill="#F24E1E"/>
        <path d="M12 10h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-4v-8z" fill="#FF7262"/>
        <path d="M12 18a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4h4z" fill="#1ABCFE"/>
        <text x="26" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="750" fill="currentColor">Figma</text>
      </svg>
    ),
  },
  {
    name: "Next.js / React",
    category: "Development",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M9 7v10l9-10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="30" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="800" letterSpacing="0.5" fill="currentColor">Next.js</text>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    category: "AI Automation",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="currentColor">
        <circle cx="11" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <circle cx="11" cy="12" r="3.5" fill="#10a37f"/>
        <text x="27" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">OpenAI</text>
      </svg>
    ),
  },
  {
    name: "Shopify Plus",
    category: "Development",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 92 24" fill="currentColor">
        <path d="M12 4 L7 8 L9 20 L19 20 L21 8 Z" fill="#95BF47"/>
        <path d="M12 6 C10 6 9 8 9 9 L15 9 C15 8 14 6 12 6 Z" fill="none" stroke="#fff" strokeWidth="1.2"/>
        <text x="27" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="750" fill="currentColor">Shopify</text>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    category: "Marketing",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="currentColor">
        <circle cx="11" cy="12" r="6" fill="#ff7a59"/>
        <circle cx="11" cy="12" r="3" fill="#fff"/>
        <circle cx="18" cy="8" r="2.2" fill="#ff7a59"/>
        <circle cx="18" cy="16" r="2.2" fill="#ff7a59"/>
        <text x="26" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="750" fill="currentColor">HubSpot</text>
      </svg>
    ),
  },
  {
    name: "Python & AI Stack",
    category: "AI Automation",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 90 24" fill="currentColor">
        <path d="M6 5h5a4 4 0 0 1 4 4v3H6a4 4 0 0 1-4-4V5h4z" fill="#3776AB"/>
        <path d="M16 19h-5a4 4 0 0 1-4-4v-3h9a4 4 0 0 1 4 4v3h-4z" fill="#FFD438"/>
        <circle cx="8" cy="8" r="1" fill="#fff"/>
        <circle cx="14" cy="16" r="1" fill="#fff"/>
        <text x="26" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="750" fill="currentColor">Python</text>
      </svg>
    ),
  },
  {
    name: "Stripe",
    category: "Development",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 78 24" fill="currentColor">
        <text x="2" y="18" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="900" fontStyle="italic" fill="#635bff">stripe</text>
      </svg>
    ),
  },
  {
    name: "Webflow",
    category: "Design",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="currentColor">
        <path d="M18 6L14 18H10L8 11L6 18H2L6 6H10L12 13L14 6H18Z" fill="#146EF5"/>
        <text x="24" y="17" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="800" fill="currentColor">Webflow</text>
      </svg>
    ),
  },
];

export function BrandBar() {
  return (
    <section className="vx-brand-bar" aria-label="Platforms and Technologies across Marketing, Engineering, Design and AI">
      <div className="vx-brand-bar-inner">
        <div className="vx-brand-bar-heading">
          <span className="vx-brand-bar-pill">SERVICE ECOSYSTEM &amp; PLATFORMS</span>
          <p>Certified expertise across Meta Ads, Google Marketing, Modern Web Engineering, Figma Design &amp; AI Systems</p>
        </div>

        <div className="vx-marquee-track-wrapper">
          <div className="vx-marquee-fade-left" aria-hidden="true" />
          <div className="vx-marquee-track">
            {/* Sequence 1 */}
            <div className="vx-marquee-content">
              {SERVICE_PLATFORMS.map((platform) => (
                <div key={`brand-1-${platform.name}`} className="vx-brand-item" title={platform.name}>
                  {platform.svg}
                </div>
              ))}
            </div>

            {/* Sequence 2 for seamless continuous marquee */}
            <div className="vx-marquee-content" aria-hidden="true">
              {SERVICE_PLATFORMS.map((platform) => (
                <div key={`brand-2-${platform.name}`} className="vx-brand-item" title={platform.name}>
                  {platform.svg}
                </div>
              ))}
            </div>
          </div>
          <div className="vx-marquee-fade-right" aria-hidden="true" />
        </div>

        {/* Agency Capability Proof Badges */}
        <div className="vx-brand-bar-badges">
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Meta &amp; Google Partner Certified</span>
          </div>
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Production Next.js &amp; Cloud Engineering</span>
          </div>
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Enterprise AI Orchestration &amp; RAG</span>
          </div>
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Conversion-Led Figma Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
