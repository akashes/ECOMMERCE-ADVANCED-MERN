import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { IoCloseSharp } from "react-icons/io5";

import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaRegMinusSquare } from "react-icons/fa";


const CategoryPanel = (props) => {
    const[submenuIndex,setSubmenuIndex]=useState(null)
    const[innerSubMenuIndex,setInnerSubMenuIndex]=useState(null)

    const openSubmenu=(index)=>{
        if(submenuIndex === index){
            return setSubmenuIndex(null)
        }
         setSubmenuIndex(index)
    }

    const openInnerSubmenu=(index)=>{
        if(innerSubMenuIndex === index){
            return setInnerSubMenuIndex(null)
        }
         setInnerSubMenuIndex(index)
    }


    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className='categoryPanel'
    //  onClick={()=>props.openCategoryPanel(false)}
     >
        <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>
            Shop By Categories
             <IoCloseSharp onClick={()=>props.openCategoryPanel(false)} className='cursor-pointer text-[20px]' />
                 </h3>

                 <div className='scroll'>
                    <ul className='w-full '>
                        <li className='list-none flex items-center relative flex-col'>
                            <Link to='/hai' className='w-full'>
                            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] '>Fashion</Button>
                            </Link>
                            {
                                submenuIndex ===0  ? 
                                <FaRegMinusSquare className=' absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(0)} /> 
                                : <FaRegSquarePlus className=' absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(0)} />
                            }

                                {
                                    submenuIndex ===0 &&      
                                     <ul className="submenu  w-full pl-3 " >
                                <li className='list-none  relative'>
                                    <Link className='w-full'>
                                    <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] '>Apparel</Button>
                                    </Link>
                                    {
                                        innerSubMenuIndex ===0  ? 
                                        <FaRegMinusSquare className=' absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openInnerSubmenu(0)} /> 
                                        : <FaRegSquarePlus className=' absolute  top-[10px] right-[15px] cursor-pointer' onClick={()=>openInnerSubmenu(0)} />
                                    }
                            {/* <FaRegSquarePlus className=' absolute right-4 cursor-pointer' onClick={()=>openInnerSubmenu(0)} /> */}
                            {/*inner submenu */}
                            {
                                innerSubMenuIndex === 0 &&  <ul className="inner-submenu  w-full pl-3" >
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Smart Tablet
                                    </Link>
                                </li>
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Crepe T shirt
                                    </Link>
                                </li>
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Leather Watch 
                                    </Link>
                                </li>
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Rolling Diamond
                                    </Link>
                                </li>
                            </ul>
                            }
                            
                                </li>
                            </ul>
                                }
                            {/* submenu */}
                       

                        </li>
                        <li className='list-none flex items-center relative flex-col'>
                            <Link to='/hai' className='w-full'>
                            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] '>Fashion</Button>
                            </Link>
                            {
                                submenuIndex ===1  ? 
                                <FaRegMinusSquare className=' absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(1)} /> 
                                : <FaRegSquarePlus className=' absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(1)} />
                            }

                                {
                                    submenuIndex ===1 &&      
                                     <ul className="submenu  w-full pl-3 " >
                                <li className='list-none  relative'>
                                    <Link className='w-full'>
                                    <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] '>Apparel</Button>
                                    </Link>
                                    {
                                        innerSubMenuIndex ===1  ? 
                                        <FaRegMinusSquare className=' absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openInnerSubmenu(1)} /> 
                                        : <FaRegSquarePlus className=' absolute  top-[10px] right-[15px] cursor-pointer' onClick={()=>openInnerSubmenu(1)} />
                                    }
                            {/* <FaRegSquarePlus className=' absolute right-4 cursor-pointer' onClick={()=>openInnerSubmenu(0)} /> */}
                            {/*inner submenu */}
                            {
                                innerSubMenuIndex === 1 &&  <ul className="inner-submenu  w-full pl-3" >
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Smart Tablet
                                    </Link>
                                </li>
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Crepe T shirt
                                    </Link>
                                </li>
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Leather Watch 
                                    </Link>
                                </li>
                                <li className='list-none flex items-center relative my-1'>
                                    <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                    Rolling Diamond
                                    </Link>
                                </li>
                            </ul>
                            }
                            
                                </li>
                            </ul>
                                }
                            {/* submenu */}
                       

                        </li>
                      
                    </ul>

                 </div>
   
  
    </Box>
  );

  return (
   <>
      <Drawer open={props.isOpenCategoryPanel} onClose={()=>props.openCategoryPanel(false)}>
        {DrawerList}
      </Drawer>
   </>
  )
}

export default CategoryPanel
