import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import {AiOutlineProduct} from 'react-icons/ai'
import { LuHeart } from "react-icons/lu";
import { BsBagCheck } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";


import { FaFilter } from "react-icons/fa6";
import { MyContext } from '../../../contexts/MyContext';
import { Clickable } from '../../../utils/Clickable';




const MobileNav = () => {
   const context = useContext(MyContext)
   const {pathname}=useLocation()
   const openFilters=()=>{
      context.setOpenFilter(true)
   
   }
  return (
    <div className='mobileNav bg-white p-1 px-3 w-full flex items-center justify-between gap-5 fixed bottom-0 left-0 place-items-center z-[51] '>
                            <NavLink to='/' className={({isActive})=>isActive?"active-tab":"non-active-tab"}>
                            <Clickable>

      <Button className='flex-col !w-[50px] !min-w-[50px] !capitalize p-1  '>
         <IoHomeOutline size={18}/>
         <span className='text-[12px]'>Home</span>
      </Button>
                            </Clickable>
        </NavLink>

{
   pathname==='/products' && (
           <Button onClick={openFilters} className='flex-col !w-[50px] !min-w-[50px] !h-[50px] !capitalize !bg-primary !rounded-full !text-white  '>
         <FaFilter size={18}/>
      </Button>
   )
}
         


        
                                    {/* <NavLink to='/products' className={({isActive})=>isActive?"active-tab":"non-active-tab"}> */}

      <Button onClick={()=>
      {
         context.setIsSearchOpen(true)
      }} className='flex-col !w-[50px] !min-w-[50px] !px-1 !capitalize  !text-gray-500'>
         <IoMdSearch size={19}/>
         <span className='text-[12px]'>Search</span>
      </Button>
      {/* </NavLink> */}

                                    <NavLink to='/my-list' className={({isActive})=>isActive?"active-tab":"non-active-tab"}>

      <Button className='flex-col !px-1 !w-[50px] !min-w-[50px] !capitalize'>
         <LuHeart size={18}/>
         <span className='text-[12px]'>Wishlist</span>
      </Button>
</NavLink>
                                    <NavLink to='/my-orders' className={({isActive})=>isActive?"active-tab":"non-active-tab"}>
      <Button className='flex-col !px-1 !w-[50px] !min-w-[50px] !capitalize'>
         <BsBagCheck size={18}/>
         <span className='text-[12px]'>Orders</span>
      </Button>
</NavLink>
                                    <NavLink to='/my-account' className={({isActive})=>isActive?"active-tab":"non-active-tab"}>

      <Button className='flex-col !px-1 !w-[50px] !min-w-[50px] !capitalize'>
         <FiUser size={18} />
         <span className='text-[12px]'>User</span>
      </Button>
</NavLink>    </div>
  )
}

export default MobileNav
