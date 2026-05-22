import React, { useState, useEffect } from 'react'; // useEffect added for data fetching
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';
import './AdminDashboard.css';
import API from './utils/api'; // API helper import 

const AdminUsers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]); // empty array in starting
  const [loading, setLoading] = useState(true);

  //  BACKEND logic to fetch users data 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get('/auth/all-users'); // API call to fetch all users from backend
        
        // formatting data to match frontend needs (id, type, date) and handling missing fields gracefully
        
        const formattedUsers = res.data.users.map(u => ({
          ...u,
          id: u._id, // mapped mongodb id to id for frontend use
          type: u.role.charAt(0).toUpperCase() + u.role.slice(1), 
          date: new Date(u.createdAt).toLocaleDateString('en-GB') // Readable Date
        }));
        
        setUsers(formattedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (id) => {
    
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'All' || user.type === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading Users Data...</div>;

  return (
    <div className="users-wrapper">
      {/* Sidebar  */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header" onClick={() => navigate('/admin-dashboard')} style={{cursor:'pointer'}}> Admin Panel</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-dashboard')}><span></span> Dashboard</div>
        <div className="admin-nav-item" onClick={() => navigate('/admin-verify')}><span></span> Verifications</div>
        <div className="admin-nav-item active"><span></span> All Users</div>
        <div className="admin-nav-item" style={{ marginTop: 'auto', color: '#f87171' }} onClick={() => navigate('/admin-login')}><span></span> Logout</div>
      </div>

      <div className="users-main">
        <header style={{marginBottom: '30px'}}>
          <h1 style={{fontSize: '28px', fontWeight: '800'}}>User Management</h1>
          <p style={{color: '#64748b'}}>Total Registered Users: {users.length}</p>
        </header>

        <div className="user-controls">
          <div className="filter-bar" style={{border: 'none', padding: 0}}>
            {['All', 'Maid', 'Client'].map(tab => (
              <button 
                key={tab}
                className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All' ? 'All Users' : tab + 's'}
              </button>
            ))}
          </div>
          
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by name or email..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Type</th>
              <th>Reg. Date</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td><strong>{user.name}</strong></td>
                <td style={{fontSize: '13px'}}>
                  {user.email}<br/>
                  <span style={{color: '#64748b'}}>{user.phone }</span>
                </td>
                <td><span className="admin-badge" style={{margin: 0}}>{user.type}</span></td>
                <td>{user.date}</td>
                <td>
                  <span className={user.status === 'Blocked' ? 'status-blocked' : 'status-active'}>
                    ● {user.status || 'Active'}
                  </span>
                </td>
                
                  
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;