// import { createContext, useEffect, useRef, useState } from "react";
// import { isTokenExpired, refreshAccessToken } from "../utils/auth";
// import { jwtDecode } from "jwt-decode";
// import { fetchDataFromApi, postData } from "../utils/api";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { clearCart } from "../features/cart/cartSlice";
// import { clearWishlistReducer } from "../features/wishList/wishListSlice";

// export const AuthContext = createContext(null);

// export const AuthContextProvider = ({ children }) => {
//   const dispatch = useDispatch();

//   const [isLogin, setIsLogin] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [resetPasswordToken, setResetPasswordToken] = useState(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   const refreshTimerRef = useRef(null);
//   const mountedRef = useRef(true);

//   const setAuthHeader = (token) => {
//     if (token) {
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common.Authorization;
//     }
//   };

//   const clearRefreshTimer = () => {
//     if (refreshTimerRef.current) {
//       clearTimeout(refreshTimerRef.current);
//       refreshTimerRef.current = null;
//     }
//   };

//   const logout = () => {
//     clearRefreshTimer();
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     setAuthHeader(null);
//     setIsLogin(false);
//     setUser(null);
//     dispatch(clearCart());
//     // dispatch(clearWishlistReducer());
//   };

//   const scheduleRefresh = (token) => {
//     try {
//       const { exp } = jwtDecode(token);
//       if (!exp) throw new Error("Invalid token: missing exp");

//       const msUntilRefresh = exp * 1000 - Date.now() - 30_000; // refresh 30s early
//       const delay = Math.max(msUntilRefresh, 5_000); // clamp to >= 5s

//       clearRefreshTimer();

//       refreshTimerRef.current = setTimeout(async () => {
//         try {
//           const newToken = await refreshAccessToken();
//           if (newToken) {
//             localStorage.setItem("accessToken", newToken);
//             setAuthHeader(newToken);
//             scheduleRefresh(newToken);
//           } else {
//             logout();
//           }
//         } catch {
//           logout();
//         }
//       }, delay);
//     } catch (e) {
//       console.error("scheduleRefresh error:", e);
//       logout();
//     }
//   };

//   const login = (token, userData) => {
//     clearRefreshTimer();
//     localStorage.setItem("accessToken", token);
//     // Optional: store user; or skip if you always refetch details
//     localStorage.setItem("user", JSON.stringify(userData));

//     setAuthHeader(token);
//     setIsLogin(true);
//     setUser(userData);
//     scheduleRefresh(token);
//   };

//   useEffect(() => {
//     mountedRef.current = true;

//     const initAuth = async () => {
//       setLoading(true);
//       try {
//         let token = localStorage.getItem("accessToken");

//         // If absent/expired, try refresh
//         if (!token || isTokenExpired(token)) {
//           try {
//             const res = await postData("/api/user/refresh-token");
//             token = res?.data?.accessToken;
//             if (!token) throw new Error("No accessToken in refresh response");
//             localStorage.setItem("accessToken", token);
//           } catch (err) {
//             logout();
//             return;
//           }
//         }

//         setAuthHeader(token);

//         // Fetch fresh user details
//         const res = await fetchDataFromApi("/api/user/user-details");
//         if (res?.success) {
//           if (!mountedRef.current) return;
//           setIsLogin(true);
//           setUser(res.data);
//           scheduleRefresh(token);
//         } else {
//           logout();
//         }
//       } catch (err) {
//         console.error("initAuth error:", err);
//         logout();
//       } finally {
//         if (mountedRef.current) {
//           setLoading(false);
//           setAuthChecked(true);
//         }
//       }
//     };

//     initAuth();

//     return () => {
//       mountedRef.current = false;
//       clearRefreshTimer();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLogin,
//         user,
//         setUser,
//         login,
//         logout,
//         resetPasswordToken,
//         setResetPasswordToken,
//         loading,
//         setLoading,
//         authChecked,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { createContext, useEffect, useRef, useState } from "react";
import { isTokenExpired, refreshAccessToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { fetchDataFromApi, postData } from "../utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const refreshTimerRef = useRef(null);
  const mountedRef = useRef(true);

  const log = (...args) => console.log("[AuthContext]", ...args);

  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  };

  const clearRefreshTimer = () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
      log("🕒 Cleared refresh timer");
    }
  };

  const logout = async() => {
   const res= await axios.post('/api/user/logout')
   console.log(res)
    clearRefreshTimer();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuthHeader(null);
    setIsLogin(false);
    setUser(null);
    dispatch(clearCart());
    // dispatch(clearWishlistReducer());
  };

  const scheduleRefresh = (token) => {
    try {
      const { exp } = jwtDecode(token);
      if (!exp) throw new Error("Invalid token: missing exp");

      const msUntilRefresh = exp * 1000 - Date.now() - 30_000; // refresh 30s early
      const delay = Math.max(msUntilRefresh, 5_000);


      clearRefreshTimer();

      refreshTimerRef.current = setTimeout(async () => {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            setAuthHeader(newToken);
            scheduleRefresh(newToken);
          } else {
            logout();
          }
        } catch (err) {
          logout();
        }
      }, delay);
    } catch (e) {
      logout();
    }
  };

  const login = (token, userData) => {
    clearRefreshTimer();
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setAuthHeader(token);
    setIsLogin(true);
    setUser(userData);
    scheduleRefresh(token);
  };

  useEffect(() => {
    mountedRef.current = true;

    const initAuth = async () => {
      setLoading(true);
      try {
        let token = localStorage.getItem("accessToken");

        // If absent/expired, try refresh
        if (!token || isTokenExpired(token)) {
          try {
            const res = await postData("/api/user/refresh-token");
            token = res?.data?.accessToken;

            if (!token) throw new Error("No accessToken in refresh response");
            localStorage.setItem("accessToken", token);
          } catch (err) {
            logout();
            return;
          }
        }

        setAuthHeader(token);

        // Fetch fresh user details
        const res = await fetchDataFromApi("/api/user/user-details");

        if (res?.success) {
          if (!mountedRef.current) {
            return;
          }
          setIsLogin(true);
          setUser(res.data);
          scheduleRefresh(token);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        if (mountedRef.current) {
          setLoading(false);
          setAuthChecked(true);
        }
      }
    };

    initAuth();

    return () => {
      mountedRef.current = false;
      clearRefreshTimer();
    };
  }, []);

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
