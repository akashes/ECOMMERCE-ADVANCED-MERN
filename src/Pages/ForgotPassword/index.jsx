import React, {  useContext, useState } from 'react'
import  TextField  from '@mui/material/TextField'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import  Button  from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import {  putData } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';



const ResetPassword = () => {
    const authContext = useContext(AuthContext)
    const resetToken = authContext.resetPasswordToken
    const[loading,setLoading]=useState(false)
    const[showPassword,setShowPassword]=React.useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=React.useState(false)

    const[password,setPassword]=React.useState('')
    const[confirmPassword,setConfirmPassword]=React.useState('')
    const navigate=useNavigate()
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!password || !confirmPassword){
            showWarning('Please fill all the fields')
            return
        }
        if(password.length<6 && confirmPassword.length<6){
            showWarning('Password must be at least 6 characters long')
            return
        }
        if(password!==confirmPassword){
            showWarning('Passwords do not match')
            return
        }
        if(!resetToken){
            showWarning('Reset token not found')
            return
        }
        const result= await putData('/api/user/reset-password', {newPassword:password,confirmPassword,resetToken})
        if(!result.success){
            showError(result.message || 'Something went wrong')
            return
        }
        //success
        authContext.setResetPasswordToken(null)
        showSuccess(result.message || 'Password reset successful')
        navigate('/login',{replace:true})
    }

  return (
    <section className='section py-5 lg:py-10'>
        <div className="container">
            <div className="card shadow-md w-full lg:w-[400px] m-auto rounded-md bg-white p-5 px-5 lg:px-10">
                <h3 className="text-center text-[18px] text-black flex items-baseline justify-center gap-2">
                    <img src="/fp1.png" alt="" width={30} />
                    Reset Password</h3>
                <form onSubmit={handleSubmit} className='w-full mt-5'>





                    {/* password input */}
                    <div className="form-group w-full mb-5 relative">

                        <TextField 
                        className='input-ele w-full' id="password" label="New Password" variant="outlined" name='password' 
                        type={showPassword?'text':'password'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
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






                   {/* confirm password input */}
                    <div className="form-group w-full mb-5 relative">

                <TextField 
                className='w-full input-ele' id="confirm-password" label="Confirm Password" variant="outlined" name='confirm-password' 
                type={showConfirmPassword?'text':'password'}
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                    <Button type='button' className='!absolute right-3 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {
                            showConfirmPassword ?
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
                 <div className="flex items-center w-full mt-3 mb-3">
                        <Button disabled={loading} type='submit' className='!w-full  btn-org lg:btn-lg'>
                            {loading ? <CircularProgress size={25} className='!text-white' /> : 'Reset Password'}
                        </Button>
                      
                    </div>
                    
                 
                         

                </form>

            </div>
        </div>

    </section>
  )
}

export default ResetPassword
