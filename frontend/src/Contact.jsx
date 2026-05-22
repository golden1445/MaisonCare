import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-page">
      {/* Navigation */}
      <nav className="contact-nav">

  {/* Left    */}
  <div 
    className= "nav-logo" 
    onClick={() => navigate('/')}
  >
    MaisonCare
  </div>

  {/* RIGHT SIDE */}
  <div className="nav-links">

    <button 
      className="nav-home-btn" 
      onClick={() => navigate('/')}
    >
      Home
    </button>

    <button 
      className="nav-home-btn" 
      onClick={() => navigate('/faq')}
    >
      FAQ
    </button>

  </div>

</nav>

      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Get In Touch</h1>
        <p>We're here to help you </p>
      </div>

      {/* Contact Methods */}
      <div className="contact-methods-container">
        <div className="method-card">
          <div className="method-icon call"></div>
          <h3>Call Us</h3>
          <p>+91 8401840142</p>
          <span>Mon-Fri, 9AM to 8PM</span>
        </div>

        <div className="method-card">
          <div className="method-icon email"></div>
          <h3>Email Us</h3>
          <p>maisoncare@gmail.com</p>
          <span>24x7 Support</span>
        </div>

        <div className="method-card">
          <div className="method-icon whatsapp"></div>
          <h3>WhatsApp</h3>
          <p>+91 8401840142</p>
          <span>Instant Chat</span>
        </div>
      </div>

      {/* Social Connect */}
      <div className="social-section">
        <h2>Connect With Us</h2>
        <div className="social-grid">
          <div className="social-card instagram">
            <div className="social-icon insta-icon"></div>
            <h3>Instagram</h3>
          </div>
          <div className="social-card facebook">
            <div className="social-icon fb-icon"></div>
            <h3>Facebook</h3>
          </div>
          <div className="social-card youtube">
            <div className="social-icon yt-icon"></div>
            <h3>YouTube</h3>
          </div>
          <div className="social-card twitter">
            <div className="social-icon x-icon"></div>
            <h3>X</h3>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"Excellent service!  professional and trustworthy."</p>
            <h4>- Priya Verma</h4>
          </div>
          <div className="testimonial">
            <p>"Found  reliable maid services. Highly recommended!"</p>
            <h4>- Rajesh Rawat</h4>
          </div>
          <div className="testimonial">
            <p>"One of the best platform for home services. Very satisfied with the quality."</p>
            <h4>- Anjali Soni</h4>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <p>Copyright © 2026 MaisonCare. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;