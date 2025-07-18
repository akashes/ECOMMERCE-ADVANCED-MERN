import React, {  useState } from 'react'
import  TextField  from '@mui/material/TextField'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import  Button  from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';



const ForgotPassword = () => {
    const[showPassword,setShowPassword]=React.useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=React.useState(false)


  return (
    <section className='section py-10'>
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <h3 className="text-center text-[18px] text-black flex items-baseline justify-center gap-2">
                    <img src="/fp1.png" alt="" width={30} />
                    Forgot Password</h3>
                <form action="" className='w-full mt-5'>





                    {/* password input */}
                    <div className="form-group w-full mb-5 relative">

                        <TextField 
                        className='input-ele w-full' id="password" label="New Password" variant="outlined" name='password' 
                        type={showPassword?'text':'password'}/>
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
                        <Button className='!w-full  btn-org btn-lg'>
                            Change Password
                        </Button>
                      
                    </div>
                    
                 
                         

                </form>

            </div>
        </div>

    </section>
  )
}

export default ForgotPassword
