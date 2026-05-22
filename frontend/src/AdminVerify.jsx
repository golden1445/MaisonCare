import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './utils/api'; 
import './AdminVerify.css';
import './AdminDashboard.css'; 

const AdminVerify = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Pending');
  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);

  //   checking admin authentication
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') navigate('/admin-login');
  }, [navigate]);

  // Fetching Data
  useEffect(() => {
    const fetchMaids = async () => {
      try {
        setLoading(true);
        const res = await API.get('/admin/maids-status'); 
        if (res.data.status === "Success") {
          setMaids(res.data.maids);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaids();
  }, []);

  const handleAction = async (id, newStatus) => {
    let reason = "";
    if (newStatus === 'Rejected') {
        reason = window.prompt("Enter rejection reason:");
        if (!reason) return;
    }

    try {
      const res = await API.post(`/admin/verify-maid/${id}`, { 
        status: newStatus, 
        reason: reason 
      });

      if (res.data.status === "Success") {
        // UI State update:
        setMaids(prevMaids => 
            prevMaids.map(m => m._id === id ? { ...m, status: newStatus, isVerified: newStatus === 'Approved' } : m)
        );
        alert(`Maid profile has been ${newStatus}`);
      }
    } catch (err) {
      alert("Error updating status: " + (err.response?.data?.message || "Server Error"));
    }
  };

  // Filter Logic
  const filteredMaids = filter === 'All' ? maids : maids.filter(m => m.status === filter);

  return (
    <div className="verify-wrapper">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header" onClick={() => navigate('/admin-dashboard')} style={{cursor:'pointer'}}> Admin Panel</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-dashboard')}><span></span> Dashboard</div>
        <div className="admin-nav-item active"><span></span> Pending Verifications</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-users')}><span></span> All Users</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-jobs')}><span></span> All Jobs</div>
        <div className="admin-nav-item" style={{ marginTop: 'auto', color: '#f87171' }} onClick={() => {
            localStorage.clear();
            navigate('/admin-login');
        }}><span></span> Logout</div>
      </div>

      <div className="verify-main">
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000000' }}>Verification Requests</h1>
          <p style={{ color: '#64748b', fontWeight: '500' }}>Review documents and authorize service providers</p>
        </header>

        <div className="filter-bar">
          {['Pending', 'Approved', 'Rejected', 'All'].map(f => (
            <button 
              key={f} 
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading requests...</p>
        ) : (
          <table className="verify-table">
            <thead>
              <tr>
                <th>Maid Name</th>
                <th>Reg. Date</th>
                <th>Documents</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaids.length > 0 ? (
                filteredMaids.map(maid => (
                  <tr key={maid._id}>
                    <td style={{ fontWeight: '700' }}>{maid.name}</td>
                    <td>{new Date(maid.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="doc-btn" onClick={() => window.open(`http://localhost:5000/${maid.panCard}`, "_blank")}>Pan Card</button>
                      <button className="doc-btn" onClick={() => window.open(`http://localhost:5000/${maid.policeVerification}`, "_blank")}> PV PDF</button>
                    </td>
                    <td>
                      <span className={`status-badge ${maid.status.toLowerCase()}`}>
                        {maid.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {maid.status === 'Pending' ? (
                        <div className="action-btns">
                          <button className="action-btn approve-btn" onClick={() => handleAction(maid._id, 'Approved')}>Approve</button>
                          <button className="action-btn reject-btn" onClick={() => handleAction(maid._id, 'Rejected')}>Reject</button>
                        </div>
                      ) : (
                        <span style={{color:'#64748b', fontSize:'13px'}}>Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{textAlign:'center', padding:'20px'}}>No {filter} requests found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminVerify;