
import React from "react";
import { Link } from "react-router-dom"
import Search from "../Search"

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {  BsCart3 } from "react-icons/bs";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from "./Navigation";

import { useContext } from "react";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


import { FaUserCog } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";




const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {





    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };








    const{setOpenCartPanel,isLogin}=useContext(MyContext)
  return (
    <header className="bg-white" >
        <div className="top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px] ">

        <div className="container">
            {/* top strip */}
            <div className="flex items-center justify-between">
                <div className="col1 w-[50%]">
                    <p className="text-[12px] font-[500]  ">Get up to 50% off on new season styles, limited time only </p>

                </div>
                <div className=" col2 flex items-center justify-end ">
                    <ul className="flex items-center gap-3">
                        <li className="list-none">
                            <Link to='/help-center' className="text-[13px] link font-[500] transition ease-in-out duration-300 " >Help Center</Link>
                        </li>
                        <li className="list-none">
                            <Link to='/order-tracking' className="text-[13px] link font-[500] transition ease-in-out duration-300">Order Tracking</Link>
                        </li>
                      
                    </ul>
                   

                </div>

            </div>
        </div>
        </div>
        <div className="header py-4 border-b-[1px] border-gray-300 ">
            <div className="container flex items-center justify-between">
                {/* brand logo */}
                <div className="col1 w-[25%]">
                    <Link to={'/'}><img src="/logo.jpg" alt="logo" /></Link>
                </div>
                {/* search box */}
                <div className="col2 w-[40%]" >
                    <Search/>

                  
                </div>
                <div className="col3 w-[35%] flex items-center pl-7 ">
                    
                    <ul className="flex items-center justify-end gap-3 w-full">
                        {
                            isLogin ===false ? (
                                       <li className="list-none">
                            <Link className="link transition ease-in-out duration-300 text-[15px] font-[500]" to='/login' >Login</Link>  | &nbsp;
                             <Link className="link transition ease-in-out duration-300 text-[15px] font-[500]" to='/register'>Register</Link>
                        </li>
                            )
                            :
                            (
                                <>
                                <Button onClick={handleClick} className="myAccountWrap !text-black  flex items-center gap-3 relative cursor-pointer">
                                    <Button className="!text-black !rounded-full !w-[40px] !h-[40px] !min-w-[40px] !bg-[#f1f1f1]  ">
                                        <FaRegUser className="text-[17px] text-[rgba(0,0,0,0.7)]"/>
                                    </Button>
                                    <div className="info flex flex-col items-start">

                                        <h4 className="text-[14px] capitalize font-[500] text-[rgba(0,0,0,0.7)]">Akash es</h4>
                                        <span className="text-[13px] capitalize font-[400] text-[rgba(0,0,0,0.7)]">akash@gmail.com</span>

                                    </div>


                                </Button>
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
          <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)]">
        <FaUserCog/>
        <span className="text-[14px]">

        My Account
        </span>
        </MenuItem>
        </Link>
      
        <Link to='/my-orders'>
        
        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)]">
        <IoBagCheck/>
        <span className="text-[14px]">

        Orders
        </span>
        </MenuItem>
        </Link>
        
        <Link to='/my-list'>

        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)]">
        <IoHeartSharp/>
        <span className="text-[14px]">

        My List
        </span>
        </MenuItem>
        </Link>


        <Link to='/address'>

        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)]">
        <BiSolidMap/>
        <span className="text-[14px]">

        Address
        </span>
        </MenuItem>
        </Link>

        <Divider/>
        <MenuItem onClick={handleClose} className="flex items-center gap-2 !py-2 !text-[rgba(0,0,0,0.7)]">
        <IoLogOut/>
        <span className="text-[15px]">

        Logout
        </span>
        </MenuItem>
      
                                        </Menu>
                                </>

                                
                            )
                        }
                        
                 
                        <li>
       
                             
                             <Tooltip title='Compare'>

                                 <IconButton aria-label="compare">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <IoGitCompareOutline />
                                            
                                </StyledBadge>
                                </IconButton>
                             </Tooltip>
                        </li>
                        <li>
                            <Tooltip title='Wishlist'>

                              <IconButton aria-label="wishlist">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <FaRegHeart />
                                </StyledBadge>
                                </IconButton>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip title='Cart'>

                              <IconButton aria-label="cart" onClick={()=>setOpenCartPanel(true)}>
                                <StyledBadge badgeContent={4} color="secondary">
                                    <BsCart3 />
                                </StyledBadge>
                                </IconButton>
                            </Tooltip>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <Navigation/>



    </header>
  )
}

export default Header
