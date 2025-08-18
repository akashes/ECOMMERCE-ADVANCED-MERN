import { Button } from "@mui/material"
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoRocket } from "react-icons/go";


import CategoryPanel from "./CategoryPanel";
import { useEffect, useState } from "react";

import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuCategories } from "../../../features/category/categoryMenuSlice";
import { resetFilters, setCategories, setSubCategories } from "../../../features/productsFilter/productsFilterSlice";

const Navigation = () => {

    const navigate  = useNavigate()

    const{categories}=useSelector(state=>state.category)

    const dispatch = useDispatch()
const[isOpenCategoryPanel,setIsOpenCategoryPanel]=useState(false)



const openCategoryPanel=(val)=>{
   setIsOpenCategoryPanel(val)
}




useEffect(()=>{
    dispatch(fetchMenuCategories())
},[])

  return (  
    <>
    <nav className="">
       
        <div className="container flex items-center justify-end  gap-8">
            <div className="col_1 w-[20%]">
                
                <Button   className="!text-black gap-2 w-full " onClick={()=>setIsOpenCategoryPanel(true)}>
                     <RiMenu2Fill className="text-[18px]" /> 
                       Shop By Categories
                       <LiaAngleDownSolid className="text-[14px] ml-auto font-bold"/>
                       </Button>
            </div>
            <div className="col_2 w-[60%]">
                <ul className="flex items-center gap-3 nav">
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                        <Button className=" font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)] !py-4
                        ">

                        Home
                        </Button>
                        </Link>
                    </li>
                    {
                        categories?.length>0  && categories.map((category)=>(
                                 <li key={category._id} className="list-none relative">
                        <Button
                        onClick={()=>{
                            // dispatch(resetFilters())
                            
                            dispatch(setCategories([category._id]))
                            navigate(`/products?category=${category._id}`)

                        }}
                        // to={`/products?category=${category._id}`}
                         className="link text-[14px] font-[500] ">
                          <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">

                        {category.name}
                        </Button>
                        </Button>
                       {
                        category?.children?.length!==0 && (
                             <div className="submenu absolute top-[120%] opacity-0 transition-all  left-[0%] min-w-[150px] bg-white shadow-md rounded-md">
                            <ul>
                                {
                                    category?.children?.length>0 && category.children.map((subCategory)=>(
                                            <li key={subCategory._id} className="list-none w-full relative">
                                    <Button 
                                    onClick={(()=>{
                                        dispatch(setSubCategories(subCategory._id))
                                        navigate(`/products?subCatId=${subCategory._id}`)
                                    })}
                                    className="w-full">
                                    <Button className="  !text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)]  w-full !justify-start !rounded-none whitespace-nowrap" >{subCategory.name}</Button>
                                     {/* inner submenu */}
                                     {
                                        subCategory?.children?.length!==0 &&             <div className="submenu absolute top-[100%] opacity-0 transition-all  left-[100%] min-w-[150px] bg-white shadow-md rounded-md ">
                            <ul>
                                {
                                    subCategory?.children?.length>0 && subCategory.children.map((thirdSubCategory)=>(
                                           <li key={thirdSubCategory._id} className="list-none w-full">
                                    <Link to={`/products?thirdSubCatId=${thirdSubCategory._id}`} className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none whitespace-nowrap" >{thirdSubCategory.name}</Button>
                                    </Link>
                                </li>

                                    ))
                                }
                             
                      
                               
                            </ul>
                        </div>
                                     }
                           
                                    </Button>
                       
                                </li>

                                    ))
                                    
                                }
                            
                        
                               
                            </ul>
                        </div>
                        )
                       }
                    </li>

                        ))
                    }
               
                
             
                  
                </ul>

            </div>
            <div className="col_3 w-[20%]">
                <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0"> 
                    <GoRocket className="text-[18px]"/>
                     Free International Delivery</p>
            </div>
      

        </div>
    </nav>
    {
        categories?.length!==0 && 
    <CategoryPanel categories={categories} openCategoryPanel={openCategoryPanel}  isOpenCategoryPanel={isOpenCategoryPanel} />

    }
    </>

  )
}

export default Navigation
