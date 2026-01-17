import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { showError, showSuccess, showWarning } from "../../utils/toastUtils";
import { postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";

const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})


const Register = () => {
  const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const[isLoading,setIsLoading]=useState(false)
  const [showPassword, setShowPassword] = React.useState(false);
  const [formFields,setFormFields]=useState({
    name: "",
    email: "",
    password: ""
  })
       const redirectionPath = location?.state?.from || '/'

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async(e) => {
      e.preventDefault();

    //input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = formFields.email.trim();
    if(!emailRegex.test(email)){
        showWarning('Please enter a valid email address')
        return
    }
    if(!formFields.name || !formFields.email || !formFields.password){
        showWarning('Please fill all the fields')
        return
    
    }else if(!emailRegex.test(email)){
        showWarning('Please enter a valid email address')
        return
    }else if(formFields.password.length<6){
        showWarning('Password must be at least 6 characters long')
        return
    }
    setIsLoading(true)
    const res = await postData('/api/user/register', formFields)
    setIsLoading(false)
    if(!res.success){
        showError(res.message || 'Registration failed')
        return
    }


    //Registration success
    //setting email to local storage
    localStorage.setItem('verifyEmail',formFields.email)


    setFormFields({
        name: "",
        email: "",
        password: ""
    })
    showSuccess(res.message || 'Registration successful',3000)
    setTimeout(()=>{
         navigate('/verify',{
        replace:true,
        state:{
            message:"An OTP has been sent to your email address. Please verify to continue",
        }
    })

    },3000)
  

    


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
    navigate(redirectionPath,{replace:true})
  

    

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
    <section className="section py-5 sm:py-8 lg:py-10">
      <div className="container">
        <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-5 sm:px-10">
          <h3 className="text-center text-[18px] text-black">
            Create a new Account
          </h3>
          <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
            {/* name input */}
            <div className="form-group w-full mb-5">
              <TextField
              value={formFields.name}
                onChange={handleFormChange}
                className="w-full input-ele"
                id="name"
                name="name"
                label="Full Name"
                variant="outlined"
                type="text"
                autoComplete="name"
                autoFocus={true}
                aria-label="Full Name"
              />
            </div>
            {/* email input */}
            <div className="form-group w-full mb-5">
              <TextField
                value={formFields.email}
                onChange={handleFormChange}
                className="w-full input-ele"
                id="email"
                name="email"
                label="Email Id"
                variant="outlined"
                type="email"
                autoComplete="email"
                aria-label="Email Id"
              />
            </div>
            {/* password input */}
            <div className="form-group w-full mb-5 relative">
              <TextField
                value={formFields.password}
                onChange={handleFormChange}
                className="w-full input-ele"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                aria-label="Password"
              />
              <Button
              aria-label="Toggle Password Visibility"
              aria-pressed={showPassword}


                type="button"
                className="!absolute right-3 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEye className=" text-[20px]" />
                ) : (
                  <IoMdEyeOff className=" text-[20px]" />
                )}
              </Button>
            </div>
            <div className="flex items-center w-full mt-3 mb-3">
              <Button disabled={isLoading} type="submit" className={`!w-full  btn-org btn-lg ${isLoading ? 'opacity-90 cursor-not-allowed' : ''}`}>
                {isLoading ?    <CircularProgress style={{color:'white'}} size="30px" /> : 'Register'}
                </Button>
            </div>
            <p className="text-center">
              Already have an account?
              <Link
                to="/login"
                className="link text-[14px] font-[600] text-primary"
              >
                Login
              </Link>
            </p>
            <p className="text-center font-[500]">
              Or continue with social account
            </p>
            <Button onClick={authWithGoogle} type="button" className=" w-full  !bg-[#f1f1f1] !text-black  flex gap-3  ">
              <FcGoogle className="text-[20px]" />
              Login with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
