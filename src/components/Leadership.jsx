import { Mail, Phone, Copy } from 'lucide-react';
import RevealOnScroll from '../hooks/useRevealOnScroll';
import '../styles/leadership.css';

const leaders = [
  {
    name: 'Founder Name',
    role: 'Founder & CEO',
    bio: 'Lead visionary with two decades crafting skyline icons across Asia.',
    email: 'founder@crestline.com',
    phone: '+1 212 555 0175',
    image: '/images/blankprofile.png',
  },
  {
    name: 'Director Name',
    role: 'Project Director',
    bio: 'Drives mega-site execution with lean methodologies and safety-first culture.',
    email: 'director@crestline.com',
    phone: '+1 415 555 0189',
    image: '/images/blankprofile.png',
  },
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

  return (
    <section id="leadership" className="leadership-section section-padding">
      <div className="container">
        {/* Section Header */}
        <RevealOnScroll className="leadership-header text-center">
          <span className="section-label">Leadership</span>

          <h2 className="section-title-h2 gold-gradient-text">
            Faces behind CRESTLINE CONSTRUCTION
          </h2>

          <p className="lead-text leadership-subtitle">
            Our visionary directors combining years of structural design and construction experience.
          </p>
        </RevealOnScroll>

        {/* 2 Contact Cards Grid */}
        <div className="leadership-grid">
          {leaders.map((leader, index) => (
            <RevealOnScroll
              key={leader.name}
              className="leader-card glass-panel"
              delay={index * 180}
            >
              <div className="leader-image-wrapper">
                <img
                  src={leader.image}
                  alt={`${leader.name} portrait`}
                  className="leader-img"
                  loading="lazy"
                  decoding="async"
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
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}