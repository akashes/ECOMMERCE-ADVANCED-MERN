import React, { useContext, useEffect, useState } from 'react'
import { IoMdCloudUpload } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';

import { FaUserCog } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { showError, showSuccess } from '../../utils/toastUtils';
import { AuthContext } from '../../contexts/AuthContext';
import { uploadImage } from '../../utils/api';

const AccountSidebar = () => {
    const{user,setUser}=useContext(AuthContext)
    const[avatar,setAvatar]=useState(user?.avatar?.url || 'https://res.cloudinary.com/dllelmzim/image/upload/v1753808261/user_dhgqbt.png')
console.log(avatar)
    const [isUploading,setIsUploading]=useState(false)
    const handleImageChange=async(e)=>{
        const file=e.target.files[0]
        if(!file) return
        //checking image type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

        if(!validTypes.includes(file.type)){ 
            showError('Please select a valid image file')
            return
        }
        setIsUploading(true)
        try {
             const formData = new FormData()
        formData.append('avatar',file)

        // const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/upload-avatar`,formData,{
        //     headers:{
        //         'Content-Type':'multipart/form-data'
        //     }
        // })
        const res = await uploadImage('/api/user/upload-avatar',formData)
        console.log(res)
        if(!res.success){
            showError(res.data.message||'Something went wrong')
            return
        }
        if(res.success){
            setAvatar(res.avatar.url)
            setUser(prev=>({...prev,avatar:res.avatar}))

            showSuccess('Avatar updated successfully')
        }
            
        } catch (error) {
            console.log('upload error',error.response?.data || error.message)
        }finally{
            setIsUploading(false)
        }
        
       
     
    }

    // useEffect(()=>{
    //     if(localStorage.getItem('user')){
    //         const userDetails = JSON.parse(localStorage.getItem('user'))
    //         setAvatar(userDetails.avatar.url)
    //     }
    // },[])


  return (
     <div className=" bg-gradient-to-tr from-[#ffffff] to-[#e9e9e9] card bg-white shadow-md rounded-md sticky top-[10px] ">

                     <div className="w-full p-5 flex items-center justify-center flex-col">
                        {/* image */}
         <div className={`w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group ${isUploading ? 'ring-4 ring-primary animate-pulse' : 'ring-4 ring-gray-300'}`}>
  <img src={avatar}  alt="avatar" className="w-full h-full object-cover" />

  {/* Spinner Overlay when uploading */}
  {isUploading && (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  )}

  {/* Upload Overlay */}
  <div className="group-hover:opacity-100 transition-all absolute opacity-0 overlay w-full h-full top-0 left-0 z-40 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
    <IoMdCloudUpload className="text-white text-[25px]" />
    <input
      type="file"
      className="absolute top-0 left-0 w-full h-full opacity-0"
      onChange={handleImageChange}
      disabled={isUploading}
    />
  </div>
</div>

              {/* name */}
              <h3>{user?.name}</h3>
              <p className='text-[13px] font-[500] '>{user?.email}</p>
                

                    </div>
                    <ul className='list-none rounded-b-md overflow-hidden'>
                        <li className='w-full '>
                            <NavLink to='/my-account' className={({isActive})=>isActive?"border-l-4 border-primary":""}>

                            <Button className='flex items-center !justify-start !px-5 gap-3 !capitalize !text-[rgba(0,0,0,0.8)] w-full '>
                                <FaUserCog className='text-[17px]'/>
                                User Profile
                                </Button>
                            </NavLink>

                        </li>
                        <li className='w-full '>
                            <NavLink to='/my-list' className={({isActive})=>isActive?"border-l-4 border-primary":""}>

                            <Button className='flex items-center !justify-start !px-5 gap-3 !capitalize !text-[rgba(0,0,0,0.8)] w-full '>
                                <IoHeartSharp className='text-[17px]'/>
                                Favorites
                                </Button>
                            </NavLink>

                        </li>
                        <li className='w-full '>
                            <NavLink to='/my-orders' className={({isActive})=>isActive?"border-l-4 border-primary":""}>

                            <Button className='flex items-center !justify-start !px-5 gap-3 !capitalize !text-[rgba(0,0,0,0.8)] w-full '>
                                <IoBagCheck className='text-[17px]'/>
                                My Orders
                                </Button>
                            </NavLink>

                        </li>
                        <li className='w-full '>
                            <NavLink to='/address' className={({isActive})=>isActive?"border-l-4 border-primary":""}>

                            <Button className='flex items-center !justify-start !px-5 gap-3 !capitalize !text-[rgba(0,0,0,0.8)] w-full '>
                                <BiSolidMap className='text-[17px]'/>
                                Address
                                </Button>
                            </NavLink>

                        </li>
                        <li className='w-full '>
                            <Button className='flex !bg-primary !text-white !rounded-none   items-center !justify-start !px-5 gap-3 !capitalize w-full '>
                                <IoLogOut className='text-[18px]'/>
                                Logout
                                </Button>

                        </li>
                    </ul>



                    </div>
  )
}

export default AccountSidebar
