import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <span className="footer__text">
          SPELL REQUEST v1.0 | {currentYear} | Learn to code through magic
        </span>
        <div className="footer__links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
          <span className="footer__separator">|</span>
          <a
            href="#"
            className="footer__link"
          >
            Docs
          </a>
          <span className="footer__separator">|</span>
          <a
            href="#"
            className="footer__link"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
