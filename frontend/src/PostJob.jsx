import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import API from './utils/api'; 
import './PostJob.css';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: [],
    jobType: 'Full-time',
    description: '',
    location: '',
    salary: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCategoryToggle = (cat) => {
  setFormData(prev => ({
    ...prev,
    category: prev.category.includes(cat)
      ? prev.category.filter(item => item !== cat) 
      : [...prev.category, cat] 
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('/jobs/post-job', {
        ...formData,
        title: `Need ${formData.category.join(", ")}`,
        status : 'open'
      });

      if (response.data.status === "Success" || response.status === 201) {
        alert(" Job Posted Successfully!");
        navigate('/client-dashboard'); 
      }
    } catch (error) {
      console.error("Post Job Error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-wrapper">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}>MaisonCare</div>
        <button className="back-btn" onClick={() => navigate('/client-dashboard')}>← Back to Dashboard</button>
      </nav>

      <div className="form-container">
        <div className="post-job-card">
          <div className="form-header">
            <h2>Post A New Job</h2>
            <p>Fill in the details to find the best help for your home.</p>
          </div>

          <form className="post-job-form" onSubmit={handleSubmit}>
            <div className="form-group">
  <label className="section-label">(Job Categories)</label>
  <div className="options-flex" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' , justifyContent: 'center'}}>
    {['Cleaning', 'Cooking', 'Nanny', 'Elderly Care'].map(cat => (
      <label key={cat} className="option-item" style={{ 
        cursor: 'pointer',
        padding: '8px 15px',
        borderRadius: '8px',
        border: formData.category.includes(cat) ? '2px solid #2563eb' : '1px solid #ddd',
        background: formData.category.includes(cat) ? '#eff6ff' : 'white'
      }}>
        <input 
          type="checkbox" 
          hidden // Checkbox chhupa do, label hi button ban jayega
          checked={formData.category.includes(cat)}
          onChange={() => handleCategoryToggle(cat)}
        />
        <span style={{ fontWeight: formData.category.includes(cat) ? '600' : '400' }}>{cat}</span>
      </label>
    ))}
  </div>
</div>
            {/*<div className="form-group">
              <label className="section-label">Job Title / Category</label>
              <select 
                className="form-input" 
                name="category" 
                onChange={handleChange} 
                required 
                value={formData.category}
              >
                <option value="" disabled>Select Category</option>
                <option value="Cleaning">Cleaning (Maid)</option>
                <option value="Nanny">Nanny</option>
                <option value="Cooking">Cook</option>
                <option value="Elderly Care">Elderly Care</option>
              </select>
            </div> */}

            <div className="form-group">
              <label className="section-label">(Job Type)</label>
              <div className="options-flex">
                <label className="option-item">
                  <input type="radio" name="jobType" value="Full-time" checked={formData.jobType === "Full-time"} onChange={handleChange} required />
                  <span>Full-time</span>
                </label>
                <label className="option-item">
                  <input type="radio" name="jobType" value="Part-time" checked={formData.jobType === "Part-time"} onChange={handleChange} required />
                  <span>Part-time</span>
                </label>
                <label className="option-item">
                  <input type="radio" name="jobType" value="Hourly" checked={formData.jobType === "Hourly"} onChange={handleChange} required />
                  <span>Hourly</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="section-label">(Job Description)</label>
              <textarea 
                className="form-input" 
                name="description" 
                placeholder="E.g. Need someone for deep cleaning, dusting, and mopping..." 
                rows="3" 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="section-label">Location / Area</label>
                <input 
                  className="form-input" 
                  name="location" 
                  type="text" 
                  placeholder="e.g. Model Town, Delhi" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="section-label">Salary Offered (₹)</label>
                <input 
                  className="form-input" 
                  name="salary" 
                  type="number"  min="0"
                  placeholder="Enter Amount" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="submit-job-btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish Job Post"}
            </button>
          </form>
        </div>
      </div>
      <footer className="footer">© 2026 MaisonCare Premium Services</footer>
    </div>
  );
};

export default PostJob;