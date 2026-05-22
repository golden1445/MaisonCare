import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

//  Importing all pages
import Home from "./Home";
import ClientRegister from "./ClientRegister";
import ClientLogin from "./ClientLogin";
import ClientDashboard from "./ClientDashboard";
import PostJob from "./PostJob";
import BrowseMaids from "./BrowseMaids";
import MaidRegister from "./MaidRegister";
import MaidLogin from "./MaidLogin";
import MaidDashboard from "./MaidDashboard";
import MaidEditProfile from "./MaidEditProfile";
import MaidFindJobs from "./MaidFindJobs";
import MaidMyApplications from "./MaidMyApplications";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminVerify from "./AdminVerify"; 
import AdminUsers from "./AdminUsers";
import AdminJobs from "./AdminJobs";
import AdminAuditLog from "./AdminAuditLog";
import AdminSettings from "./AdminSettings"; 
import Contact from "./Contact";
import About from "./About";
import MaidMessages from "./MaidMessages";
import MaidSettings from "./MaidSettings";
import FAQ from "./FAQ";

import "./index.css";

//   PRIVATE ROUTE COMPONENT 
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Authenticating...</div>;
  }
  
  // if no user, redirect to home
  if (!user) {
    return <Navigate to="/" replace />; 
  }

  // Role is not matching,redirect to home
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    console.log("Role Mismatch: Expected", role, "but got", user.role);
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/register-client" element={<ClientRegister />} />
            <Route path="/login-client" element={<ClientLogin />} />
            <Route path="/register-maid" element={<MaidRegister />} />
            <Route path="/login-maid" element={<MaidLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            {/*<Route path="/maid-dashboard" element={<MaidDashboard />} />*/}
            <Route path="/faq" element={<FAQ />} />
            

            {/* Client Protected Routes */}
            <Route path="/client-dashboard" element={
              <PrivateRoute role="client"><ClientDashboard /></PrivateRoute>
            } />
            <Route path="/browse-maids" element={
  <PrivateRoute role="client"><BrowseMaids /></PrivateRoute>
} />
            <Route path="/post-job" element={
              <PrivateRoute role="client"><PostJob /></PrivateRoute>
            } />

            {/* Maid Protected Routes */}
            <Route path="/maid-dashboard" element={
              <PrivateRoute role="maid"><MaidDashboard /></PrivateRoute>
            } />
            <Route path="/maid-edit-profile" element={
              <PrivateRoute role="maid"><MaidEditProfile /></PrivateRoute>
            } />
            <Route path="/maid-find-jobs" element={
              <PrivateRoute role="maid"><MaidFindJobs /></PrivateRoute>
            } />
            <Route path="/maid-my-applications" element={
              <PrivateRoute role="maid"><MaidMyApplications /></PrivateRoute>
            } />
            <Route path="/maid-messages" element={
              <PrivateRoute role="maid"><MaidMessages /></PrivateRoute>
            } />
            <Route path="/maid-settings" element={
              <PrivateRoute role="maid"><MaidSettings /></PrivateRoute>
            } />

            {/* Admin protected routes*/}
            <Route path="/admin-dashboard" element={
              <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>
            } />
            <Route path="/admin-verify" element={
              <PrivateRoute role="admin"><AdminVerify /></PrivateRoute>
            } /> 
            <Route path="/admin-users" element={
              <PrivateRoute role="admin"><AdminUsers /></PrivateRoute>
            } />
            <Route path="/admin-jobs" element={
              <PrivateRoute role="admin"><AdminJobs /></PrivateRoute>
            } />
            <Route path="/admin-audit-log" element={
              <PrivateRoute role="admin"><AdminAuditLog /></PrivateRoute>
            } />
            <Route path="/admin-settings" element={
              <PrivateRoute role="admin"><AdminSettings /></PrivateRoute>
            } />

            {/*  No ProfileView route here */}
            <Route path="*" element={
              <div style={{padding: "100px", textAlign: "center"}}>
                <h1 style={{fontSize: "3rem", color: "#2563eb"}}>404</h1>
                <p>Oops! Lagta hai aap bhatak gaye hain.</p>
                <button 
                   style={{padding: "10px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px"}}
                   onClick={() => window.location.href="/"}>
                  Redirect to Home
                </button>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
