import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSettings.css';
import './AdminDashboard.css';

const AdminSettings = () => {
  const navigate = useNavigate();
  
  // State for System Settings
  const [commission, setCommission] = useState(10);
  const [isMaintenance, setIsMaintenance] = useState(false);

  const handleSave = (section) => {
    alert(`${section} settings updated successfully!`);
  };

  return (
    <div className="settings-wrapper">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header" onClick={() => navigate('/admin-dashboard')} style={{cursor:'pointer'}}> Admin Panel</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-dashboard')}><span></span> Dashboard</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-verify')}><span></span> Verifications</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-users')}><span></span> All Users</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-jobs')}><span></span> All Jobs</div>
        <div className="admin-nav-item active"><span></span> Settings</div>
        <div className="admin-nav-item" style={{ marginTop: 'auto', color: '#f87171' }} onClick={() => navigate('/admin-login')}><span></span> Logout</div>
      </div>

      <div className="settings-main">
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000000' }}>System Settings</h1>
          <p style={{ color: '#000000', fontWeight: '500' }}></p>
        </header>

        <div className="settings-grid">
          
          {/*  ADMIN PROFILE */}
          <div className="settings-card">
            <h3> Admin Profile</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue="Super Admin" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" defaultValue="admin@maidconnect.com" />
            </div>
            <button className="save-btn" onClick={() => handleSave('Profile')}>Update Profile</button>
          </div>

          {/*  SECURITY */}
          <div className="settings-card">
            <h3> Change Password</h3>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Min. 8 characters" />
            </div>
            <button className="save-btn" onClick={() => handleSave('Security')}>Update Password</button>
          </div>

          {/*  PLATFORM RULES */}
          <div className="settings-card">
            <h3> Business Rules</h3>
            <div className="form-group">
              <label>Service Commission (%)</label>
              <input 
                type="number" 
                value={commission} 
                onChange={(e) => setCommission(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Manual Verification Required?</label>
              <select>
                <option>Yes (Recommended)</option>
                <option>No (Auto-Approve)</option>
              </select>
            </div>
            <button className="save-btn" onClick={() => handleSave('Business')}>Save Changes</button>
          </div>

          {/* SECTION 4: SYSTEM STATUS */}
          <div className="settings-card">
            <h3> System Controls</h3>
            <div className="toggle-container">
              <div>
                <strong style={{color: '#000000'}}>Maintenance Mode</strong>
                <p style={{fontSize: '12px', color: '#444', margin: '5px 0'}}>Stop all user activities for updates.</p>
              </div>
              <button 
                onClick={() => setIsMaintenance(!isMaintenance)}
                style={{
                  background: isMaintenance ? '#ef4444' : '#10b981',
                  color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700'
                }}
              >
                {isMaintenance ? "DEACTIVATE" : "ACTIVATE"}
              </button>
            </div>
            <div className="form-group" style={{marginTop: '15px'}}>
              <label>Support Contact Email</label>
              <input type="text" defaultValue="support@maidconnect.com" />
            </div>
            <button className="save-btn" onClick={() => handleSave('System')}>Save System Settings</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;