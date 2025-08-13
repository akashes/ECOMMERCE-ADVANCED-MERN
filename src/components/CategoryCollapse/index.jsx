import React, { useState } from 'react'
import Button from '@mui/material/Button';


import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegMinusSquare } from "react-icons/fa";
import { useSelector } from 'react-redux';

const CategoryCollapse = () => {
    const{categories}=useSelector(state=>state.category)
        const[submenuIndex,setSubmenuIndex]=useState(null)
    const[innerSubMenuIndex,setInnerSubMenuIndex]=useState(null)

    const[selectedCategoryId,setSelectedCategoryId]=useState(null)

    
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
                        {
                            categories.length>0 && categories.map((category,index)=>(
                                    <li className='list-none flex items-center relative flex-col'
                                    onClick={()=>setSelectedCategoryId(category._id)}
                                    >
                            <Link to='/hai' className='w-full'>
                            <Button className={`w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] ${selectedCategoryId===category._id && '!bg-gray-200'} `}>{category.name}</Button>
                            </Link>
                           {
                                category?.children?.length > 0 && (
                                    submenuIndex === index  
                                    ? <FaRegMinusSquare 
                                        className='absolute top-[10px] right-[15px] cursor-pointer' 
                                        onClick={() => openSubmenu(index)} 
                                    /> 
                                    : <FaRegSquarePlus 
                                        className='absolute top-[10px] right-[15px] cursor-pointer' 
                                        onClick={() => openSubmenu(index)} 
                                    />
                                )
                            }


                                {
                                    submenuIndex ===index && category?.children?.length!==0 &&     
                                     <ul className="submenu  w-full pl-3 " >
                                        {
                                            category.children.length>0 && category.children.map((subCategory,index)=>(

                                            <li key={subCategory._id} className='list-none  relative'>
                                                <Link className='w-full'>
                                                <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] '>{subCategory.name}</Button>
                                                </Link>
                                              {
                                    subCategory?.children?.length > 0 && (
                                        innerSubMenuIndex === index  
                                        ? <FaRegMinusSquare 
                                            className='absolute top-[10px] right-[15px] cursor-pointer' 
                                            onClick={() => openInnerSubmenu(index)} 
                                        /> 
                                        : <FaRegSquarePlus 
                                            className='absolute top-[10px] right-[15px] cursor-pointer' 
                                            onClick={() => openInnerSubmenu(index)} 
                                        />
                                    )
                                }

                                        {/*inner submenu */}
                                        {
                                            innerSubMenuIndex === index && subCategory?.children?.length!==0  &&  <ul className="inner-submenu  w-full pl-3" >
                                                {
                                                    subCategory?.children?.length>0 && subCategory.children.map((thirdSubCategory)=>(

                                                        <li className='list-none flex items-center relative my-1'>
                                                            <Link to='/' className=' link w-full !text-left !justify-start !px-3 transition text-[14px]  '>
                                                            {thirdSubCategory.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                             
                                        </ul>
                                        }
                                        
                                            </li>
                                            ))
                                        }
                            </ul>
                                }
                            {/* submenu */}
                       

                        </li>
                            ))
                           
                        }
                     
                      
                      
                    </ul>

                 </div>
      
    </>
  )
}

export default CategoryCollapse
