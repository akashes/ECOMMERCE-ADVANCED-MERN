import React, { useState } from 'react'
import Button from '@mui/material/Button';


import { FaRegSquarePlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegMinusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setSubCategories, setThirdSubCategories } from '../../features/productsFilter/productsFilterSlice';

const CategoryCollapse = ({openCategoryPanel}) => {
    const{categories}=useSelector(state=>state.category)
    const dispatch = useDispatch()

        const[submenuIndex,setSubmenuIndex]=useState(null)
        const navigate = useNavigate()
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
                            {/* <Link to={`/products?category=${category._id}`} className='w-full'> */}
                            <Button
                             onClick={()=>{
                         dispatch(setCategories([category._id]))
                            navigate(`/products?category=${category._id}`)
                                openCategoryPanel(false)
                            }}
                            
                            className={`w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] ${selectedCategoryId===category._id && '!bg-gray-200'} `}>{category.name}</Button>
                            {/* </Link> */}
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
                                                {/* <Link className='w-full'> */}
                                                <Button 
                                                      onClick={()=>{
                         dispatch(setSubCategories(subCategory._id))
                            navigate(`/products?subCat=${subCategory._id}`)
                                openCategoryPanel(false)
                            }}
                                                className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] '>{subCategory.name}</Button>
                                                {/* </Link> */}
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

                                                        <li onClick={()=>{
                                                                                     dispatch(setThirdSubCategories(thirdSubCategory._id))
                            navigate(`/products?thirdSubCatId=${thirdSubCategory._id}`)
                                openCategoryPanel(false)
                                                        }} className='list-none flex items-center relative my-1'>
                                                            {thirdSubCategory.name}
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
