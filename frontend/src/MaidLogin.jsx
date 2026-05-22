import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import API from './utils/api'; 
import bgImage from './assets/vecteezy_young-mother.jpg';

const MaidLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const styles = {
    wrapper: { 
      width: '100vw', 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: "'Segoe UI', Roboto, sans-serif", 
      margin: 0, 
      padding: 0, 
      position: 'relative',
      overflowX: 'hidden'
    },
    
   
    nav: { 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      padding: '0 10%', 
      height: '80px', 
      backgroundColor: 'transparent', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 10 
    },
    
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      backgroundImage: `url(${bgImage})`,
    
      backgroundSize: '100% 100%', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    },
    
    card: { 
       backgroundColor: 'rgba(255, 255, 255, 0.4)',
      width: '100%', 
      maxWidth: '350px', 
      borderRadius: '20px', 
      padding: '30px', 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', 
      textAlign: 'center',
      zIndex: 2 
    },

    btnHome: {
      backgroundColor: '#075985',
      color: 'white',
      border: 'none',
      padding: '10px 25px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      transition: '0.3s'
    },

    input: { width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box', outlineColor: '#2563eb' },
    label: { display: 'block', textAlign: 'left', fontWeight: '600', marginBottom: '8px', color: '#334155' },
    btnLogin: { width: '100%', padding: '16px', backgroundColor: '#075985', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' },
    footer: { backgroundColor: '#000000', color: '#ffffff', padding: '20px 0', textAlign: 'center', fontSize: '14px', width: '100%' },
    toggleText: { marginTop: '25px', color: '#64748b', fontSize: '14px' }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await API.post('/auth/login', { email, password });

      if (res.data.status === "Success") {
        login(res.data.user, res.data.token);
        
        const role = res.data.user.role.toLowerCase();
        if (role === 'maid') {
          navigate('/maid-dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Invalid Credentials');
    }
  };

  return (
    <div style={styles.wrapper}>
      
      <nav style={styles.nav}>
        <button style={styles.btnHome} onClick={() => navigate('/')}>Home</button>
      </nav>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={{fontSize: '1.8rem', marginBottom: '8px', color: '#1e293b'}}>Maid Login</h1>
          <p style={{color: '#64748b', marginBottom: '35px'}}>Enter your details to access your dashboard</p>

          <form onSubmit={handleLogin}>
            <div style={{textAlign: 'left'}}>
              <label style={styles.label}>Email Address</label>
              <input type="email" placeholder="maid@example.com" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label style={styles.label}>Password</label>
              <input type="password" placeholder="••••••••" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            
            {error && <div style={{color: 'red', marginBottom: '15px', fontSize: '14px'}}>{error}</div>}
            
            <button type="submit" style={styles.btnLogin}>Login to Dashboard</button>
          </form>

          <div style={styles.toggleText}>
            Don't have an account? <span style={{color: '#075985', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => navigate('/register-maid')}>Register as a Maid</span>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default MaidLogin;