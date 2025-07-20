import React from 'react'
import { IoMdCloudUpload } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';

import { FaUserCog } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const AccountSidebar = () => {
  return (
     <div className=" bg-gradient-to-tr from-[#ffffff] to-[#e9e9e9] card bg-white shadow-md rounded-md sticky top-[10px] ">

                     <div className="w-full p-5 flex items-center justify-center flex-col">
                        {/* image */}
              <div className='w-[110px] h-[110px] rounded-full bg-gray-200 overflow-hidden mb-4 relative group ring-4 ring-gray-300'>
              <img src="https://www.bing.com/th/id/OIP.Yd0yOhKDwRsMqsERE0LiKQHaEJ?w=168&h=100&c=8&rs=1&qlt=90&o=6&cb=thwsc4&dpr=1.3&pid=3.1&rm=2" alt="" className='w-full h-full object-cover' />
              <div className="group-hover:opacity-100 transition-all absolute opacity-0 overlay w-[100%] h-[100%]  top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
                <IoMdCloudUpload className=' text-white text-[25px]'/>
                <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0' />

              </div>
              </div>
              {/* name */}
              <h3>Akash es</h3>
              <p className='text-[13px] font-[500] '>akash@gmail.com</p>
                

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
