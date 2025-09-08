import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { putData } from "../../utils/api";
import { showSuccess, showWarning } from "../../utils/toastUtils";
import CircularProgress from '@mui/material/CircularProgress';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import { Collapse } from "react-collapse";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';



const MyAccount = () => {
  const authContext = useContext(AuthContext);
  const[loading,setLoading]=useState(false)
  const[passwordLoading,setPasswordLoading]=useState(false)

  const[oldPassword,setOldPassword]=useState('')
  const[newPassword,setNewPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')
  // const[formFields,setFormFields]=useState({
  //   name:authContext.user.name,
  //   phone:authContext.user.mobile
  // })
  const[phone,setPhone]=useState(authContext.user.mobile|| '')
  const[name,setName]=useState(authContext.user.name|| '')

  console.log(name,phone)
  const[isChangePasswordFormShow,setIsChangePasswordFormShow]=useState(false)
  const[showOldPassword,setShowOldPassword]=useState(false)
  const[showConfirmPassword,setShowConfirmPassword]=useState(false)
  const[showNewPassword,setShowNewPassword]=useState(false)

  const isPasswordDisabled = !oldPassword || !newPassword || !confirmPassword;
  const updateUser=async(e)=>{
    console.log('inside update user')
    e.preventDefault()

    const hasChangedName = name !== authContext.user?.name;
const hasChangedMobile = phone !== authContext.user?.mobile;
    //atleast one field should be filled
    if(!hasChangedName && !hasChangedMobile){
        showWarning('Please fill at least one field')
        return
    }
    if(phone.length>13 || phone.length<13){
        showWarning('Please enter a valid phone number')
        return
    }


      const res=  await putData('/api/user/update-user-details',{name,mobile:phone})
      console.log(res)
     if(!res.success){
        showWarning(res.message || 'Something went wrong')
        return
     }
     
     showSuccess(res.message || 'Profile updated successfully')

     authContext.setUser(prev=>({...prev,name,mobile:phone}))
  }
  const handlePasswordUpdate=async(e)=>{
    e.preventDefault()
    if(newPassword!==confirmPassword){
        showWarning('Passwords do not match')
        return
    }
    setPasswordLoading(true)
   const result = await putData('/api/user/update-password',{oldPassword,newPassword,confirmPassword})
   console.log(result)
   setPasswordLoading(false)
   if(!result.success){
    showWarning(result.message || 'Something went wrong')
    return
   }
   showSuccess(result.message || 'Password updated successfully')
   setOldPassword('')
   setNewPassword('')
   setConfirmPassword('')
  
  }

      useEffect(()=>{
          window.scrollTo({ top: 0, behavior: "smooth" });
    
    
      },[])

  if (!authContext.isLogin) return <Navigate to="/login" />;
  return (
    <section className=" px-2 lg:px-0 py-5 lg:py-10 w-full ">
      <div
        className="container flex flex-col lg:flex-row  gap-5
     "
      >
        <div className="col1 w-full  lg:w-[20%]  ">
          <AccountSidebar />
        </div>
        <div className="col2 w-full lg:w-[50%]">
            
          <div className="card bg-white p-5  mb-5 shadow-md rounded-md relative">
            {/* <CircularProgress size={20} className="absolute right-5 !text-black "/> */}
            <div className="flex items-center justify-between pb-2">

            <h2 className="text-[20px]">My Profile</h2>
            {
              !authContext.user.signUpWithGoogle===true &&              <Button className="!text-gray-700 gap-1" onClick={()=>setIsChangePasswordFormShow(prev=>!prev)} >Change Password <IoIosArrowDown className={` transition-transform duration-300 ${isChangePasswordFormShow && 'rotate-180'}`} />  </Button>

            }
            </div>
            <hr className="text-gray-400" />
            <form className="mt-5" onSubmit={updateUser} >
              <div className="flex items-center gap-5 ">
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    variant="outlined"
                    label="Full Name"
                    size="small"
                    disabled={loading}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    label="Email"
                    variant="outlined"
                    size="small"
                    type="email"
                    disabled={true}
                    value={authContext?.user?.email}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 mt-4 ">
                <div className="w-[50%]">
               
                <PhoneInput

                className="!w-full"
                  defaultCountry="in"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
                </div>
                {
               !authContext?.user?.verify_email ?
                     <div className="w-[50%]">
                  <Button className="!bg-black !text-white ">Verify Email</Button>
                </div>:
                <div className="flex  items-center gap-1 w-[50%] ">
                    <img className="w-[20px]  align-middle" src="https://res.cloudinary.com/dllelmzim/image/upload/v1753885099/check_fl8d2v.png" alt="" />
                    <p className="!m-0">email verified</p>
                </div>
                }
               
              </div>
              <br />

              <div className="flex items-center gap-4">
                <Button
                type='submit'
                  className={`w-[150px] px-4 py-2 rounded  font-semibold 
                   bg-gradient-to-tr from-[#ff7a7a] to-[#ec1616] !text-white hover:bg-gradient-to-tr hover:from-[#535353] hover:to-[#030202] hover:!text-white ${loading && 'pointer-events-none opacity-80'}`}
                   type="submit"
                   disabled={loading}
                
                >
                  Update profile
                </Button>
            
              </div>
            </form>
          </div>

{
  !authContext.user.signUpWithGoogle===true &&    <Collapse isOpened={isChangePasswordFormShow}>
             <div className="card bg-white  p-5 shadow-md rounded-md relative">
            <div className="flex items-center justify-between pb-2">

            <h2 className="text-[17px]">Change Password</h2>
            </div>
            <hr className="text-gray-400" />
              <form className="mt-5  grid grid-cols-2 gap-2" onSubmit={handlePasswordUpdate}>
                <div className="col">
                        <div className="form-group w-full  relative">

                <TextField className='w-full input-ele '  id="password" label="old Password" variant="outlined" name='old password' 
                type={showOldPassword?'text':'password'}
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
                />
                    <Button type='button' className='!absolute !right-1 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowOldPassword(!showOldPassword)}
                    >
                        {
                            showOldPassword ?
                            (
                             <IoEye className='  text-[16px] md:text-[20px]' />

                            )
                            :
                            (
                            <IoMdEyeOff className='  text-[16px] md:text-[20px]' />

                            )
                        }

                    </Button>
                  
                    
                    
                    </div>

       
                </div>
                <div className="col">
                    <div className="form-group w-full  relative">

                <TextField className='w-full input-ele '  id="password" label="New Password" variant="outlined" name='old password' 
                type={showNewPassword?'text':'password'}
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                />
                    <Button type='button' className='!absolute !right-1 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowNewPassword(!showNewPassword)}
                    >
                        {
                            showNewPassword ?
                            (
                             <IoEye className='  text-[16px] md:text-[20px]' />

                            )
                            :
                            (
                            <IoMdEyeOff className='  text-[16px] md:text-[20px]' />

                            )
                        }

                    </Button>
                  
                    
                    
                    </div>
                </div>
              <div className="col">
                    <div className="form-group w-full  relative">

                <TextField className='w-full input-ele '  id="password" label="confirm Password" variant="outlined" name='old password' 
                type={showConfirmPassword?'text':'password'}
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                    <Button type='button' className='!absolute !right-1 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {
                            showConfirmPassword ?
                            (
                             <IoEye className='  text-[16px] md:text-[20px]' />

                            )
                            :
                            (
                            <IoMdEyeOff className='  text-[16px] md:text-[20px]' />

                            )
                        }

                    </Button>
                  
                    
                    
                    </div>
                </div>
              <br />

              <div className="flex items-center gap-4">
                <Button
                  className={`w-[200px] px-4 py-2 rounded  font-semibold 
                   bg-gradient-to-tr from-[#ff7a7a] to-[#ec1616] !text-white hover:bg-gradient-to-tr hover:from-[#535353] hover:to-[#030202] hover:!text-white text-nowrap ${passwordLoading && 'pointer-events-none opacity-80'}`}
                   type="submit"
                   disabled={passwordLoading || isPasswordDisabled}
                  
                >
                    {
                        passwordLoading ?  <CircularProgress size={20} className="absolute right-5 !text-black "/>  :   ' Update Password'

                    }
                </Button>
            
              </div>
            </form>
            </div>
             </Collapse>
}
           


             
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
