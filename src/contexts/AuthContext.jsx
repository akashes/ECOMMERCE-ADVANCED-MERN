import { createContext, useEffect, useState } from "react";
import { isTokenExpired, refreshAccessToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { fetchDataFromApi, postData } from "../utils/api";
import axios from "axios";
export const AuthContext = createContext()
let refreshTimer;
export const AuthContextProvider  = ({children})=>{
    const[isLogin,setIsLogin]=useState(false)
    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(false)
    const[resetPasswordToken,setResetPasswordToken]=useState(null)
    const[authChecked,setAuthChecked]=useState(false)

     const logout=()=>{
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setIsLogin(false)
      setUser(null)
      if(refreshTimer){
        clearTimeout(refreshTimer)
      }
    }

    const scheduleRefresh=(token)=>{
      const {exp}=jwtDecode(token)
      if(!exp) throw new Error('Invalid token')
      console.log('expiry',exp)
      const refreshTime = (exp*1000)-Date.now()-30*1000 //30 seconds before expiry
      
      console.log('refresh time',refreshTime)
      refreshTimer=setTimeout(async()=>{
        const newToken = await refreshAccessToken()
        if(newToken){
          console.log('new token got from refresh',newToken)
          localStorage.setItem('accessToken',newToken)
          scheduleRefresh(newToken)
        }else{
          logout()
        }
      },refreshTime)
    }

    const login=(token,userData)=>{
      if(refreshTimer) clearTimeout(refreshTimer)
      localStorage.setItem('accessToken',token)
      localStorage.setItem('user',JSON.stringify(userData))
      setIsLogin(true)
      setUser(userData)
      scheduleRefresh(token)

    }

   


      useEffect(() => {
    const token = localStorage.getItem('accessToken');
    //trying  to login user if token is present
    const tryRefreshAndLoadUser = async () => {
    setLoading(true);

    let validToken = token;

    // If no token or expired, try to refresh
    if (!token || isTokenExpired(token)) {
      try {
        const result = await postData('/api/user/refresh-token'); // should hit /refresh and get new access token
        console.log(result)
        let newAccessToken = result.data.accessToken;
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          validToken = newAccessToken;
        } else {
          throw new Error("Refresh failed");
        }
      } catch (err) {
        logout();
        setLoading(false);
        setAuthChecked(true);
        return;
      }
    }
  }





    //get userdetails on refresh if token is valid
    if(token && !isTokenExpired(token)){
        setLoading(true)
       fetchDataFromApi('/api/user/user-details')
       .then((res)=>{

        if(res.success){
          setIsLogin(true)
          setUser(res.data) //fresh server data
          scheduleRefresh(token)
        }
      
       })
       .catch(()=>{
        logout()
       })
       .finally(()=>{
        setLoading(false)
        setAuthChecked(true)
       })
    }else{
      //absence or expired token
      logout()
      setLoading(false)
      setAuthChecked(true)

    }
      tryRefreshAndLoadUser();

    // const userInfo = localStorage.getItem('user');
    // if (token && userInfo && !isTokenExpired(token)) {
    //   setIsLogin(true);
    //   setUser(JSON.parse(userInfo));
    //   scheduleRefresh(token)
    // }else{
    //   logout()
    // }

    return()=>refreshTimer && clearTimeout(refreshTimer)
  }, []);
console.log(user)
    return(
        <AuthContext.Provider value={{isLogin,user,setUser,login,logout,resetPasswordToken,setResetPasswordToken,loading,setLoading,authChecked}}>
            {children}
        </AuthContext.Provider>
    )

}