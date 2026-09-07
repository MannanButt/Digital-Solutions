"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Linkedin, Mail, Globe2, Phone, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";
import "@/src/features/home/styles/footer.css";

export function AgencyFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="vx-agency-footer" id="contact">
      <div className="vx-agency-footer-inner">
        <div className="vx-agency-footer-grid">
          {/* Column 1: Contact Us & Brand */}
          <div className="vx-footer-col-contact">
            <div style={{ marginBottom: "18px" }}>
              <Brand />
            </div>
            <span className="lead-text">Have a project?</span>
            <h3 className="main-text">Contact us</h3>

            <div className="vx-footer-contact-info">
              <a href="mailto:hello@digitalsolutions.ai" className="vx-footer-contact-link">
                <Mail size={15} /> hello@digitalsolutions.ai
              </a>
              <a href="tel:+14087094469" className="vx-footer-contact-link">
                <Phone size={15} /> +1 408-709-4469
              </a>
            </div>

          </div>

          {/* Column 2: Development Services */}
          <div className="vx-footer-col">
            <h4>Development</h4>
            <ul>
              <li><Link href="/services/development">Web &amp; App Engineering</Link></li>
              <li><Link href="/services/development">AI Product Development</Link></li>
              <li><Link href="/services/development">API &amp; Systems Integration</Link></li>
              <li><Link href="/services/development">Cloud &amp; DevOps</Link></li>
              <li><Link href="/services/development">Quality Automation</Link></li>
            </ul>
          </div>

          {/* Column 3: AI Automation */}
          <div className="vx-footer-col">
            <h4>AI Automation</h4>
            <ul>
              <li><Link href="/services/ai-automation">Workflow Automation</Link></li>
              <li><Link href="/services/ai-automation">AI Agents &amp; Copilots</Link></li>
              <li><Link href="/services/ai-automation">Process Intelligence</Link></li>
              <li><Link href="/services/ai-automation">Document Intelligence</Link></li>
              <li><Link href="/services/ai-automation">Governance &amp; Observability</Link></li>
            </ul>
          </div>

          {/* Column 4: Marketing & Design */}
          <div className="vx-footer-col">
            <h4>Marketing &amp; Design</h4>
            <ul>
              <li><Link href="/services/marketing-seo">Meta &amp; Google Ads</Link></li>
              <li><Link href="/services/marketing-seo">Technical SEO</Link></li>
              <li><Link href="/services/design">UX &amp; UI Design</Link></li>
              <li><Link href="/services/design">Product Strategy</Link></li>
              <li><Link href="/#blog">Insights &amp; Articles</Link></li>
            </ul>

            <div className="vx-footer-contact-details">
              <strong>HQ &amp; Remote Delivery</strong>
              <a href="tel:+14087094469">+1 408-709-4469</a>
              <a href="mailto:hello@digitalsolutions.ai">hello@digitalsolutions.ai</a>
            </div>
          </div>

          {/* Column 5: Stay Ahead / Newsletter */}
          <div className="vx-footer-col vx-footer-col-subscribe">
            <h4>Sign Up &amp; Save</h4>
            <p>
              Join our list for proven digital strategies, growth hacks, and AI automation insights.
            </p>

            {subscribed ? (
              <div style={{ padding: "12px", background: "rgba(14, 96, 201, 0.2)", border: "1px solid var(--vx-blue-bright)", borderRadius: "6px", color: "#e0f2fe", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <CheckCircle2 size={16} color="var(--vx-blue-bright)" />
                <span>Thanks for subscribing! Check your inbox soon.</span>
              </div>
            ) : (
              <form className="vx-footer-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                />
                <button type="submit">Subscribe</button>
              </form>
            )}

            <div className="vx-footer-social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="vx-footer-social-btn" aria-label="LinkedIn">
                <Linkedin size={15} />
              </a>
              <a href="mailto:hello@digitalsolutions.ai" className="vx-footer-social-btn" aria-label="Email Digital Solutions">
                <Mail size={15} />
              </a>
              <a href="#top" className="vx-footer-social-btn" aria-label="Digital Solutions Global">
                <Globe2 size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="vx-footer-copyright-bar">
          <span>© {new Date().getFullYear()} Digital Solutions. All rights reserved.</span>
          <div className="vx-footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              Back to top <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AgencyFooter;
