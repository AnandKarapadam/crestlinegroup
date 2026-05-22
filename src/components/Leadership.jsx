import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy } from 'lucide-react';

const leaders = [
  {
    name: 'Aarav Nair',
    role: 'Founder & CEO',
    bio: 'Lead visionary with two decades crafting skyline icons across Asia.',
    email: 'aarav@crystalline.com',
    phone: '+1 212 555 0175',
    image: '/images/blankprofile.png'
  },
  {
    name: 'Maya Iyer',
    role: 'Project Director',
    bio: 'Drives mega-site execution with lean methodologies and safety-first culture.',
    email: 'maya@crystalline.com',
    phone: '+1 415 555 0189',
    image: '/images/blankprofile.png'
  }
];

export default function Leadership({ showToast }) {
  const handlePhoneClick = (e, phone) => {
    const isDesktop = window.matchMedia('(min-width: 992px)').matches;
    if (isDesktop) {
      e.preventDefault();
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`Copied ${phone} to clipboard.`);
      });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
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
    <section id="leadership" className="leadership-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="leadership-header text-center">
          <span className="section-label">Leadership</span>
          <h2 className="section-title-h2 gold-gradient-text">Faces behind CRYSTALLINE BUILDERS</h2>
          <p className="lead-text leadership-subtitle">
            Our visionary directors combining years of structural design and construction experience.
          </p>
        </div>

        {/* 2 Contact Cards Grid */}
        <motion.div 
          className="leadership-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {leaders.map((leader) => (
            <motion.div 
              key={leader.name}
              className="leader-card glass-panel"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="leader-image-wrapper">
                <img 
                  src={leader.image} 
                  alt={`${leader.name} portrait`} 
                  className="leader-img"
                />
                <div className="leader-image-overlay"></div>
              </div>
              
              <div className="leader-info">
                <h3 className="leader-name">{leader.name}</h3>
                <span className="leader-role">{leader.role}</span>
                <p className="leader-bio">{leader.bio}</p>
                
                <div className="leader-contacts">
                  <a href={`mailto:${leader.email}`} className="leader-contact-link">
                    <Mail size={16} />
                    <span>{leader.email}</span>
                  </a>
                  
                  <a 
                    href={`tel:${leader.phone.replace(/\s+/g, '')}`} 
                    onClick={(e) => handlePhoneClick(e, leader.phone)}
                    className="leader-contact-link phone-link"
                    title="Click to copy on desktop, click to call on mobile"
                  >
                    <Phone size={16} />
                    <span>{leader.phone}</span>
                    <Copy size={12} className="copy-icon" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
