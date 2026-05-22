import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, ShieldCheck, Paintbrush } from 'lucide-react';

const servicesData = [
  {
    icon: Ruler,
    title: 'Design-Build',
    description: 'Integrated design and construction teams streamline approvals and execution for accelerated handovers and seamless coordination.'
  },
  {
    icon: ShieldCheck,
    title: 'Waterproofing Expertise',
    description: 'End-to-end waterproofing for pools, tanks, and roofs — durable, seamless, and warranty-backed by industry leading specialists.'
  },
  {
    icon: Paintbrush,
    title: 'Premium Interiors',
    description: 'Bespoke interior finishes that blend minimalist palettes with high-performance materials for luxury comfort.'
  }
];

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="services-section section-padding">
      <div className="container">
        
        {/* Title Area */}
        <div className="services-header">
          <span className="section-label">Services</span>
          <h2 className="section-title-h2 gold-gradient-text">Crafting Spaces With Utmost Care</h2>
          <p className="lead-text services-subtitle">
            Our multi-disciplinary execution ensures perfection at every stage of construction.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={service.title} 
                className="service-card glass-panel"
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="service-icon-wrapper">
                  <IconComponent className="service-icon" size={28} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-card-glow"></div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
