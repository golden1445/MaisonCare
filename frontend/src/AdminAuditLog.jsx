import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAuditLog.css';
import './AdminDashboard.css'; // Sidebar reuse karne ke liye

const AdminAuditLog = () => {
  const navigate = useNavigate();

  // dummy log  Data
  const logs = [
    { id: "LOG-9921", user: "Admin_Shubham", action: "Approved Maid #102", ip: "103.22.11.5", time: "12 Feb 2026, 14:10", type: "success" },
    { id: "LOG-9920", user: "Client_Rahul", action: "Failed Login Attempt", ip: "192.168.1.45", time: "12 Feb 2026, 13:45", type: "danger" },
    { id: "LOG-9919", user: "Admin_Shubham", action: "Deleted Job #442", ip: "103.22.11.5", time: "12 Feb 2026, 12:30", type: "warning" },
    { id: "LOG-9918", user: "System", action: "Backup Completed", ip: "Internal", time: "12 Feb 2026, 04:00", type: "success" },
    { id: "LOG-9917", user: "Maid_Anita", action: "Updated Bank Details", ip: "152.12.0.21", time: "11 Feb 2026, 18:20", type: "success" },
  ];

  return (
    <div className="audit-wrapper">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header" onClick={() => navigate('/admin-dashboard')} style={{cursor:'pointer'}}> Admin </div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-dashboard')}><span></span> Dashboard</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-verify')}><span></span> Verifications</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-users')}><span></span> All Users</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-jobs')}><span></span> All Jobs</div>
        <div className="admin-nav-item active"><span></span> Audit Logs</div>
        <div className="admin-nav-item" style={{ marginTop: 'auto', color: '#f87171' }} onClick={() => navigate('/admin-login')}><span></span> Logout</div>
      </div>

      <div className="audit-main">
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800' }}>System Audit Logs</h1>
          <p style={{ color: '#64748b' }}>Every action within the system is timestamped and recorded for security.</p>
        </header>

        {/* LOG TABLE */}
        <div className="audit-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>User / Entity</th>
                <th>Action</th>
                <th>IP Address</th>
                <th>Timestamp</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontWeight: '600', color: '#38bdf8' }}>{log.id}</td>
                  <td><strong>{log.user}</strong></td>
                  <td>{log.action}</td>
                  <td className="ip-address">{log.ip}</td>
                  <td style={{ color: '#64748b' }}>{log.time}</td>
                  <td>
                    <span className={`log-type type-${log.type}`}>
                      {log.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          style={{ marginTop: '20px', padding: '10px 20px', background: '#90EE90', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
          onClick={() => window.print()}
        >
          Download Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default AdminAuditLog;