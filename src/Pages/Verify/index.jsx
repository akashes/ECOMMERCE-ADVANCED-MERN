import React,{useEffect, useState} from 'react'
import  TextField  from '@mui/material/TextField'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import  Button  from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import OtpInput from '../../components/OtpBox';
import { useLocation } from 'react-router-dom';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { postData } from '../../utils/api';

import { FaLongArrowAltLeft } from "react-icons/fa";




const Verify = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const[otp,setOtp]=useState('');
    const[email,setEmail]=useState(localStorage.getItem('verifyEmail') || '')
     
    const handleOtpChange=(value)=>{
        setOtp(value)
    }


    const verifyOTP=async(e)=>{
        e.preventDefault();
        if(otp.length<6){
            showWarning('Please enter a valid OTP')
            return
        }
        if(!email){
            showWarning('Please enter a valid email address')
            return
        }

       const result= await postData('/api/user/verify-email', {email,otp})

       if(!result.success){
           showError(result.message)
       }
       if(result.success){
           showSuccess(result.message)
           navigate('/login')
           setOtp('')
        localStorage.removeItem('verifyEmail')
       }



    }

 

  
    useEffect(()=>{
        if(location.state?.message){
            showSuccess(location.state.message)
        }

    },[])


  return (
   <section className='section py-10'>
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <div className="text-center flex items-center justify-center ">
                    <img src="/shield6.png" alt="" width={80} />
                </div>
                <h3 className="text-center text-[18px] text-black mt-4 mb-3"> Verify OTP</h3>
                {
                    email && 
                <p className='text-center mt-0 '>OTP send to:  <span className='text-primary font-bold'>{localStorage.getItem('verifyEmail')}</span></p>
                }
               <form  onSubmit={verifyOTP}>
                 {/* otp box */}
                 <div className='!w-full flex justify-center !mb-4'>

                 <TextField  id="outlined-basic" label="your email" variant="outlined" value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />
                 </div>

                <OtpInput length={6} onChange={handleOtpChange} />
                <div className="flex flex-col  mt-5 px-3">
                    <Button type='submit' className='w-full  btn-org btn-lg'>Verify OTP</Button>
                    <div className=' mt-3 '>
                   <Link to={'/login'} className='flex gap-1 items-center'>
                    <FaLongArrowAltLeft className='text-[18px]' />
                    <span>Back to Login</span>
                   </Link>
                    </div>
                </div>
               </form>


            </div>
        </div>

    </section>
  )
}

export default Verify
