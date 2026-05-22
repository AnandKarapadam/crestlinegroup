import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <motion.div 
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Image */}
          <motion.div className="hero-image-wrapper" variants={imageVariants}>
            <img 
              src="/images/logo.png" 
              alt="Crystalline Builders Landmark" 
              className="hero-img-element"
            />
            <div className="hero-img-overlay"></div>
          </motion.div>

          {/* Right Column: Copy */}
          <motion.div className="hero-content" variants={containerVariants}>
            <motion.span className="section-label" variants={itemVariants}>
              Precision In Every Layer
            </motion.span>
            <motion.h1 className="hero-title gold-gradient-text" variants={itemVariants}>
              Architecting modern skylines with timeless precision and elegance.
            </motion.h1>
            <motion.p className="hero-description lead-text" variants={itemVariants}>
              From concept to ribbon cutting, we engineer dependable structures with bold aesthetics 
              and meticulous attention to every fastener.
            </motion.p>
            <motion.div className="hero-actions" variants={itemVariants}>
              <a href="#contact" className="btn-primary">
                Start a Project <ArrowRight size={18} />
              </a>
              <a href="#about" className="btn-outline">
                Our Philosophy
              </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
      <div className="hero-bg-glow"></div>
    </section>
  );
}
