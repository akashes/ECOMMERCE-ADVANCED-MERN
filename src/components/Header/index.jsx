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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {

    const{setOpenCartPanel}=useContext(MyContext)
  return (
    <header className="bg-white" >
        <div className="top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px] ">

        <div className="container">
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
                <div className="col1 w-[25%]">
                    <Link to={'/'}><img src="/logo.jpg" alt="logo" /></Link>
                </div>
                <div className="col2 w-[45%]" >
                    <Search/>

                  
                </div>
                <div className="col3 w-[30%] flex items-center pl-7 ">
                    <ul className="flex items-center justify-end gap-3 w-full">
                        <li className="list-none">
                            <Link className="link transition ease-in-out duration-300 text-[15px] font-[500]" to='/login' >Login</Link>  | &nbsp;
                             <Link className="link transition ease-in-out duration-300 text-[15px] font-[500]" to='/register'>Register</Link>
                        </li>
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
