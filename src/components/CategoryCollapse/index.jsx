import React, { useState } from 'react'
import Button from '@mui/material/Button';


import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegMinusSquare } from "react-icons/fa";

const CategoryCollapse = () => {
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
    
  return (
    <>
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
      
    </>
  )
}

export default CategoryCollapse
