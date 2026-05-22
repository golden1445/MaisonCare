import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import API from './utils/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab] = useState('Dashboard');
  const [adminName, setAdminName] = useState('Admin');
const [loading, setLoading] = useState(true); 
  //  Check if user is logged in as Admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const savedName = localStorage.getItem('adminName');

    if (!token || role !== 'admin') {
      navigate('/admin-login');
    } else {
      setAdminName(savedName || 'Admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminName');
    navigate('/admin-login');
  };

  const [stats, setStats] = useState({
    totalUsers: 0, 
    totalJobs: 0,
    activeMaids: 0,
    activeClients:0
  });

  const activities = [
    { id: 1, action: "New Maid Registered", user: "Sunita Devi", time: "2 mins ago" },
    { id: 2, action: "Job Posted", user: "Rohan Khanna", time: "15 mins ago" },
    { id: 3, action: "Verification Approved", user: "Anita Singh", time: "1 hour ago" },
  ];

  const menuItems = [
    { label: 'Dashboard', icon: '', path: '/admin-dashboard' },
    { label: 'Pending Verifications', icon: '', path: '/admin-verify', count: stats.pendingVerifications },
    { label: 'All Users', icon: '', path: '/admin-users' },
    { label: 'All Jobs', icon: '', path: '/admin-jobs' },
    { label: 'Settings', icon: '', path: '/admin-settings' }, 
  ];
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const userRes = await API.get('/auth/all-users');
        const users = userRes.data.users || [];
        const jobRes = await API.get('/jobs/all-jobs');
        const jobsData = jobRes.data.jobs || [];
         const maids = users.filter(u => u.role === 'maid').length;
         const clients = users.filter(u => u.role === 'client').length;
           setStats({
            totalUsers: users.length,
            totalJobs: jobsData.length,
            activeMaids: maids,
            activeClients: clients
           });
          } catch (err) {
            console.error("Dashboard Fetch Error:", err);
          } finally {
            setLoading(false);
          }
          };
          fetchAdminData();

      }, []);
    
  return (
    <div className="admin-wrapper">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header" onClick={() => navigate('/admin-dashboard')} style={{cursor: 'pointer'}}>
           Admin Panel
        </div>
        
        {menuItems.map((item) => (
          <div 
            key={item.label} 
            className={`admin-nav-item ${activeTab === item.label ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span> 
            {item.label}
            {item.count > 0 && <span className="alert-badge">{item.count}</span>}
          </div>
        ))}

        <div className="admin-nav-item" style={{ marginTop: 'auto', color: '#f87171' }} onClick={handleLogout}>
          <span></span> Logout
        </div>
      </div>

      <div className="admin-main">
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', color: '#0f172a', fontWeight: '800', margin: 0 }}>System Overview</h1>
          <p style={{ color: '#64748b', marginTop: '5px' }}>Welcome back, {adminName}.</p>
        </header>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>TOTAL USERS</p>
            <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '10px 0' }}>{stats.totalUsers}</h2>
            <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>
              ● {stats.activeMaids} Maids / {stats.activeClients} Clients
            </span>
          </div>

          <div className="admin-stat-card" style={{ borderLeft: '5px solid #ef4444' }}>
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>PENDING VERIFICATIONS</p>
            <h2 style={{ fontSize: '32px', color: '#ef4444', margin: '10px 0' }}>{stats.pendingVerifications}</h2>
            <button 
              style={{ background: 'none', border: 'none', color: '#2563eb', padding: 0, cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}
              onClick={() => navigate('/admin-verify')}
            >
              Review Now →
            </button>
          </div>

          <div className="admin-stat-card">
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>TOTAL JOBS POSTED</p>
            <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '10px 0' }}>{stats.totalJobs}</h2>
            <span style={{ color: '#64748b', fontSize: '12px' }}>Activity: High</span>
          </div>
        </div>

       
        
        
      </div>
    </div>
  );
};


export default AdminDashboard;