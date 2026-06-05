import { useCallback, useEffect, useState } from 'react';

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  once = true,
}) {
  const [element, setElement] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const revealRef = useCallback((node) => {
    if (node) {
      setElement(node);
    }
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, once]);

  return (
    <div
      ref={revealRef}
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}