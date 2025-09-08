import React, {  useEffect, useState } from 'react'
import  TextField  from '@mui/material/TextField'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import  Button  from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import {  AuthContext } from '../../contexts/AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";

const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})


const Login = () => {
    const authContext = useContext(AuthContext)
    const[isLoading,setIsLoading]=useState(false)
    const[showPassword,setShowPassword]=useState(false)
    const[forgotPasswordMode,setForgotPasswordMode]=useState(false)
    
     const [formFields, setFormFields] = useState({
       email: '',
       password: '',
     })
     const navigate = useNavigate()
     //forgot password
    const forgotPassword=async(e)=>{
        e.preventDefault()
        const email = formFields.email.trim()

        // check if empty
        if(email===''){
            showWarning('Please enter the email id to reset password')

            return;
        }

        //regex setup 
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!emailRegex.test(email)){
            showWarning('Please enter an email address')
            return
         }
         //valid email
         localStorage.setItem('verifyEmail',email)
         setForgotPasswordMode(true)
        const result = await postData('/api/user/forgot-password', {email})
        console.log(result)
        if(!result.success){
            setForgotPasswordMode(false)
            showError(result.message || `couldn't send password reset OTP to ${email}`)
            return
        }

        setForgotPasswordMode(false)
         navigate('/verify-reset-password')
         showSuccess(`Password reset OTP has been sent to ${email}`)
      
       
    }

    //login
    const handleSubmit=async(e)=>{
        e.preventDefault()

        //input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = formFields.email.trim();
        if(!emailRegex.test(email)){
            showWarning('Please enter a valid email address')
            return
        }
        if(!formFields.password){
            showWarning('Please enter a password')
            return
        }
        if(formFields.password.length<6){
            showWarning('Password must be at least 6 characters long')
            return
        }

        setIsLoading(true)
        const result = await postData('/api/user/login',formFields)
        setIsLoading(false)
        if(!result.success){
            showError(result.message || 'Login failed')
            return
        }
        //login success
        localStorage.setItem('accessToken',result.data.accessToken)
        // localStorage.setItem('refreshToken',result.data.refreshToken)
        showSuccess(result.message || 'Login successful')
        authContext.login(result.data.accessToken,result.data.user)
        navigate('/')
    }

      const authWithGoogle=async()=>{
        signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        const fields = {
          name:user.providerData[0].displayName,
          email:user.providerData[0].email,
          password:null,
          avatar:user.providerData[0].photoURL,
          mobile:user.providerData[0].phoneNumber,
          
        }
        console.log(fields)
           setIsLoading(true)
        const res = await postData('/api/user/google-auth', fields)
        console.log(res)
        setIsLoading(false)
        if(!res.success){
            showError(res.message || 'Registration failed')
            return
        }
    
    
        //Registration success
        //setting email to local storage
        localStorage.setItem('verifyEmail',fields.email)
               localStorage.setItem('accessToken',res.data.accessToken)
                // localStorage.setItem('refreshToken',result.data.refreshToken)
                authContext.login(res.data.accessToken,res.data.user)
    
        showSuccess(res.message || 'Login successful',3000)
        navigate('/')
      
    
        
    
      }).catch((error) => {
        console.log(error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    
      }


        useEffect(()=>{
            window.scrollTo({ top: 0, behavior: "smooth" });
      
      
        },[])
  return (
    <section className='section py-5 sm:py-8 lg:py-10'>
        <div className="container">
            <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-5 sm:px-10">
                <h3 className="text-center text-[18px] text-black">Login to your account</h3>
                <form className='w-full mt-5' onSubmit={handleSubmit} >
                    {/* email input */}
                    <div className="form-group w-full mb-5">

                <TextField className='w-full input-ele' id="email" label="Email Id" variant="outlined" type='email' name='email'
                value={formFields.email}
                onChange={(e)=>setFormFields({...formFields,email:e.target.value})} />
                    </div>
                   {/* password input */}
                    <div className="form-group w-full mb-5 relative">

                <TextField className='w-full input-ele' id="password" label="Password" variant="outlined" name='password' 
                type={showPassword?'text':'password'}
                value={formFields.password}
                onChange={(e)=>setFormFields({...formFields,password:e.target.value})}
                />
                    <Button type='button' className='!absolute right-3 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowPassword(!showPassword)}
                    >
                        {
                            showPassword ?
                            (
                             <IoEye className=' text-[20px]' />

                            )
                            :
                            (
                            <IoMdEyeOff className=' text-[20px]' />

                            )
                        }

                    </Button>
                  
                    
                    
                    </div>
                    <Button disabled={forgotPasswordMode}  className={`!capitalize !text-gray-600 link cursor-pointer text-[14px] font-[600] hover:!text-primary ${forgotPasswordMode && 'opacity-70 !text-gray-600 cursor-not-allowed'}`} onClick={ !forgotPasswordMode && forgotPassword}>Forgot Password?</Button>
                    <div className="flex items-center w-full mt-3 mb-3">
                        <Button disabled={isLoading} type='submit' className={`!w-full  btn-org btn-lg ${isLoading && 'opacity-90 cursor-not-allowed'} `}>
                            {isLoading?<CircularProgress size={20} color='inherit'/>:'Login'}
                        </Button>
                      
                    </div>
                        <p className='text-center'>Not Registered? 
                            <Link to='/register' className='link text-[14px] font-[600] text-primary'> Sign Up</Link>
                            </p>
                        <p className="text-center font-[500]">Or continue with social account</p>
                        <Button onClick={authWithGoogle} className=' w-full  !bg-[#f1f1f1] !text-black  flex gap-3  '>
                            <FcGoogle className='text-[20px]'/>
                            Login with Google
                        </Button>

                </form>

            </div>
        </div>

    </section>
  )
}

export default Login
