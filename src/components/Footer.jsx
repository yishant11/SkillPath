import React from "react";
import "./Footer.css";

/**
 * Footer Component
 * Displays navigation anchors and copyright information.
 */
export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#courses-section" className="footer-link">
            Courses
          </a>
          <a href="#about" className="footer-link">
            About
          </a>
          <a href="#contact" className="footer-link">
            Contact
          </a>
        </nav>
        <p className="footer-copyright">
          © 2026 Skillpath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
