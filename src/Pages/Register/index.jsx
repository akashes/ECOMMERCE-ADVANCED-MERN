import React from 'react'
import  TextField  from '@mui/material/TextField'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import  Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";


const Register = () => {
    const[showPassword,setShowPassword]=React.useState(false)
  return (
    <section className='section py-10'>
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <h3 className="text-center text-[18px] text-black">Create a new Account</h3>
                <form action="" className='w-full mt-5'>
                    {/* name input */}
                    <div className="form-group w-full mb-5">

                <TextField className='w-full input-ele' id="name" label="Full Name" variant="outlined" type='email' />
                    </div>
                    {/* email input */}
                    <div className="form-group w-full mb-5">

                <TextField className='w-full input-ele' id="email" label="Email Id" variant="outlined" type='email' />
                    </div>
                   {/* password input */}
                    <div className="form-group w-full mb-5 relative">

                <TextField className='w-full input-ele' id="password" label="Password" variant="outlined" type={showPassword?'text':'password'}
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
                    <div className="flex items-center w-full mt-3 mb-3">
                        <Button className='!w-full  btn-org btn-lg'>
                            Register
                        </Button>
                      
                    </div>
                        <p className='text-center'>Already have an account? 
                            <Link to='/login' className='link text-[14px] font-[600] text-primary'> Login</Link>
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

export default Register
