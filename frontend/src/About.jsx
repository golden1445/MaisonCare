import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* Navbar */}
      <nav className="about-navbar">
        <div className="about-logo" onClick={() => navigate('/')}>
          MaisonCare
        </div>
        <button className="about-home-btn" onClick={() => navigate('/')}>
           Back to Home
        </button>
      </nav>

      <div className="about-content">
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="about-title">About MaisonCare</h1>
          <p className="about-subtitle">India's One Of The Trusted Home Services Platform</p>
        </div>

        {/* Problem Section */}
        <div className="about-section">
          <div className="section-header">
            <div className="section-line"></div>
            <h2 className="section-title">The Problem We Identified</h2>
            <div className="section-line"></div>
          </div>
          <div className="problem-grid">
            <div className="problem-card">
              <h3>Trust Deficit</h3>
              <p>Families struggle to find reliable domestic help. Inviting strangers into homes without verification creates safety concerns and anxiety for homeowners.</p>
            </div>
            <div className="problem-card">
              <h3>No Verification</h3>
              <p>Traditional methods lack background checks, leaving families vulnerable to potential risks with no accountability or assurance of credibility.</p>
            </div>
            <div className="problem-card">
              <h3>Inefficient Search Process</h3>
              <p>Families often have to search across multiple sources without any location-based filtering.</p>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="about-section">
          <div className="section-header">
            <div className="section-line"></div>
            <h2 className="section-title">How MaisonCare Solves This</h2>
            <div className="section-line"></div>
          </div>
          <div className="solution-grid">
            <div className="solution-card">
              <h3>Complete Background Verification</h3>
              <p>Every helper undergoes thorough police verification, identity checks, and reference validation before being approved on our platform.</p>
            </div>
            <div className="solution-card">
              <h3>Trust Score System</h3>
              <p>Our proprietary rating system combines client reviews, performance metrics, and reliability scores to ensure quality service.</p>
            </div>
            <div className="solution-card">
              <h3>Secure Booking & Payment</h3>
              <p>All transactions are protected with escrow system. Payment released only after service completion and client satisfaction.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="about-section">
          <div className="section-header">
            <div className="section-line"></div>
            <h2 className="section-title">Platform Features</h2>
            <div className="section-line"></div>
          </div>
          <div className="features-grid">
            <div className="feature-item">Verified Professionals Database</div>
            <div className="feature-item">Real-time Availability Tracking</div>
            <div className="feature-item">Direct Messaging System</div>
            <div className="feature-item">Flexible Booking Options</div>
            <div className="feature-item">Transparent Pricing</div>
            <div className="feature-item">24/7 Customer Support</div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="about-section vision-section">
          <div className="section-header">
            <div className="section-line"></div>
            <h2 className="section-title">Our Vision</h2>
            <div className="section-line"></div>
          </div>
          <div className="vision-content">
            <p>To become India's most trusted home services ecosystem where every family feels completely secure inviting help into their homes, and every helper gets dignified employment opportunities with fair wages and growth.</p>
          </div>
        </div>

        </div>

      <footer className="about-footer">
        <p>© 2026 MaisonCare Premium Services. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;