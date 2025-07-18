import React, {  useState } from 'react'
import  TextField  from '@mui/material/TextField'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import  Button  from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';



const Login = () => {
    const[showPassword,setShowPassword]=useState(false)
    
     const [formFields, setFormFields] = useState({
       email: '',
       password: '',
     })
     const navigate = useNavigate()
    const forgotPassword=(e)=>{
        e.preventDefault()
        const email = formFields.email.trim()

        // check if empty
        if(email===''){
            showWarning('Please enter an email address')

            return;
        }

        //regex setup 
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!emailRegex.test(email)){
            showWarning('Please enter an email address')
            return
         }
         //valid email
         navigate('/verify')
         showSuccess('OTP sent to your email')
      
       

    }

  return (
    <section className='section py-10'>
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <h3 className="text-center text-[18px] text-black">Login to your account</h3>
                <form action="" className='w-full mt-5'>
                    {/* email input */}
                    <div className="form-group w-full mb-5">

                <TextField className='w-full input-ele' id="email" label="Email Id" variant="outlined" type='email' name='email' onChange={(e)=>setFormFields({...formFields,email:e.target.value})} />
                    </div>
                   {/* password input */}
                    <div className="form-group w-full mb-5 relative">

                <TextField className='w-full input-ele' id="password" label="Password" variant="outlined" name='password' type={showPassword?'text':'password'}
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
                    <a href="" className='link cursor-pointer text-[14px] font-[600] ' onClick={forgotPassword}>Forgot Password?</a>
                    <div className="flex items-center w-full mt-3 mb-3">
                        <Button className='!w-full  btn-org btn-lg'>
                            login
                        </Button>
                      
                    </div>
                        <p className='text-center'>Not Registered? 
                            <Link to='/register' className='link text-[14px] font-[600] text-primary'> Sign Up</Link>
                            </p>
                        <p className="text-center font-[500]">Or continue with social account</p>
                        <Button className=' w-full  !bg-[#f1f1f1] !text-black  flex gap-3  '>
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
