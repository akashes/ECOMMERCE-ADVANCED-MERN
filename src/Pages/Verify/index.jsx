import React,{useState} from 'react'
import  TextField  from '@mui/material/TextField'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import  Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import OtpInput from '../../components/OtpBox';



const Verify = () => {
    const[otp,setOtp]=useState('');
     
    const handleOtpChange=(value)=>{
        setOtp(value)
    }


    const verifyOTP=(e)=>{
        e.preventDefault();
        alert(otp);
    }

  return (
   <section className='section py-10'>
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <div className="text-center flex items-center justify-center ">
                    <img src="/shield6.png" alt="" width={80} />
                </div>
                <h3 className="text-center text-[18px] text-black mt-4 mb-3"> Verify OTP</h3>
                <p className='text-center mt-0 !mb-4'>OTP send to  <span className='text-primary font-bold'>akash@gmail.com</span></p>
               <form  onSubmit={verifyOTP}>
                 {/* otp box */}
                <OtpInput length={6} onChange={handleOtpChange} />
                <div className="flex items-center justify-center mt-5 px-3">
                    <Button type='submit' className='w-full  btn-org btn-lg'>Verify OTP</Button>
                </div>
               </form>


            </div>
        </div>

    </section>
  )
}

export default Verify
