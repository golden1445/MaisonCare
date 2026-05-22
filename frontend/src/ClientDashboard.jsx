import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import API from './utils/api'; 
import './ClientDashboard.css';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [myJobs, setMyJobs] = useState([]);
  const [sentRequests, setSentRequests] = useState([]); 
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const clientName = user?.name || "Client"; 

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const res = await API.put(`/jobs/application-status/${applicationId}`, { status: newStatus });
      
      if (res.status === 200) {
        alert(`Maid ${newStatus === 'accepted' ? 'Hired' : 'Rejected'} successfully!`);
        const currentApp = applications.find(app => app._id === applicationId);
        const jobId = currentApp?.job?._id;

        setApplications(prev => 
          prev.map(app => {
            if (app._id === applicationId) return { ...app, status: newStatus };
            if (newStatus === 'accepted' && app.job?._id === jobId && app.status === 'pending') {
              return { ...app, status: 'rejected' };
            }
            return app;
          })
        );

        if (newStatus === 'accepted') {
          setMyJobs(prev => 
            prev.map(job => job._id === jobId ? { ...job, status: 'closed' } : job)
          );
        }
      }
    } catch (err) {
      console.error("Status Update Error:", err);
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get('/jobs/my-jobs'); 
        if (res.data && res.data.jobs) setMyJobs(res.data.jobs);

        const bookingRes = await API.get('/bookings/my-bookings'); 
        if (bookingRes.data && bookingRes.data.bookings) setSentRequests(bookingRes.data.bookings);
        
        const appRes = await API.get('/jobs/client-applications');
        if (appRes.data && appRes.data.applications) {
          setApplications(appRes.data.applications);
        }
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <h2 className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>MaisonCare</h2>
          </div>
          <div className="user-profile">
            <div className="user-info">
              <p className="welcome">Welcome back,</p>
              <p className="username">{clientName}</p>
            </div>
          </div>
          <nav className="sidebar-nav">
            <button className="nav-link active" onClick={() => navigate('/client-dashboard')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/post-job')}>Post a Job</button>
            <button className="nav-link" onClick={() => navigate('/browse-maids')}>Browse Helpers</button>
          </nav>
          <span className="logout-text" onClick={() => { logout(); navigate ('/'); }}> Logout </span>
        </aside>

        <main className="main-viewport">
          <header className="main-header">
            <h2 className="page-title"></h2>
          </header>

          <div className="content-grid">
            <div className="glass-card applications-card">
              <div className="card-header">
                <h3>Received Job Applications</h3>
              </div>
              {applications.length > 0 ? (
                <div className="job-list-mini">
                  {applications.map((app) => (
                    <div key={app._id} className="job-item-row">
                      <div className="job-info">
                        <strong className="maid-name">{app.applicant?.name}</strong>
                        <p className="job-details-text" style={{ margin: '4px 0' }}>Applying for: {app.job?.title}</p>
                        
                        {/* Maid Details Section */}
                        {app.applicant && (
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
                            <p style={{ margin: '2px 0' }}>
                              <b>Exp:</b> {app.applicant.experience || 'Not Mentioned'}  
                              <span style={{ margin: '0 8px' }}>|</span>
                               <b>Skills:</b> {
                               Array.isArray(app.applicant.skills) && app.applicant.skills.length > 0
                               ? app.applicant.skills.join(",")
                               : (app.applicant.skills || 'Not Listed')
                        }
                            </p>
                            <p style={{ margin: '2px 0' }}><b>Contact:</b> {app.applicant.phone || 'Not Provided'}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="action-area" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {app.status === 'pending' ? (
                          <>
                            <button onClick={() => handleStatusUpdate(app._id, 'accepted')} style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Hire</button>
                            <button onClick={() => handleStatusUpdate(app._id, 'rejected')} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Reject</button>
                          </>
                        ) : (
                          <span className={`status-tag ${app.status}`}>{app.status.toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="empty-text">No applications received yet.</p>}
            </div>

            <div className="glass-card requests-card">
              <div className="card-header">
                <h3>Sent Hiring Requests</h3>
              </div>
              {sentRequests.length > 0 ? (
                <div className="job-list-mini">
                  {sentRequests.map((req) => (
                    <div key={req._id} className="job-item-row">
                      <div className="job-info">
                        <strong className="maid-name">Helper: {req.maid?.name || "Helper"}</strong>
                        <p className="job-details-text">Date: {new Date(req.serviceDate).toLocaleDateString()} | Salary: Rs.{req.totalAmount}</p>
                      </div>
                      <span className={`status-tag ${req.status}`}>{req.status.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="empty-text">No requests sent yet.</p>}
            </div>

            <div className="glass-card jobs-card">
              <div className="card-header">
                <h3>My Job Postings</h3>
              </div>
              {loading ? ( <p className="loading-text">Loading...</p> ) : myJobs.length > 0 ? (
                <div className="job-list-mini">
                  {myJobs.map((job) => (
                    <div key={job._id} className="job-item-row">
                      <div className="job-info">
                        <strong className="job-title">{job.title}</strong>
                        <p className="job-details-text">{job.location} • Rs.{job.salary}</p>
                      </div>
                      <span className={`status-tag ${job.status}`}>{job.status.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="empty-text">No jobs found.</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;