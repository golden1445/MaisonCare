import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminJobs.css';
import './AdminDashboard.css';
import API from './utils/api'; 

const AdminJobs = () => {
  const navigate = useNavigate();

  // dummy data for Jobs
  const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        const fetchAllJobs = async () => {
          try {
            setLoading(true);
            const res = await API.get('/jobs/all-jobs');
             
              const formattedJobs = res.data.jobs.map(job => ({
                id: job._id,
                title: job.title,
                client: job.client && job.client.name ? job.client.name : "Unknown Client",

                date: new Date(job.createdAt).toLocaleDateString('en-GB'),

                apps: job.applications ? job.applications.length : 0,
                status: job.status || "Open"
              }));
              setJobs(formattedJobs);
            } catch (err) {
              console.error("Error fetching jobs:", err);
            } finally {
              setLoading(false);
            }
          };
          fetchAllJobs();
        }, []);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      setJobs(jobs.filter(job => job.id !== id));
      alert("Job deleted successfully.");
    }
  };

  return (
    <div className="jobs-wrapper">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header" onClick={() => navigate('/admin-dashboard')} style={{cursor:'pointer'}}> Admin Panel</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-dashboard')}><span></span> Dashboard</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-verify')}><span></span> Verifications</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-users')}><span></span> All Users</div>
        <div className="admin-nav-item active"><span></span> All Jobs</div>

        <div className="admin-nav-item" style={{ marginTop: 'auto', color: '#f87171' }} onClick={() => navigate('/admin-login')}><span></span> Logout</div>
      </div>

      <div className="jobs-main">
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800' ,color: 'Black' }}>Job Listings Management</h1>
     
        </header>

        <table className="jobs-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Posted By</th>
              <th>Date</th>
              
             
             
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td><strong>{job.title}</strong></td>
                <td>{job.client}</td>
                <td>{job.date}</td>
                
                
                     
                
                {/*<td>
                  <button className="view-btn" onClick={() => alert("Redirecting to job details...")}>View</button>
                  <button className="delete-btn" onClick={() => handleDelete(job.id, job.title)}>Delete</button>
                </td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;