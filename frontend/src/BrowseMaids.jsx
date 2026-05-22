import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './utils/api';
import { useAuth } from './context/AuthContext';
import './BrowseMaids.css';

const BrowseMaids = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [maids, setMaids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMaid, setSelectedMaid] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchMaids = async () => {
            try {
                setLoading(true);
                //  fetch only nearby maids based on client zone
                const res = await API.get('/auth/nearby-maids'); 
                
                if (res.data && res.data.status === "Success") {
                    setMaids(res.data.data);
                } else if (Array.isArray(res.data)) {
                     // Fallback for old structure
                    const approvedOnly = res.data.filter(m => 
                        m.status && m.status.toLowerCase() === 'approved'
                    );
                    setMaids(approvedOnly);
                }
            } catch (err) {
                console.error("Backend connection error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMaids();
    }, []);

    //  let's Hire your preferred maid 
    const handleHireSubmit = async (maidId) => {
        const serviceDate = prompt("Enter Service Date (YYYY-MM-DD):");
        const address = prompt("Enter your full address:");
        const amount = prompt("Enter Salary Offered:");

        if (!serviceDate || !address || !amount) {
            return alert("All fields are required to send a request!");
        }

        try {
            const res = await API.post('/bookings/new', {
                maidId: maidId,
                serviceDate: serviceDate,
                address: address,
                totalAmount: Number(amount)
            });

            if (res.data.status === "Success") {
                alert("Hiring request sent successfully!");
                setShowModal(false);
            }
        } catch (err) {
            console.error("Hire Error:", err);
            alert(err.response?.data?.message || "Failed to send request.");
        }
    };

    const filteredMaids = maids.filter(maid =>
        maid.name && maid.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bm-dashboard-container">
            <aside className="bm-sidebar">
                <h2 className="bm-logo-text" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>MaisonCare</h2>
                <nav className="bm-nav-links">
                    <div className="bm-nav-item" onClick={() => navigate('/client-dashboard')}>Dashboard</div>
                    <div className="bm-nav-item active">Browse Helpers</div>
                    <div className="bm-nav-item" onClick={() => navigate('/post-job')}>Post a Job</div>
                </nav>
               <span className="logout-text" onClick={logout}>
                Logout
               </span>
            </aside>

            <main className="bm-content">
                <header className="bm-top-bar">
                    <h1>Available Professionals (Near You)</h1>
                    <div className="bm-search-box">
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <section className="bm-grid">
                    {loading ? (
                        <div className="bm-status-msg">Fetching verified profiles in your area.</div>
                    ) : filteredMaids.length > 0 ? (
                        filteredMaids.map(maid => (
                            <div key={maid._id} className="bm-maid-card">
                                <div className="bm-card-img">
                                    <div className="bm-round-avatar">
                                        {maid.profileImage ? (
                                            <img src={`http://localhost:5000/${maid.profileImage}`} alt={maid.name} />
                                        ) : (
                                            <div className="bm-placeholder">{maid.name ? maid.name.charAt(0) : '?'}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="bm-card-info">
                                    <h3 className="maid-name-text">{maid.name}</h3>
                                    <p className="maid-meta-text">{maid.experience || 'Verified'} Experience</p>
                                    <p className="maid-meta-text">{maid.address || 'India'}</p>
                                    <button className="bm-view-profile" onClick={() => { setSelectedMaid(maid); setShowModal(true); }}>
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bm-no-data">No helpers found in your area.</div>
                    )}
                </section>
            </main>

            {showModal && selectedMaid && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-x" onClick={() => setShowModal(false)}>&times;</span>
                        <div className="modal-avatar-wrapper">
                            <img 
                                src={selectedMaid.profileImage ? `http://localhost:5000/${selectedMaid.profileImage}` : "/default-avatar.png"} 
                                alt={selectedMaid.name} 
                                className="modal-img-fixed"
                            />
                        </div>
                        <h2 className="modal-name-title">{selectedMaid.name}</h2>
                        <div className="modal-badge">Verified Partner</div>
                        <div className="modal-details-box">
                            <p><strong>Experience:</strong> <span>{selectedMaid.experience || 'Verified'}</span></p>
                            <p><strong>Skills:</strong> <span>{selectedMaid.skills?.join(', ') || 'General Help'}</span></p>
                            <p><strong>Location:</strong> <span>{selectedMaid.address || 'India'}</span></p>
                            <div className="modal-about-section">
                                <strong>About:</strong>
                                <p>{selectedMaid.about || "Verified By MaisonCare team."}</p>
                            </div>
                        </div>
                        <button className="modal-hire-btn" onClick={() => handleHireSubmit(selectedMaid._id)}>
                            Send Hiring Request
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseMaids;