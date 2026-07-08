import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo" onClick={scrollToTop}>
              <span className="footer-bracket">&lt;</span>
              <span className="footer-logo-text">Portfolio</span>
              <span className="footer-bracket"> /&gt;</span>
            </a>
            <p className="footer-tagline">Building digital experiences with passion and precision.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-social-section">
            <h4>Connect</h4>
            <div className="footer-social">
              <a href="https://github.com/glxnnmxr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:your.email@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
          <p className="footer-built">Built with React & Node.js</p>
        </div>
      </div>

      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top" id="back-to-top">
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;
