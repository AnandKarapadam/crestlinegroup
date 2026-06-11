import { useEffect, useState } from 'react';
import '../styles/about.css';

const carouselImages = [
  {
    src: '/images/siteone.png',
    alt: 'Crystalline Construction Site 1',
  },
  {
    src: '/images/sitepool.png',
    alt: 'Crystalline Construction Site 2',
  },
  {
    src: '/images/sitefour.png',
    alt: 'Crystalline Construction Site 3',
  },
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    carouselImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.js-scroll-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          {/* Left Side: Story & Stats */}
          <div className="about-content js-scroll-reveal reveal-up">
            <span className="section-label">
              About Us
            </span>

            <h2 className="section-title-h2 gold-gradient-text">
              Building Precision. Shaping Skylines.
            </h2>

            <p className="about-lead lead-text">
              CRESTLINE CONSTRUCTION blends engineering excellence with modern architectural design.
              With over <span className="highlight-text">10 years</span> of experience, we construct durable,
              beautiful, and functional spaces.
            </p>

            <p className="about-description">
              Every project we touch is executed with uncompromising quality-whether it's a high-rise landmark,
              commercial hub, or premium residential space. Our philosophy is simple: precision in every layer,
              transparency in every decision, and premium craftsmanship in every inch.
            </p>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years of Mastery</span>
              </div>

              <div className="stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>

              <div className="stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Approval</span>
              </div>
            </div>

            <div className="about-cta">
              <a href="#contact" className="btn-outline">
                Partner With Us
              </a>
            </div>
          </div>

          {/* Right Side: Lightweight Image Slider */}
          <div className="about-slider-wrapper js-scroll-reveal reveal-right">
            <div className="carousel-container">
              {carouselImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                  aria-hidden={index !== currentIndex}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="carousel-img"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                  />
                </div>
              ))}

              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`carousel-indicator-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="slider-backdrop-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}