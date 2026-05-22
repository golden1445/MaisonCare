import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import API from './utils/api';

const MaidFindJobs = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoc, setSearchLoc] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [jobType, setJobType] = useState('All Types');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const res = await API.get("/jobs/all-jobs", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        if (res.data.status === "Success") {
          const updatedJobs = res.data.jobs.map(job => ({
            ...job,
            applied: job.applicants? job.includes(user?._id) : false
          }));
          setJobs(updatedJobs);
          setFilteredJobs(updatedJobs);
        }
      } catch (error) {
        console.error("Jobs fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user?._id]);


  const handleSearch = () => {
    const results = jobs.filter(job => {
      const jobLocation = job.location || "";
      const matchLocation = jobLocation.toLowerCase().includes(searchLoc.toLowerCase());
      const matchSalary = minSalary === '' || job.salary >= parseInt(minSalary);
      const matchType = jobType === 'All Types' || job.jobType === jobType;
      return matchLocation && matchSalary && matchType;
    });
    setFilteredJobs(results);
  };

  const handleApply = async (id) => {
    try {
      const res = await API.post(`/applications/apply/${id}`);
      if (res.data.status === "Success") {
        alert("Applied successfully!");
        setFilteredJobs(prev => prev.map(job => job._id === id ? { ...job, applied: true } : job));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error applying");
    }
  };

  // Animation keyframes
  const spinKeyframes = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  const styles = {
    wrapper: { 
      display: 'flex', 
      minHeight: '100vh', 
      width: '100vw', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      position: 'absolute', 
      top: 0, 
      left: 0,
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    },
    sidebar: { 
      width: '280px', 
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      color: '#ffffff', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '30px 0', 
      position: 'fixed', 
      height: '100vh',
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)',
    },
    logo: {
      padding: '0 25px 35px',
      background: 'linear-gradient(135deg, #075985 0%, #0a6e9e 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '28px',
      fontWeight: '800',
      cursor: 'pointer',
      letterSpacing: '-0.5px',
    },
    navItem: { 
      padding: '12px 25px', 
      cursor: 'pointer', 
      color: '#94a3b8',
      transition: 'all 0.2s ease',
      fontSize: '15px',
      fontWeight: '500',
    },

    activeNavItem: { 
      padding: '12px 25px', 
      color: '#ffffff', 
      background: '#075985',
      borderLeft: '4px solid #075985',
      fontWeight: '600',
      boxShadow: '0 2px 8px rgba(7, 89, 133, 0.2)',
    },
    logoutItem: { 
      padding: '12px 25px', 
      cursor: 'pointer', 
      color: '#f87171', 
      marginTop: 'auto',
      transition: 'all 0.2s ease',
      fontWeight: '500',
    },
    mainContent: { 
      marginLeft: '280px', 
      flex: 1, 
      padding: '40px 50px',
      overflowY: 'auto',
    },
    pageTitle: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#0f172a',
      marginBottom: '30px',
      letterSpacing: '-0.3px',
    },
    searchContainer: { 
      backgroundColor: '#ffffff', 
      padding: '28px 32px', 
      borderRadius: '24px', 
      display: 'flex', 
      gap: '15px', 
      marginBottom: '35px', 
      alignItems: 'flex-end', 
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(7, 89, 133, 0.1)',
    },
    searchField: {
      flex: 1,
    },
    label: {
      display: 'block',
      fontSize: '13px',
      fontWeight: '600',
      color: '#075985',
      marginBottom: '8px',
    },
    input: { 
      width: '100%', 
      padding: '12px 16px', 
      borderRadius: '12px', 
      border: '1.5px solid #cbd5e1', 
      outline: 'none',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      color: '#1e293b',
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1.5px solid #cbd5e1',
      outline: 'none',
      fontSize: '14px',
      backgroundColor: '#ffffff',
      color: '#1e293b',
      cursor: 'pointer',
    },
    
    searchBtn: { 
      backgroundColor: '#075985', 
      color: 'white', 
      border: 'none', 
      padding: '12px 28px', 
      borderRadius: '40px', 
      fontWeight: '700', 
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      height: '48px',
    },

    jobCard: { 
      backgroundColor: '#ffffff', 
      padding: '24px 28px', 
      borderRadius: '20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '16px', 
      border: '1px solid rgba(7, 89, 133, 0.1)',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)',
    },

    jobTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '6px',
    },

    jobMeta: {
      color: '#64748b',
      fontSize: '14px',
      marginBottom: '8px',
    },

    salary: {
      color: '#075985',
      fontWeight: '800',
      fontSize: '16px',
    },

    appliedBadge: {
      color: '#166534',
      fontWeight: '700',
      backgroundColor: '#dcfce7',
      padding: '8px 20px',
      borderRadius: '40px',
      fontSize: '13px',
    },

    applyBtn: { 
      backgroundColor: '#075985', 
      color: 'white', 
      border: 'none', 
      padding: '10px 24px', 
      borderRadius: '40px', 
      fontWeight: '600',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',

    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px',
    },

    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '3px solid #e0f2fe',
      borderTopColor: '#075985',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },

    loadingText: {
      marginTop: '15px',
      color: '#075985',
      fontWeight: '600',
    },
    noJobsText: {
      textAlign: 'center',
      padding: '60px',
      color: '#64748b',
      fontSize: '16px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
    },
  };

  return (
    <>
      <style>{spinKeyframes}</style>
      <div style={styles.wrapper}>
        <div style={styles.sidebar}>
          <div style={styles.logo} onClick={() => navigate('/maid-dashboard')}>
            MaisonCare
          </div>
          <div 
            onClick={() => navigate('/maid-dashboard')} 
            style={styles.navItem}
            onMouseEnter={(e) => { if (!e.target.style.background) e.target.style.background = 'rgba(7, 89, 133, 0.2)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
          >
            Dashboard
          </div>
          <div style={styles.activeNavItem}>
            Find Jobs
          </div>
          <div 
            onClick={logout} 
            style={styles.logoutItem}
            onMouseEnter={(e) => { e.target.style.color = '#ff6b6b'; }}
            onMouseLeave={(e) => { e.target.style.color = '#f87171'; }}
          >
            Logout
          </div>
        </div>

        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Find Jobs</h1>
          
          <div style={styles.searchContainer}>
            <div style={styles.searchField}>
              <label style={styles.label}>Location</label>
              <input 
                placeholder="e.g. Delhi, Mumbai" 
                style={styles.input} 
                value={searchLoc} 
                onChange={(e) => setSearchLoc(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#075985'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
            <div style={styles.searchField}>
              <label style={styles.label}>Minimum Salary</label>
              <input 
                type="number" 
                placeholder="Enter amount" 
                style={styles.input} 
                value={minSalary} 
                onChange={(e) => setMinSalary(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#075985'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
            <div style={styles.searchField}>
              <label style={styles.label}>Job Type</label>
              <select 
                style={styles.select}
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#075985'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              >
                <option value="All Types">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <button 
              onClick={handleSearch} 
              style={styles.searchBtn}
              onMouseEnter={(e) => { e.target.style.background = '#0a6e9e'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.background = '#075985'; e.target.style.transform = 'translateY(0)'; }}
            >
              Search Jobs
            </button>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <div style={styles.loadingText}>Loading jobs...</div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={styles.noJobsText}>No jobs found matching your criteria.</div>
          ) : (
            filteredJobs.map(job => (
              <div key={job._id} style={styles.jobCard}>
                <div>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <p style={styles.jobMeta}>{job.client?.name} • {job.location}</p>
                  <span style={styles.salary}>Rs.{job.salary}/month</span>
                </div>
                {job.applied ? (
                  <div style={styles.appliedBadge}>Applied</div>
                ) : (
                  <button 
                    onClick={() => handleApply(job._id)} 
                    style={styles.applyBtn}
                    onMouseEnter={(e) => { e.target.style.background = '#0a6e9e'; e.target.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#075985'; e.target.style.transform = 'translateY(0)'; }}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MaidFindJobs;