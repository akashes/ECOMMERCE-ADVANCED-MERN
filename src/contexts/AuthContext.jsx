import { createContext, useEffect, useState } from "react";
import { isTokenExpired, refreshAccessToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext()
let refreshTimer;
export const AuthContextProvider  = ({children})=>{
    const[isLogin,setIsLogin]=useState(false)
    const[user,setUser]=useState(null)
    console.log('isLogin',isLogin)

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
    
    const userInfo = localStorage.getItem('user');
    if (token && userInfo && !isTokenExpired(token)) {
      setIsLogin(true);
      setUser(JSON.parse(userInfo));
      scheduleRefresh(token)
    }else{
      logout()
    }

    return()=>refreshTimer && clearTimeout(refreshTimer)
  }, []);
    return(
        <AuthContext.Provider value={{isLogin,user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}