import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context/AuthContext'; 

const MaidEditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, fetchUpdatedUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [skills, setSkills] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setExperience(user.experience || "");
      setPhone(user.phone || ""); 
      setSkills(user.skills || []);
      // Check if approved
      setIsVerified(user.status === "Approved" || user.status === "approved");
      if (user.profileImage) {
        setPreviewImage(`http://localhost:5000/${user.profileImage}`);
      }
    }
  }, [user]);

  const handleSkillChange = (skill) => {
    // if not verified, block skill changes and show alert
    if (!isVerified) return;

    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleUpdateProfile = async () => {
    //  if not verified, block all edits and show alert
    if (!isVerified) {
      alert("Your profile is not verified. Please wait for verification before making edits.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('experience', experience); 
      formData.append('skills', JSON.stringify(skills));
      
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }

      const res = await axios.put(
        'http://localhost:5000/api/auth/update-profile', 
        formData, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );

      if (res.data.status === "Success") {
        alert("Profile update ho gayi!");
        fetchUpdatedUser(); 
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Server Error"));
    }
  };

  const handleImageChange = (e) => {
    if (!isVerified) return; // Block image change if not verified
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const styles = {
    wrapper: { display: 'flex', minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', fontFamily: "'Inter', sans-serif" },
    sidebar: { width: '280px', background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', display: 'flex', flexDirection: 'column', padding: '30px 0', position: 'fixed', height: '100vh', zIndex: 100, boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)' },
    sidebarHeader: { padding: '0 25px 35px', background: 'linear-gradient(135deg, #075985 0%, #0a6e9e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '28px', fontWeight: '800', cursor: 'pointer' },
    navItem: (isActive) => ({ padding: '12px 25px', cursor: 'pointer', fontSize: '15px', color: isActive ? '#ffffff' : '#94a3b8', backgroundColor: isActive ? '#075985' : 'transparent', borderLeft: isActive ? '4px solid #075985' : '4px solid transparent', fontWeight: isActive ? '600' : '500' }),
    mainArea: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column', width: 'calc(100vw - 280px)' },
    mainContent: { padding: '40px 50px' },
    statusBanner: (isVerified) => ({ padding: '16px 24px', borderRadius: '16px', marginBottom: '30px', fontWeight: '700', backgroundColor: isVerified ? '#dcfce7' : '#fef9c3', color: isVerified ? '#166534' : '#854d0e', border: isVerified ? '1px solid #86efac' : '1px solid #fde047', fontSize: '15px' }),
    formCard: { backgroundColor: '#ffffff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(7, 89, 133, 0.1)' },
    sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#000000', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    avatarCircle: { width: '120px', height: '120px', borderRadius: '50%', border: '3px solid #075985', margin: '0 auto 5px', overflow: 'hidden', cursor: isVerified ? 'pointer' : 'not-allowed', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    editText: { color: isVerified ? '#075985' : '#94a3b8', fontSize: '14px', fontWeight: '700', cursor: isVerified ? 'pointer' : 'not-allowed', textDecoration: 'none' },
    
    // Update Button Style
    updateBtn: { 
      backgroundColor: isVerified ? '#075985' : '#94a3b8', 
      color: 'white', 
      border: 'none', 
      padding: '10px 24px', 
      borderRadius: '40px', 
      fontWeight: '600', 
      cursor: isVerified ? 'pointer' : 'not-allowed', 
      fontSize: '13px' 
    },
    
    input: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '15px', outline: 'none', color: '#000000', backgroundColor: isVerified ? '#ffffff' : '#f1f5f9' },
    
    // Phone & Name
    readOnlyInput: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '15px', outline: 'none', backgroundColor: '#f1f5f9', color: '#000000', cursor: 'not-allowed', fontWeight: '500' },
    
    skillTag: (isSelected) => ({ padding: '10px 20px', border: isSelected ? '1.5px solid #075985' : '1.5px solid #cbd5e1', borderRadius: '40px', backgroundColor: isSelected ? '#e0f2fe' : '#ffffff', color: '#000000', fontWeight: '600', fontSize: '14px', cursor: isVerified ? 'pointer' : 'not-allowed' }),
    divider: { border: '0', borderTop: '1px solid #e2e8f0', margin: '30px 0' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader} onClick={() => navigate('/maid-dashboard')}>MaisonCare</div>
        <div style={styles.navItem(false)} onClick={() => navigate('/maid-dashboard')}>Dashboard</div>
        <div style={styles.navItem(true)}>Edit Profile</div>
        <div style={{...styles.navItem(false), marginTop: 'auto', color: '#f87171'}} onClick={() => navigate('/')}>Logout</div>
      </div>

      <div style={styles.mainArea}>
        <div style={styles.mainContent}>
          <h1 style={{fontSize: '32px', fontWeight: '800', color: '#000000', marginBottom: '30px'}}>Edit Your Profile</h1>
          
          <div style={styles.statusBanner(isVerified)}>
            {isVerified ? "Verified" : " Pending: MaisonCare is reviewing your profile. Edits are disabled."}
          </div>

          <div style={styles.formCard}>
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
              <div style={styles.avatarCircle} onClick={() => isVerified && fileInputRef.current.click()}>
                {previewImage ? (
                  <img src={previewImage} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="Profile" />
                ) : (
                  <span style={{fontSize: '12px', fontWeight: 'bold', color: '#075985'}}>PHOTO</span>
                )}
              </div>
              <span style={styles.editText} onClick={() => isVerified && fileInputRef.current.click()}>
                {isVerified ? "Edit" : "Locked"}
              </span>
              <input type="file" ref={fileInputRef} hidden onChange={handleImageChange} accept="image/*" />
            </div>
             

            <hr style={styles.divider} />
            
            <div style={{marginBottom: '40px'}}>
              <div style={styles.sectionTitle}>
                Personal Details 
                <button style={styles.updateBtn} onClick={handleUpdateProfile}>Save Changes</button>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontWeight:'700', fontSize:'14px', color:'#000000'}}>Name</label>
                  <input style={styles.readOnlyInput} type="text" value={fullName} readOnly />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontWeight:'700', fontSize:'14px', color:'#000000'}}>Phone Number</label>
                  <input style={styles.readOnlyInput} type="text" value={phone} readOnly />
                </div>
                <div style={{gridColumn: 'span 2'}}>
                  <label style={{display:'block', marginBottom:'8px', fontWeight:'700', fontSize:'14px', color:'#000000'}}>Experience</label>
                  <input 
                    style={styles.input} 
                    type="text" 
                    placeholder={isVerified ? "Enter experience" : "Verification pending"}
                    value={experience} 
                    onChange={(e) => setExperience(e.target.value)} 
                    readOnly={!isVerified}
                  />
                </div>
              </div>
            </div>

            <div>
              <div style={styles.sectionTitle}>Skills & Services</div>
              <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
                {['Cooking', 'Cleaning', 'Baby Care', 'Elderly Care', 'Pet Care'].map(skill => (
                  <label key={skill} style={styles.skillTag(skills.includes(skill))} onClick={() => handleSkillChange(skill)}>
                    <input type="checkbox" checked={skills.includes(skill)} readOnly style={{marginRight:'10px'}}/>
                    <span style={{color: '#000000'}}>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaidEditProfile;