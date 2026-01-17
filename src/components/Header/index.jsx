
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import Search from "../Search"

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {  BsCart3 } from "react-icons/bs";
import { IoCloseSharp, IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from "./Navigation";

import { useContext } from "react";
import { MyContext } from "../../contexts/MyContext.jsx";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';


import { FaUserCog } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import {  postData } from "../../utils/api.js";
import { showError, showSuccess } from "../../utils/toastUtils.js";
import { useDispatch, useSelector } from "react-redux";
import { clearWishlistReducer } from "../../features/wishList/wishListSlice.js";


import { IoMenu } from "react-icons/io5";
import { fetchMenuCategories } from "../../features/category/categoryMenuSlice.js";
import { Clickable } from "../../utils/Clickable.jsx";


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const{cart}=useSelector(state=>state.cart)
  const{wishlist}=useSelector(state=>state.wishlist)


const[isOpenCategoryPanel,setIsOpenCategoryPanel]=useState(false)



const openCategoryPanel=(val)=>{
   setIsOpenCategoryPanel(val)
}




useEffect(()=>{
    dispatch(fetchMenuCategories())
},[])

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


const handleLogout=async()=>{
  handleClose()
  const result = await postData('/api/user/logout')
  if(!result.success){
    showError(result.message||'Something went wrong')
    return
    
  }
  //logout success
  showSuccess(result.message||'Logout successful')
 
      dispatch(clearWishlistReducer());

      navigate('/')
  authContext.logout()


}




    const authContext = useContext(AuthContext)
    const{setOpenCartPanel,isLogin,windowWidth,isSearchOpen,setIsSearchOpen}=useContext(MyContext)
  return (
    <header className="bg-white sticky top-[-50px] z-100 " >
        <div className=" hidden lg:block top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px] ">

        <div className="container">
            {/* top strip */}
            <div className="flex items-center justify-between ">
                <div className="col1 w-[50%]">
                    <p className="text-[12px] font-[500]  ">Get up to 50% off on new season styles, limited time only </p>

                </div>
                <div className=" col2 flex items-center justify-end ">
                    <ul className="flex items-center gap-3">
                        <li className="list-none">
                            <Link to='/' className="text-[13px] link font-[500] transition ease-in-out duration-300 " >Help Center</Link>
                        </li>
                        {
                          authContext?.isLogin &&
                          <li className="list-none">
                              <Link to='/my-orders' className="text-[13px] link font-[500] transition ease-in-out duration-300">Order Tracking</Link>
                          </li>
                        
                        }
                    </ul>
                   

                </div>

            </div>
        </div>
        </div>





        <div className="header py-2  lg:py-4 border-b-[1px] border-gray-300 ">
            <div className="container flex items-center justify-between">
              {
                windowWidth<992 &&
                <Button onClick={()=>setIsOpenCategoryPanel(true)} className='!w-[35px] !min-w-[35px] !h-[35px] !rounded-full !text-gray-800'>

                  <IoMenu size={22} />
                </Button>
              }
                {/* brand logo */}
                <div className="col1 w-[40%]  lg:w-[25%]">
                    <Link to={'/'}><img src="/logo.jpg" alt="logo" /></Link>
                </div>
                {/* search box */}
                {/* <div className={`col2   top-0 left-0 h-full w-full lg:w-[40%] lg:static p-2 lg:p-0 bg-white  z-[700]
                `} >
                  {
                    windowWidth >=1 &&
                     <Search/>
                  }
              

                  
                </div> */}
                <div className="col2 hidden lg:block w-[40%]">
               <Search />
            </div>


                <div className="col3 w-[10%]  lg:w-[35%] flex items-center pl-7 ">
                    
                    <ul className="flex items-center justify-end gap-3 w-full">
                        {
                            authContext?.isLogin ===false && windowWidth>992 ? (
                                       <li className="list-none">
                            <Button 
  disableRipple 
  sx={{
    '&:hover': {
      backgroundColor: 'transparent', 
    
      boxShadow: 'none',
    },
  }}
                            className=" !text-gray-600 !capitalize link transition ease-in-out duration-300 text-[15px] font-[500]" 
                            onClick={()=>{
                              navigate('/login',{state:{from:location.pathname}})
                            }}
                            
                             >Login</Button>  | &nbsp;
                             <Button 
                               disableRipple 
  sx={{
    '&:hover': {
      backgroundColor: 'transparent', 
    
      boxShadow: 'none',
    },
  }}
                             onClick={()=>{
                              navigate('/register',{state:{from:location.pathname}})
                            }}
                             
                             className=" !text-gray-600 !capitalize  link transition ease-in-out duration-300 text-[15px] font-[500]">Register</Button>
                        </li>
                            )
                            :
                            (
                                <>
                                {
                                  windowWidth>992 && 
                                                                         <li className="list-none">

                                <Button onClick={handleClick} className="myAccountWrap !text-black  flex items-center gap-3 relative cursor-pointer">
                                  <Clickable>

                                    <Button className="!text-black !rounded-full !w-[40px] !h-[40px] !min-w-[40px] !bg-[#f1f1f1]  ">
                                        <FaRegUser className="text-[17px] text-[rgba(0,0,0,0.7)]"/>
                                    </Button>
                                  </Clickable>
                                    <div className="info flex flex-col items-start">

                                        <h4 className="text-[14px] capitalize font-[500] text-[rgba(0,0,0,0.7)]">{authContext?.user?.name}</h4>
                                        <span className="text-[13px] capitalize font-[400] text-[rgba(0,0,0,0.7)]">{authContext?.user?.email}</span>

                                    </div>


                                </Button>
                                </li>
                                }
                                {
                                /* login user drop down  menu */}

                                   <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <Link to='/my-account'>
          <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)] lg:!text-xl">
        <FaUserCog/>
        <span className="text-[14px]">

        My Account
        </span>
        </MenuItem>
        </Link>
      
        <Link to='/my-orders'>
        
        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)] lg:!text-xl">
        <IoBagCheck/>
        <span className="text-[14px]">

        Orders
        </span>
        </MenuItem>
        </Link>
        
        <Link to='/my-list'>

        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)] lg:!text-xl">
        <IoHeartSharp/>
        <span className="text-[14px]">

        Favorites
        </span>
        </MenuItem>
        </Link>


        <Link to='/address'>

        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)] lg:!text-xl">
        <BiSolidMap/>
        <span className="text-[14px]">

        Address
        </span>
        </MenuItem>
        </Link>

        <Divider/>
        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)] lg:!text-xl"
        onClick={handleLogout}
        >
        <IoLogOut/>
        <span className="text-[15px]" >

        Logout
        </span>
        </MenuItem>
      
                                        </Menu>

                                </>

                                
                            )
                        }
                        
                 
                    
                        {
                          windowWidth>992 && 
                          <>
                              <li>
       
                             
                             <Tooltip title='Compare'>

                              <Clickable>

                                 <IconButton aria-label="compare">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <IoGitCompareOutline />
                                            
                                </StyledBadge>
                                </IconButton>
                              </Clickable>
                             </Tooltip>
                        </li>
                          <li>
                            <Tooltip title='Wishlist'>
                            <Clickable>

                              <IconButton onClick={()=>{
                                navigate('/my-list')
                              }} aria-label="wishlist">
                                <StyledBadge  badgeContent={wishlist?.length} color="secondary">
                                    <FaRegHeart />
                                </StyledBadge>
                                </IconButton>
                                </Clickable>
                            </Tooltip>
                        </li>
                          </>
                        }
                    
                        <li>
                            <Tooltip title='Cart'>
                              <Clickable>


                              <IconButton aria-label="cart" onClick={()=>setOpenCartPanel(true)}>
                                <StyledBadge badgeContent={cart?.length} color="secondary">
                                    <BsCart3 />
                                </StyledBadge>
                                </IconButton>
                              </Clickable>
                            </Tooltip>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <Navigation isOpenCategoryPanel={isOpenCategoryPanel} openCategoryPanel={openCategoryPanel} setIsOpenCategoryPanel={setIsOpenCategoryPanel} />


{/* mobile search component full screen overlay */}
{

windowWidth < 992 && isSearchOpen === true && (
          <div className="fixed top-0 left-0 w-full h-full bg-white z-[9999] flex flex-col p-4 animate-in fade-in zoom-in duration-200">
             
             <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-700">Search Products</h4>
                <IconButton onClick={() => setIsSearchOpen(false)}>
                  <IoCloseSharp className="text-2xl text-black" />
                </IconButton>
             </div>

             {/*  Search Component */}
             <div className="w-full">
              
                <Search closeSearch={()=>setIsSearchOpen(false)} />
             </div>
          </div>
        )
      }


    </header>
  )
}

export default Header
