import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import API from './utils/api';

const MaidMyApplications = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const res =  await API.get('/jobs/my-applications');
          if(res.data && res.data.status === "Success") {
            setApplications(res.data.applications);
          } 
        } catch (err) {
          console.error("Fetch Error:", err);
        } finally {
          setLoading(false);
        }
        }; 
           if (user?._id) fetchApps();
          }, [user?._id]);
          

        

  const styles = {
    wrapper: { display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#f1f5f9' },
    sidebar: { width: '260px', backgroundColor: '#1e293b', color: '#ffffff', display: 'flex', flexDirection: 'column', padding: '20px 0', position: 'fixed', height: '100vh', zIndex: 100 },
    mainArea: { marginLeft: '260px', width: 'calc(100% - 260px)', padding: '40px' },
    card: { backgroundColor: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0', marginBottom: '20px' }
  };

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div style={styles.wrapper}>
      {/* Sidebar added back so , layout is full and consistent */}
      <div style={styles.sidebar}>
        <div style={{padding: '0 25px 30px', fontSize: '28px', fontWeight: '800', cursor: 'pointer', color: '#075985'}} onClick={() => navigate('/')}>MaisonCare</div>
        <div style={{padding: '15px 25px', cursor: 'pointer', color: '#94a3b8'}} onClick={() => navigate('/maid-dashboard')}>Dashboard</div>
        <div style={{padding: '15px 25px', cursor: 'pointer', color: '#94a3b8'}} onClick={() => navigate('/maid-find-jobs')}>Find Jobs</div>
        <div style={{padding: '15px 25px', cursor: 'pointer', color: 'white', backgroundColor: '#334155'}} onClick={() => navigate('/maid-my-applications')}>My Applications</div>
        <div style={{marginTop: 'auto', padding: '15px 25px', color: '#f87171', cursor: 'pointer'}} onClick={logout}>Logout</div>
      </div>

      <div style={styles.mainArea}>
        <h2 style={{ marginBottom: '30px', fontWeight: '800', color: '#1e293b' }}>My Applied Jobs</h2>
        {applications.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {applications.map(app => (
              <div key={app._id} style={styles.card}>
                <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>
                  {app.job?.title || "JobTitle Unavailable"}
                       </h3>
                  <p style={{ margin: '0', color: '#64748b' }}>
                    {app.job?.location || 'N/A'}  | Rs.{app.job?.salary || '0'}
                  </p>
                <div style={{
                  marginTop: '15px',
                  display: 'inline-block',
                  padding: '5px 12px',
                  backgroundColor:
                  app.status === 'accepted' ? '#dcfce7' :
                  app.status === 'rejected' ? '#fee2e2' : '#fef9c3',
                  color: 
                  app.status === 'accepted' ? '#166534' :
                  app.status === 'rejected' ? '#991b1b' : '#854d0e',
                  /*
                  backgroundColor: app.status === 'pending' ? '#fef9c3' : '#dcfce7',
                  color: app.status === 'pending' ? '#854d0e' : '#166534', */
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  Status: {app.status || 'Applied'}
                </div>
                </div>
            ))}
            {/*{applications.map(job => (
              <div key={job._id} style={styles.card}>
                <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{job.title}</h3>
                <p style={{ margin: '0', color: '#64748b' }}>{job.location} | {job.salary}</p>
                <div style={{ marginTop: '15px', display: 'inline-block', padding: '5px 12px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>Status: Applied</div>
              </div>
            ))} */}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '15px' }}>
            <p style={{ color: '#64748b' }}>You haven't applied to any jobs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaidMyApplications;