// Home.jsx

import React from 'react';

import { useNavigate } from 'react-router-dom';

import './Home.css';
import bgImage from './assets/vecteezy_small-newborn-hand-holding-little-adorable-cute-child_52522569.jpg';

const Home = () => {

  const navigate = useNavigate();

  return (

    <div className="home-container">

      {/* navbar */}

      <nav className="navbar">

        <div className="logo" onClick={() => navigate('/')}>
          MaisonCare
        </div>

        <div className="nav-links">
          <button className="nav-btn" onClick={() => navigate('/about')}>About</button>
          <button className="nav-btn" onClick={() => navigate('/contact')}>Contact</button>
        </div>

      </nav>

      {/* main content */}

      <div 
        className="main-wrapper"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >

        <div className="hero">

          <h1>Premium care for your home</h1>

          <p>Connect with verified professionals you can trust</p>

        </div>

        <div className="cards-container">

          <div className="card" onClick={() => navigate('/register-client')}>

            <div className="card-icon client-icon"></div>

            <h3>Client</h3>

            <p>Find trusted caregivers for your family</p>

            <span className="card-arrow">→</span>

          </div>

          <div className="card" onClick={() => navigate('/register-maid')}>

            <div className="card-icon provider-icon"></div>

            <h3>Maid / Nanny</h3>

            <p>Connect with families seeking your help</p>

            <span className="card-arrow">→</span>

          </div>

        </div>

        <div className="trust-badge">

          <span>✓ 100% verified profiles</span>

          <span>✓ Secure & reliable</span>

        </div>

      </div>

      {/*  FOOTER  */}

      <footer className="footer">

        <p className="copyright">© 2026 MaisonCare Premium Services</p>

        <div className="admin-link" onClick={() => navigate('/admin-login')}>

          <span className="admin-icon"></span>

        </div>

      </footer>

    </div>

  );

};

export default Home;

