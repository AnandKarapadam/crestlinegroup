import { Ruler, ShieldCheck, Paintbrush } from 'lucide-react';
import RevealOnScroll from '../hooks/useRevealOnScroll';
import '../styles/services.css';

const servicesData = [
  {
    icon: Ruler,
    title: 'Design-Build',
    description:
      'Integrated design and construction teams streamline approvals and execution for accelerated handovers and seamless coordination.',
  },
  {
    icon: ShieldCheck,
    title: 'Waterproofing Expertise',
    description:
      'End-to-end waterproofing for pools, tanks, and roofs — durable, seamless, and warranty-backed by industry leading specialists.',
  },
  {
    icon: Paintbrush,
    title: 'Premium Interiors',
    description:
      'Bespoke interior finishes that blend minimalist palettes with high-performance materials for luxury comfort.',
  },
];

export default function Services() {
  return (
    <section  className="services-section section-padding">
      <div id="services" className="container">
        {/* Title Area */}
        <RevealOnScroll className="services-header">
          <span className="section-label">Services</span>

          <h2 className="section-title-h2 gold-gradient-text">
            Crafting Spaces With Utmost Care
          </h2>

          <p className="lead-text services-subtitle">
            Our multi-disciplinary execution ensures perfection at every stage of construction.
          </p>
        </RevealOnScroll>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <RevealOnScroll
                key={service.title}
                className="service-card glass-panel"
                delay={index * 150}
              >
                <div className="service-icon-wrapper">
                  <IconComponent className="service-icon" size={28} />
                </div>

                <h3 className="service-title">{service.title}</h3>

                <p className="service-description">
                  {service.description}
                </p>

                <div className="service-card-glow"></div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}