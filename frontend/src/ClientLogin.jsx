import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import API from './utils/api';

const ClientLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      //  API Call
      const res = await API.post('/auth/login', { email, password });

      //  Safe Response Handling with checks
      if (res && res.data && res.data.status === "Success") {
        const { user, token } = res.data;
        
        // 3. Update AuthContext
        login(user, token);

        // 4. Rolebased Navigation
        if (user.role === 'client') {
          navigate('/client-dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(res?.data?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error("Login Error Details:", err.response);
      // Backend errors (401, 500) 
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  
  const styles = {
    wrapper: {
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 8%',
      height: '80px',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      borderBottom: '1px solid rgba(7, 89, 133, 0.1)',
    },
    logo: {
      fontSize: '28px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #075985 0%, #0a6e9e 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      cursor: 'pointer',
      letterSpacing: '-0.5px',
    },
    backButton: {
      backgroundColor: 'transparent',
      color: '#075985',
      border: '1.5px solid #075985',
      padding: '8px 24px',
      borderRadius: '40px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
    },
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px 20px',
    },
    card: {
      background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
      width: '100%',
      maxWidth: '480px',
      borderRadius: '32px',
      padding: '48px 44px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      border: '1px solid rgba(7, 89, 133, 0.08)',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '12px',
      letterSpacing: '-0.3px',
    },
    subheading: {
      color: '#334155',
      marginBottom: '40px',
      fontSize: '15px',
      fontWeight: '500',
    },
    inputGroup: {
      textAlign: 'left',
      marginBottom: '8px',
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#1e293b',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      marginBottom: '24px',
      borderRadius: '14px',
      border: '1.5px solid #cbd5e1',
      fontSize: '15px',
      transition: 'all 0.2s ease',
      outline: 'none',
      backgroundColor: '#ffffff',
      color: '#1e293b', 
      fontWeight: '500', 
    },
    btnLogin: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#075985',
      color: 'white',
      border: 'none',
      borderRadius: '40px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '8px',
      boxShadow: '0 4px 12px rgba(7, 89, 133, 0.25)',
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      marginBottom: '20px',
      fontSize: '13px',
      fontWeight: '500',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1px solid #fecaca',
    },
    footer: {
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px 0',
      textAlign: 'center',
      fontSize: '13px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    },
  };

  // Hover effect handling
  const [isHovered, setIsHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          MaisonCare
        </div>
        <button
          style={{
            ...styles.backButton,
            backgroundColor: isBackHovered ? '#075985' : 'transparent',
            color: isBackHovered ? '#ffffff' : '#075985',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={() => setIsBackHovered(true)}
          onMouseLeave={() => setIsBackHovered(false)}
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </nav>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Welcome back</h1>
          <p style={styles.subheading}>Sign in to access your client dashboard</p>

          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email address</label>
              <input
                type="email"
                placeholder="rahul@example.com"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = '#075985')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = '#075985')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                required
              />
            </div>

            {error && <div style={styles.errorMessage}>{error}</div>}

            <button
              type="submit"
              style={{
                ...styles.btnLogin,
                backgroundColor: isHovered ? '#0a6e9e' : '#075985',
                transform: isHovered ? 'translateY(-1px)' : 'none',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <footer style={styles.footer}>
        © 2026 MaisonCare Premium Services 
      </footer>
    </div>
  );
};

export default ClientLogin;