import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQ.css';

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    {
      question: "How do I register as a client?",
      answer: "Click on the Client Login button on the homepage, then select Register. Fill in your details including name, email, phone number, and address. After registration, you can immediately start posting jobs and browsing helpers."
    },
    {
      question: "How do I become a verified helper?",
      answer: "Click on Register as Helper on the homepage. Complete the registration form with your personal details, experience, skills, and upload necessary documents. Our team will verify your documents within 2-3 business days. Once approved, your profile will be visible to clients."
    },
    {
      question: "Is background verification mandatory?",
      answer: "Yes, background verification is mandatory for all helpers on our platform. We conduct thorough police verification, identity checks, and reference validation to ensure complete safety and trust for our clients."
    },
    {
      question: "How does the booking process work?",
      answer: "Clients can browse through verified helper profiles, view their experience and ratings, then send a hiring request. Helpers can accept or decline the request. Once accepted, both parties can communicate through our platform to finalize service details."
    },
    {
      question: "What is the payment process?",
      answer: "Our platform uses a secure escrow payment system. Clients pay the agreed amount which is held securely. The payment is released to the helper only after the service is completed and the client confirms satisfaction."
    },
    {
      question: "Can I cancel a booking?",
      answer: "Yes, you can cancel a booking. However, cancellation policies apply. If cancelled more than 24 hours before service, full refund is provided. For last-minute cancellations, a partial fee may apply. Please check our cancellation policy for complete details."
    },
    {
      question: "How are helpers rated?",
      answer: "After each completed service, clients can rate their helper on a scale of 1-5 stars and leave a review. These ratings and reviews help other clients make informed decisions and maintain quality standards on our platform."
    },
    {
      question: "Is there customer support available?",
      answer: "Yes, we provide customer support. You can reach us via phone at +91 8401840142, email at maisoncare@gmail.com."
    },
    {
      question: "What documents are required for helper registration?",
      answer: "Helpers need to submit Aadhar Card, PAN Card, police verification,and recent photograph. All documents are verified by our team before profile approval."
    },
    {
      question: "How long does it take to find a helper?",
      answer: "Most clients find a suitable helper within 24-48 hours of posting a job. Our platform has a wide network of verified professionals across various categories like housekeeping, cooking, nanny services, and elderly care."
    }
  ];

  return (
    <div className="faq-page">
      {/* Navigation */}
      <nav className="faq-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>MaisonCare</div>
        <button className="nav-home-btn" onClick={() => navigate('/')}>Home</button>
      </nav>

      {/* Hero Section */}
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our platform</p>
      </div>

      {/* FAQ Section */}
      <div className="faq-container">
        <div className="faq-grid">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.question}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Still Have Questions */}
      <div className="still-questions">
        <div className="questions-content">
           
          
        </div>
      </div>

      {/* Footer */}
      <footer className="faq-footer">
        <p>Copyright © 2026 MaisonCare. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FAQ;