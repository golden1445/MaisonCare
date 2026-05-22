import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './utils/api'; 
import { useAuth } from './context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/login', {
        identifier: credentials.email,
        password: credentials.password,
        isAdminLogin: true 
      });

      if (res.data.status === "Success") {
        // AuthContext 
        login(res.data.user, res.data.token); 

        //  save other details
        localStorage.setItem('adminName', res.data.user.name);

        // navigate to dashboard
        navigate('/admin-dashboard');
      }
    } catch (err) {
      console.error("Login Error:", err.response);
      setError(err.response?.data?.message || 'Login Failed! check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <nav className="login-nav">
        <div className="nav-content">
          <span className="brand-logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>MaisonCare</span>
          <button className="back-home-link" onClick={() => navigate('/')}>← Back to Home</button>
        </div>
      </nav>

      <div className="login-flex-container">
        <div className="login-card">
          <div className="login-header">
            <div className="admin-indicator">SYSTEM ADMIN</div>
            
            <p></p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Admin Email</label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Security Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            
            {error && (
              <div className="error-banner" style={{
                color: '#fff', backgroundColor: '#f87171', padding: '10px', 
                borderRadius: '8px', marginBottom: '15px', fontSize: '13px', textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;