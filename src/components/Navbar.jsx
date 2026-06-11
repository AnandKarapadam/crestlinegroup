import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`header-nav navbar-load ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-wrapper">
          <a href="#" className="brand">
            <img
              src="/images/cropedlogo1.png"
              alt="Crystalline Logo"
              className="nav-logo"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />

            <span className="brand-text">CRESTLINE BUILDERS</span>
          </a>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="nav-link-item">
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <a href="#contact" className="btn-nav-cta">
                Get In Touch
              </a>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer mobile-drawer-open">
          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="mobile-nav-link-item"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <a
                href="#contact"
                className="btn-mobile-nav-cta"
                onClick={() => setIsOpen(false)}
              >
                Get In Touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}