import { ArrowRight } from "lucide-react";
import RevealOnScroll from "../hooks/useRevealOnScroll";
import '../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Image */}
          <div className="hero-image-wrapper">
            <img
              src="/images/crestlinelogo1.png"
              alt="Crystalline Builders Landmark"
              className="hero-img-element"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-img-overlay"></div>
          </div>

          {/* Right Column: Copy */}
          <RevealOnScroll className="hero-content" delay={220}>
            <span className="section-label">Precision In Every Layer</span>

            <h1 className="hero-title gold-gradient-text">
              Architecting modern skylines with timeless precision and elegance.
            </h1>

            <p className="hero-description lead-text">
              From concept to ribbon cutting, we engineer dependable structures
              with bold aesthetics and meticulous attention to every fastener.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Start a Project <ArrowRight size={18} />
              </a>

              <a href="#about" className="btn-outline">
                Our Philosophy
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="hero-bg-glow"></div>
    </section>
  );
}
