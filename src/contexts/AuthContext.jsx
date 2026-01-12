import { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  // Kept if you use it for password reset flows
  const [resetPasswordToken, setResetPasswordToken] = useState(null); 

  // Helper to sync axios headers
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  };

  const login = (token, userData) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setAuthHeader(token);
    setIsLogin(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post('/api/user/logout');
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setAuthHeader(null);
      setIsLogin(false);
      setUser(null);
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      // 1. If no token, we are definitely logged out
      if (!token) {
        setLoading(false);
        setAuthChecked(true);
        return;
      }

      // 2. We have a token. Let's try to get user details.
      // We rely on the AXIOS INTERCEPTOR to handle 401 (expiry) automatically.
      try {
        setAuthHeader(token); // Set header before request
        
        const res = await fetchDataFromApi("/api/user/user-details");

        if (res?.success) {
          setIsLogin(true);
          setUser(res.data);
        } else {
          // If API returns success:false (but not 401), force logout
          logout();
        }
      } catch (err) {
        // Interceptor handles 401. If we get here, it's a real error (500, network, etc.)
        logout();
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    initAuth();
  }, []); // Run once on mount

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        setUser,
        login,
        logout,
        resetPasswordToken,
        setResetPasswordToken,
        loading,
        setLoading,
        authChecked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};