import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import API from './utils/api';
import './ClientRegister.css';

const ClientRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode:'',
    serviceType: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      //  Backend API call
      const res = await API.post('/auth/register', formData);

      // 2. Response check aur AutoLogin 
      if (res.data.status === "Success") {
        login(res.data.user, res.data.token);
        navigate('/client-dashboard');
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong during registration");
    }
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Sirf numbers allow karein aur length 10 tak restrict karein
    if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({
            ...formData,
            phone: value
        });
    }
}; 

  return (
    <div className="register-page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          MaisonCare
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/')} className="back-home-btn">
            ← Back to Home
          </button>
        </div>
      </nav>

      <div className="register-main-wrapper">
        <div className="register-card">
          <div className="register-header">
            <h2>Client Registration</h2>
            <p>Join MaisonCare to find the perfect help for your home.</p>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                {/*<input type="tel" name="phone" placeholder="+91 00000 00000" onChange={handleChange} required />*/}
                <input 
    type="tel"   
    name="phone"
    placeholder="Enter 10 digit phone number"
    value={formData.phone}
    onChange={handlePhoneChange} // Custom handler use
    required
/>
              </div>
            </div>

            {/*<div className="input-group">
              <label>Are you looking for a Maid or Nanny?</label>
              <select name="serviceType" className="service-select" onChange={handleChange} required defaultValue="">
                <option value="" disabled>Click to select an option</option>
                <option value="maid"> I am looking for a Maid</option>
                <option value="nanny"> I am looking for a Nanny</option>
                <option value="both"> I need Both</option>
              </select>
            </div>*/}

            <div className="input-group">
              <label>Address</label>
              <textarea name="address" placeholder="Street, City" onChange={handleChange} required />
              <label>Pin Code</label>
              <input type="text" name="pincode" placeholder=" 6-digit Pin Code" onChange={handleChange} maxLength="6" required />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="••••••••" onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="register-btn">Register as Client</button>
          </form>

          <div className="register-footer-link">
            <p>Already registered? <span className="link-text" onClick={() => navigate('/login-client')}>Login here</span></p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p className="footer-text">© 2026 MaisonCare Premium Services</p>
      </footer>
    </div>
  );
};

export default ClientRegister;