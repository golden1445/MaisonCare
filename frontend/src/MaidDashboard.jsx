import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

const MaidDashboard = () => {
  const { user, logout, loading, fetchUpdatedUser } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role.toLowerCase() !== 'maid') {
        navigate('/login-maid');
      } else {
        fetchUpdatedUser(); 
        fetchHiringRequests();
      }
    }
  }, [user, loading, navigate]);

  const fetchHiringRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.status === "Success") {
          setRequests(res.data.bookings);
        }
      }
    } catch (e) {
      console.error("Error fetching hiring requests", e);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/bookings/update-status", 
        { bookingId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status === "Success") {
        alert(`Request ${newStatus}!`);
        fetchHiringRequests(); 
      }
    } catch (e)  {
      alert("Failed to update status");
    }
  };

  const handleLogout = () => { logout(); navigate('/login-maid'); };

  if (loading) return  (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}></div>
      <div style={styles.loadingText}>Loading MaisonCare...</div>
    </div>
  );

  const isApproved = user?.status === 'approved' || user?.status === 'verified' || user?.isVerified === true;
  const statusText = isApproved ? "Verified" : "Verification Pending";

  const styles = {
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    },
    loadingSpinner:  {
      width: '50px',
      height: '50px',
      border: '3px solid #e0f2fe',
      borderTopColor: '#075985',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    loadingText: {
      marginTop: '20px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#075985',
    },
    container: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    },
    sidebar: {
      width: '280px',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 24px',
      flexShrink: 0,
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)',
    },
    logo: {
      background: 'linear-gradient(135deg, #075985 0%, #0a6e9e 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '28px',
      fontWeight: '800',
      marginBottom: '50px',
      letterSpacing: '-0.5px',
      cursor: 'pointer',
    },
    nav: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    navItem: {
      color: '#94a3b8',
      padding: '12px 18px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '500',
      fontSize: '15px',
    },
    activeNav: {
      background: '#075985',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(7, 89, 133, 0.3)',
    },
    logoutBtn: {
      background: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      border: 'none',
      padding: '12px 18px',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: 'auto',
      textAlign: 'center',
    },
    mainContent: {
      flex: 1,
      padding: '40px 50px',
      overflowY: 'auto',
    },
    header: {
      marginBottom: '35px',
    },
    welcomeSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    welcomeTitle: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#0f172a',
      letterSpacing: '-0.3px',
      margin: 0,
    },
    statusPill: {
      padding: '8px 20px',
      borderRadius: '40px',
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.3px',
      background: isApproved ? '#dcfce7' : '#fef9c3',
      color: isApproved ? '#166534' : '#854d0e',
      border: isApproved ? '1px solid #86efac' : '1px solid #fde047',
    },
    requestsCard: {
      background: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(7, 89, 133, 0.1)',
      overflow: 'hidden',
    },
    cardHeader: {
      padding: '24px 32px',
      borderBottom: '2px solid #e0f2fe',
    },
    cardTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#075985',
      margin: 0,
    },
    requestsList: {
      padding: '8px 0',
    },
    requestItem: {
      padding: '24px 32px',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.2s ease',
    },
    requestInfo: {
      flex: 1,
    },
    clientName: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#0f172a',
      margin: '0 0 8px 0',
    },
    requestDetails: {
      fontSize: '14px',
      color: '#475569',
      margin: '0 0 10px 0',
      lineHeight: '1.5',
    },
    detailLabel: {
      fontWeight: '600',
      color: '#075985',
    },
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '30px',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.5px',
      background: status === 'pending' ? '#fef9c3' : status === 'confirmed' ? '#dcfce7' : status === 'cancelled' ? '#fee2e2' : '#e0e7ff',
      color: status === 'pending' ? '#854d0e' : status === 'confirmed' ? '#166534' : status === 'cancelled' ? '#991b1b' : '#3730a3',
    }),
    actionButtons: {
      display: 'flex',
      gap: '12px',
    },
    btnAccept: {
      background: '#075985',
      color: 'white',
      border: 'none',
      padding: '8px 20px',
      borderRadius: '40px',
      fontWeight: '600',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    btnDecline: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 20px',
      borderRadius: '40px',
      fontWeight: '600',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 32px',
      color: '#64748b',
      fontSize: '15px',
      fontWeight: '500',
    },
  };

  const spinKeyframes = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinKeyframes}</style>
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <div style={styles.logo} onClick={() => navigate('/')}>MaisonCare</div>
          <nav style={styles.nav}>
            <div style={{ ...styles.navItem, ...styles.activeNav }}>Dashboard</div>
            <div style={styles.navItem} onClick={() => navigate('/maid-edit-profile')}>Edit Profile</div>
            <div style={styles.navItem} onClick={() => navigate('/maid-my-applications')}>My Applications</div>
            <div style={styles.navItem} onClick={() => navigate('/maid-find-jobs')}>Find Jobs</div>
          </nav>
       <div style={{ color: '#f87171', cursor: 'pointer' }} onClick={handleLogout}>
  Logout
</div>
        </aside>

        <main style={styles.mainContent}>
          <header style={styles.header}>
            <div style={styles.welcomeSection}>
              <h1 style={styles.welcomeTitle}>Welcome, {user?.name || 'User'}</h1>
              <div style={styles.statusPill}>Status: {statusText}</div>
            </div>
          </header>

          <div style={styles.requestsCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Hiring Requests</h2>
            </div>
            <div style={styles.requestsList}>
              {requests.length === 0 ? (
                <p style={styles.emptyState}>No active hiring requests from clients.</p>
              ) : (
                requests.map((req) => (
                  <div key={req._id} style={styles.requestItem}>
                    <div style={styles.requestInfo}>
                      <h4 style={styles.clientName}>{req.client?.name}</h4>
                      <p style={styles.requestDetails}>
                        <span style={styles.detailLabel}>Date:</span> {new Date(req.serviceDate).toLocaleDateString()} | 
                        <span style={styles.detailLabel}> Address:</span> {req.address}
                      </p>
                      <span style={styles.statusBadge(req.status)}>
                        Status: {req.status.toUpperCase()}
                      </span>
                    </div>
                    {req.status === 'pending' && (
                      <div style={styles.actionButtons}>
                        <button 
                          style={styles.btnAccept}
                          onClick={() => handleUpdateStatus(req._id, 'confirmed')}
                          onMouseEnter={(e) => { e.target.style.background = '#0a6e9e'; e.target.style.transform = 'translateY(-1px)'; }}
                          onMouseLeave={(e) => { e.target.style.background = '#075985'; e.target.style.transform = 'translateY(0)'; }}
                        >
                          Accept
                        </button>
                        <button 
                          style={styles.btnDecline}
                          onClick={() => handleUpdateStatus(req._id, 'cancelled')}
                          onMouseEnter={(e) => { e.target.style.background = '#dc2626'; e.target.style.transform = 'translateY(-1px)'; }}
                          onMouseLeave={(e) => { e.target.style.background = '#ef4444'; e.target.style.transform = 'translateY(0)'; }}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MaidDashboard;