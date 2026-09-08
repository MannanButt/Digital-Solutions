"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Instagram, Facebook, Globe2, Mail, Phone, ArrowUpRight } from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";
import "@/src/features/home/styles/footer.css";

export function AgencyFooter() {
  return (
    <footer className="vx-agency-footer" id="contact">
      <div className="vx-agency-footer-inner">
        <div className="vx-agency-footer-grid">
          {/* Column 1: Contact Us & Brand & Social Icons */}
          <div className="vx-footer-col-contact">
            <div style={{ marginBottom: "18px" }}>
              <Brand />
            </div>
            <span className="lead-text">Have a project?</span>
            <h3 className="main-text">Contact us</h3>

            <div className="vx-footer-contact-info">
              <a href="mailto:hello@digitalsolutions.ai" className="vx-footer-contact-link">
                <Mail size={16} /> hello@digitalsolutions.ai
              </a>
              <a href="tel:+14087094469" className="vx-footer-contact-link">
                <Phone size={16} /> +1 408-709-4469
              </a>
            </div>

            <div className="vx-footer-social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="vx-footer-social-btn" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="vx-footer-social-btn" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="vx-footer-social-btn" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#top" className="vx-footer-social-btn" aria-label="Website">
                <Globe2 size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Development */}
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

          {/* Column 4: Marketing & SEO (Separated) */}
          <div className="vx-footer-col">
            <h4>Marketing &amp; SEO</h4>
            <ul>
              <li><Link href="/services/marketing-seo">Meta &amp; Google Ads</Link></li>
              <li><Link href="/services/marketing-seo">Technical SEO</Link></li>
              <li><Link href="/services/marketing-seo">Performance Marketing</Link></li>
              <li><Link href="/services/marketing-seo">Conversion Funnels</Link></li>
              <li><Link href="/services/marketing-seo">Growth Strategy</Link></li>
            </ul>
          </div>

          {/* Column 5: Product Design (Separated) */}
          <div className="vx-footer-col">
            <h4>Product Design</h4>
            <ul>
              <li><Link href="/services/design">UX &amp; UI Design</Link></li>
              <li><Link href="/services/design">Figma Systems</Link></li>
              <li><Link href="/services/design">Product Strategy</Link></li>
              <li><Link href="/services/design">Interactive Prototypes</Link></li>
              <li><Link href="/services/design">Design Tokens</Link></li>
            </ul>
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
