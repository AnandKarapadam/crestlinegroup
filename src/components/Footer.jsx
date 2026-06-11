import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <p className="copyright-text">
          &copy; {currentYear} <span className="brand-highlight">CRESTLINE BUILDERS</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
