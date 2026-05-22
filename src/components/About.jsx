import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const carouselImages = [
  '/images/siteone.png',
  '/images/sitepool.png',
  '/images/sitefour.png'
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          
          {/* Left Side: Story & Stats */}
          <motion.div 
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.span className="section-label" variants={textVariants}>
              About Us
            </motion.span>
            
            <motion.h2 className="section-title-h2 gold-gradient-text" variants={textVariants}>
              Building Precision. Shaping Skylines.
            </motion.h2>
            
            <motion.p className="about-lead lead-text" variants={textVariants}>
              CRYSTALLINE BUILDERS blends engineering excellence with modern architectural design. 
              With over <span className="highlight-text">10 years</span> of experience, we construct durable, 
              beautiful, and functional spaces.
            </motion.p>
            
            <motion.p className="about-description" variants={textVariants}>
              Every project we touch is executed with uncompromising quality—whether it's a high-rise landmark, 
              commercial hub, or premium residential space. Our philosophy is simple: precision in every layer, 
              transparency in every decision, and premium craftsmanship in every inch.
            </motion.p>

            {/* Premium Stats Grid */}
            <motion.div className="stats-grid" variants={textVariants}>
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
            </motion.div>

            <motion.div className="about-cta" variants={textVariants}>
              <a href="#contact" className="btn-outline">
                Partner With Us
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Animated Image Slider */}
          <motion.div 
            className="about-slider-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="carousel-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="carousel-slide"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                >
                  <img 
                    src={carouselImages[currentIndex]} 
                    alt={`Crystalline Construction Site ${currentIndex + 1}`} 
                    className="carousel-img"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="slider-backdrop-accent"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
