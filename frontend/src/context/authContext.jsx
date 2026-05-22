import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fn to get data from backend
  const fetchUpdatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch (e) {
        console.error("Error refreshing user data", e);
      }
    }
  };
    useEffect(() => {
      const initializeAuth = async () => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
           if (token && savedUser && savedUser !== "undefined"){
            try {
              setUser(JSON.parse(savedUser));
              await fetchUpdatedUser(); // data is checking in background
            } catch (e) {
              console.error("Auth initialization errror", e);
              localStorage.clear();

            }
            }
            setLoading(false);
          };
      initializeAuth();
      } ,
    []);
  {/* useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Localstorage parse error", e);
        localStorage.removeItem("user");
      }
    }
    fetchUpdatedUser(); // Check fresh status on load
    setLoading(false);
  }, []); */}

  const login = (userData, token) => {
    if (!userData || !token) return;
    const userWithToken = { ...userData, token };
    localStorage.setItem("user", JSON.stringify(userWithToken));
    localStorage.setItem("token", token);
    localStorage.setItem("role", userData.role || 'user'); 
    setUser(userWithToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, fetchUpdatedUser }}>
      {!loading && children}
    </AuthContext.Provider>

  );
};


export const useAuth = () => useContext(AuthContext);