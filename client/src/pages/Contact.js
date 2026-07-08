import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('#contact .reveal');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const apiUrl = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
      const contactUrl = apiUrl
        ? `${apiUrl}${apiUrl.endsWith('/api') ? '/contact' : '/api/contact'}`
        : '/api/contact';
      const res = await fetch(contactUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-header reveal">
          <p className="section-label">Let's Connect</p>
          <h2>Get In Touch</h2>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-content">
          {/* INFO SIDE */}
          <div className="contact-info reveal">
            <div className="contact-info-card">
              <div className="info-icon"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <p>glennmarflores.dev@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Location</h4>
                <p>Urdaneta City, Pangasinan, Philippines</p>
              </div>
            </div>

            <div className="contact-decoration">
              <div className="deco-line"></div>
              <p className="deco-text">Open to opportunities</p>
              <div className="deco-line"></div>
            </div>
          </div>

          {/* FORM SIDE */}
          <form className="contact-form reveal" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={status === 'sending'}
              id="contact-submit"
            >
              {status === 'sending' ? (
                <span className="btn-loading">Sending...</span>
              ) : status === 'sent' ? (
                <span className="btn-success">Message Sent! ✓</span>
              ) : status === 'error' ? (
                <span className="btn-error">Failed to send</span>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
