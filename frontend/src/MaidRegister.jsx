import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './utils/api';
import bgImage from './assets/vecteezy_asian.jpg';

const MaidRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [otpSent, setOtpSent] = useState(false);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [inputOtp, setInputOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '',
    address: '',
    pincode: '',
    phone: '', 
    skills: [],
    profileImage: null,
    aadharNumber: '',
    panCard: null,
    policeVerification: null,
  });


  const styles = {
    wrapper: { width: '100vw', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', Roboto, sans-serif", margin: 0, padding: 0, color: '#1e293b' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10%', height: '80px', backgroundColor: 'rgba(255, 255, 255, 0.2)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    container: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' },
    card: { backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '100%', maxWidth: '500px', borderRadius: '20px', padding: '30px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', textAlign: 'center' },
    avatarCircle: { width: '140px', height: '140px', borderRadius: '50%', border: '2px dashed #cbd5e1', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', cursor: 'pointer', overflow: 'hidden' },
    input: { width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', outlineColor: '#2563eb', boxSizing: 'border-box' },
    label: { display: 'block', textAlign: 'left', fontWeight: '600', marginBottom: '8px', color: '#334155' },
    btnNext: { flex: 1, padding: '16px', backgroundColor: '#075985', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
    btnBack: { flex: 1, padding: '16px', borderRadius: '12px', border: '2px solid #cbd5e1', backgroundColor: '#e2e8f0', color: '#1e293b', fontWeight: '700', cursor: 'pointer' },
    buttonGroup: { display: 'flex', gap: '12px', marginTop: '20px' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone'|| name === 'pincode' || name === 'aadharNumber') {
      if (!/^\d*$/.test(value)) return;
    

    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const fieldName = e.target.name;
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [fieldName]: file });
      if (fieldName === 'profileImage') setPreviewImage(URL.createObjectURL(file));
    }
  };
const handleNext = () => {
  if (step === 1) {
    const { name, email, password, phone, pincode } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!previewImage) return alert("Please upload a Profile Photo!");
    if (!name || !email || !password || !phone || !pincode) return alert("All fields are required!");
    if (!emailRegex.test(email)) return alert("Please enter a valid email!");
    if (password.length < 6) return alert("Password must be at least 6 characters!");
    if (phone.length !== 10) return alert("Phone must be 10 digits!");
    if (pincode.length !== 6) return alert("Pincode must be 6 digits!");
  }
  
  if (step === 2 && formData.skills.length === 0) {
    return alert("Please select at least one skill!");
  }

  setStep(step + 1);
};

  const sendAadharOtp = () => {
    if (formData.aadharNumber.length !== 12) return alert("Please enter a valid 12-digit Aadhaar Number");
    setLoading(true);
    setTimeout(() => {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setLoading(false);
      setOtpSent(true);
      alert(` OTP for Aadhaar Verification is ${newOtp}`);
    }, 1000);
  };

  const verifyAadharOtp = () => {
    if (inputOtp === generatedOtp) {
      setIsAadhaarVerified(true);
      alert("Aadhaar Verified Successfully!");
    } else {
      alert(`Invalid OTP! Use ${generatedOtp} for testing.`);
    }
  };

  const handleSubmit = async () => {
    if (!formData.panCard || !formData.policeVerification) {
      return alert("Please upload both PAN Card and Police Verification!");
    }

    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('experience', formData.experience);
    data.append('address', formData.address);
    data.append('pincode', formData.pincode);
    data.append('phone', formData.phone);
    data.append('aadharNumber', formData.aadharNumber);
    data.append('registrationID', generatedOtp);
    data.append('role', 'maid');

    formData.skills.forEach(skill => data.append('skills', skill));
    if (formData.profileImage) data.append('profileImage', formData.profileImage);
    if (formData.panCard) data.append('panCard', formData.panCard);
    if (formData.policeVerification) data.append('policeVerification', formData.policeVerification);

    try {
      const res = await API.post('/auth/register-maid', data);
      if (res.data.status === "Success") {
        alert(`Registration Successful! Your ID: ${generatedOtp}. Please login.`);
        navigate('/login-maid');
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#075985', cursor: 'pointer' }} onClick={() => navigate('/')}>MaisonCare</div>
        <button style={{backgroundColor: '#075985', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer'}} onClick={() => navigate('/')}>Home</button>
      </nav>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Create Profile</h1>
          <p style={{ color: '#64748b', marginBottom: '40px' }}>Step {step} of 4</p>

          {step === 1 && (
            <div>
              <div style={styles.avatarCircle} onClick={() => fileInputRef.current.click()}>
                {previewImage ? <img src={previewImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" /> : <span style={{ fontSize: '18px', color: '#94a3b8' }}>+ Photo</span>}
              </div>
              <input type="file" name="profileImage" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
              <div style={{ textAlign: 'left' }}>
                <label style={styles.label}>Full Name</label>
                <input name="name" style={styles.input} value={formData.name} onChange={handleInputChange} placeholder="e.g. Sunita Devi" />
                <label style={styles.label}>Email</label>
                <input name="email" style={styles.input} value={formData.email} onChange={handleInputChange} placeholder="email@gmail.com" />
                <label style={styles.label}>Password</label>
                <input name="password" type="password" style={styles.input} value={formData.password} onChange={handleInputChange} placeholder="Min 6 characters" />
                <label style={styles.label}>Experience</label>
                <input name="experience" style={styles.input} value={formData.experience} onChange={handleInputChange} placeholder="Years of work" />
                <label style={styles.label}>Address</label>
                <input name="address" style={styles.input} value={formData.address} onChange={handleInputChange} placeholder="Full address" />
                <label style={styles.label}>Pincode</label>
                <input type="text" name="pincode" style={styles.input} value={formData.pincode} onChange={handleInputChange} maxLength="6" placeholder="6-digit Pincode" required />
                <label style={styles.label}>Phone Number</label>
                <input type="text" name="phone" style={styles.input} value={formData.phone} onChange={handleInputChange} maxLength="10" placeholder="10-digit Phone Number" required />
              </div>
              {/*<button style={{ ...styles.btnNext, width: '100%' }} onClick={() => setStep(2)}>Next</button>*/}
              <button style={{ ...styles.btnNext, width: '100%' }} onClick={handleNext}>Next</button>
              
              {/* Login Link  Corrected placement & styling */}
              <div style={{ textAlign: 'right', marginTop: '12px', width: '100%' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Already registered? </span>
                <span onClick={() => navigate('/login-maid')} style={{ color: '#075985', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}>Login here</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Your Skills</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {['Cooking', 'Cleaning', 'Nanny', 'Elderly Care'].map(s => (
                  <label key={s} style={{ padding: '16px', border: formData.skills.includes(s) ? '2px solid #075985' : '1.5px solid #e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', backgroundColor: formData.skills.includes(s) ? '#eff6ff' : 'transparent' }}>
                    <input type="checkbox" checked={formData.skills.includes(s)} onChange={() => {
                        const updated = formData.skills.includes(s) ? formData.skills.filter(i => i !== s) : [...formData.skills, s];
                        setFormData({ ...formData, skills: updated });
                    }} />
                    <span style={{ fontWeight: '500' }}>{s}</span>
                  </label>
                ))}
              </div>
              <div style={styles.buttonGroup}>
                <button style={styles.btnBack} onClick={() => setStep(1)}>BACK</button>
                <button style={styles.btnNext} onClick={handleNext}>Next</button>
                {/*<button style={styles.btnNext} onClick={() => setStep(3)}>Next</button>*/}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Aadhaar Verification</h2>
              <div style={{ textAlign: 'left' }}>
                <label style={styles.label}>Aadhaar Number</label>
                <input name="aadharNumber" maxLength="12" style={styles.input} value={formData.aadharNumber} onChange={handleInputChange} placeholder="1234 5678 9012" disabled={isAadhaarVerified} />
                {otpSent && !isAadhaarVerified && (
                  <>
                    <label style={styles.label}>Enter OTP</label>
                    <input style={styles.input} placeholder="6 digit OTP" onChange={(e) => setInputOtp(e.target.value)} />
                    <button style={{ ...styles.btnNext, width: '100%', marginBottom: '20px' }} onClick={verifyAadharOtp}>Verify OTP</button>
                  </>
                )}
                {!otpSent && (
                  <button style={{ ...styles.btnNext, width: '100%', marginBottom: '20px' }} onClick={sendAadharOtp}>{loading ? "Sending..." : "Send Verification OTP"}</button>
                )}
                {isAadhaarVerified && <p style={{ color: '#075985', fontWeight: 'bold', textAlign: 'center' }}>Aadhaar Verified Successfully</p>}
              </div>
              <div style={styles.buttonGroup}>
                <button style={styles.btnBack} onClick={() => setStep(2)}>BACK</button>
                <button style={styles.btnNext} disabled={!isAadhaarVerified} onClick={() => setStep(4)}>Next</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Document Upload</h2>
              <div style={{ textAlign: 'left' }}>
                <label style={styles.label}>PAN Card Photo</label>
                <input type="file" name="panCard" style={styles.input} onChange={handleFileChange} accept="image/*" />
                <label style={styles.label}>Police Verification (PDF)</label>
                <input type="file" name="policeVerification" style={styles.input} onChange={handleFileChange} accept=".pdf" />
              </div>
              <div style={styles.buttonGroup}>
                <button style={styles.btnBack} onClick={() => setStep(3)}>BACK</button>
                <button style={{ ...styles.btnNext }} onClick={handleSubmit} disabled={loading}>{loading ? "Registering..." : "FINISH"}</button>
              </div>
            </div>
          )}
        </div>
      </div> 
      
    </div> 
  );
};

export default MaidRegister;