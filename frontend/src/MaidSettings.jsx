import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MaidSettings = () => {
  const navigate = useNavigate();
  
  // State for form fields
  const [settings, setSettings] = useState({
    fullName: "Sunita Devi",
    email: "sunita.devi@email.com",
    phone: "+91 98765 43210",
    experience: "5 Years",
    serviceType: "Full-time Maid",
    availability: "Available"
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile Settings Updated Successfully!");
  };

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background-color: #f8fafc;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          .settings-full-screen {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
          }

          /*  NAVBAR  */
          .settings-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40px;
            height: 70px;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            flex-shrink: 0;
          }

          .settings-logo { 
            font-size: 1.5rem; 
            font-weight: 800; 
            color: #2563eb; 
            cursor: pointer; 
          }

          .back-dash-btn {
            background: #000;
            color: #ffffff !important;
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
          }

          /*  MAIN CONTENT  */
          .settings-body {
            flex: 1;
            display: flex;
            justify-content: center;
            padding: 40px;
            overflow-y: auto;
          }

          .settings-card {
            width: 100%;
            max-width: 800px;
            background: white;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            height: fit-content;
          }

          .settings-header {
            margin-bottom: 30px;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 20px;
          }

          .settings-header h2 {
            margin: 0;
            font-size: 1.8rem;
            color: #000;
          }

          .settings-header p {
            color: #64748b;
            margin-top: 5px;
          }

          /*  FORM GROUPS  */
          .settings-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .form-group label {
            font-weight: 700;
            font-size: 0.9rem;
            color: #334155;
          }

          .form-group input, .form-group select {
            padding: 12px 16px;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            font-size: 1rem;
            background: #fcfdfe;
            outline: none;
            transition: 0.3s;
          }

          .form-group input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          }

          .full-span {
            grid-column: span 2;
          }

          /*  BUTTONS */
          .action-buttons {
            margin-top: 40px;
            display: flex;
            gap: 15px;
          }

          .save-btn {
            background: #2563eb;
            color: white;
            padding: 14px 30px;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            flex: 1;
          }

          .cancel-btn {
            background: #f1f5f9;
            color: #64748b;
            padding: 14px 30px;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
          }

          .danger-zone {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px dashed #e2e8f0;
          }

          .delete-acc {
            color: #ef4444;
            background: none;
            border: none;
            font-weight: 700;
            cursor: pointer;
            padding: 0;
            font-size: 0.9rem;
          }

          @media (max-width: 768px) {
            .settings-grid { grid-template-columns: 1fr; }
            .full-span { grid-column: span 1; }
          }
        `}
      </style>

      <div className="settings-full-screen">
        {/* Navbar */}
        <nav className="settings-nav">
          <div className="settings-logo" onClick={() => navigate('/')}>MaisonCare</div>
          <button className="back-dash-btn" onClick={() => navigate('/maid-dashboard')}>
            Back to Dashboard
          </button>
        </nav>

        {/* Settings Form Body */}
        <div className="settings-body">
          <div className="settings-card">
            <div className="settings-header">
              <h2>Account Settings</h2>
              <p>Yahan se aap apni profile aur kaam ki details badal sakte hain.</p>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="settings-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label>Aapka Poora Naam</label>
                  <input 
                    type="text" 
                    value={settings.fullName} 
                    onChange={(e) => setSettings({...settings, fullName: e.target.value})}
                  />
                </div>

                {/* Experience */}
                <div className="form-group">
                  <label>Kitne saal ka Experience hai?</label>
                  <input 
                    type="text" 
                    value={settings.experience} 
                    onChange={(e) => setSettings({...settings, experience: e.target.value})}
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={settings.phone} 
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  />
                </div>

                {/* Availability */}
                <div className="form-group">
                  <label>Kaam ke liye Status</label>
                  <select 
                    value={settings.availability}
                    onChange={(e) => setSettings({...settings, availability: e.target.value})}
                  >
                    <option value="Available">Available (Kaam ke liye taiyar)</option>
                    <option value="Busy">Busy (Abhi kaam nahi chahiye)</option>
                  </select>
                </div>

                {/* Service Type */}
                <div className="form-group full-span">
                  <label>Service Category</label>
                  <select 
                    value={settings.serviceType}
                    onChange={(e) => setSettings({...settings, serviceType: e.target.value})}
                  >
                    <option value="Full-time Maid">Full-time Maid</option>
                    <option value="Part-time Cook">Part-time Cook</option>
                    <option value="Baby Sitter / Nanny">Baby Sitter / Nanny</option>
                  </select>
                </div>

                {/* Email Disabled for safety */}
                <div className="form-group full-span">
                  <label>Email Address (Cannot be changed)</label>
                  <input type="email" value={settings.email} disabled style={{background: '#f1f5f9', cursor: 'not-allowed'}} />
                </div>
              </div>

              <div className="action-buttons">
                <button type="submit" className="save-btn">Update Settings</button>
                <button type="button" className="cancel-btn" onClick={() => navigate('/maid-dashboard')}>Cancel</button>
              </div>
            </form>

            <div className="danger-zone">

              <button className="delete-acc">Delete Account?</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaidSettings;