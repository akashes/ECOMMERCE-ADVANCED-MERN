import { Button } from "@mui/material"
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";


import CategoryPanel from "./CategoryPanel";
import { useState } from "react";

import './style.css'

const Navigation = () => {
const[isOpenCategoryPanel,setIsOpenCategoryPanel]=useState(false)



const openCategoryPanel=(val)=>{
   setIsOpenCategoryPanel(val)
}

  return (  
    <>
    <nav className="py-2">
       
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
                        hover:!text-[var(--primary)]
                        ">

                        Home
                        </Button>
                        </Link>
                    </li>
                    <li className="list-none relative">
                        <Link to='/' className="link text-[14px] font-[500] ">
                          <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">

                        Fashion
                        </Button>
                        </Link>
                        <div className="submenu absolute top-[120%] opacity-0 transition-all  left-[0%] min-w-[150px] bg-white shadow-md">
                            <ul>
                                <li className="list-none w-full relative">
                                    <Link to='/' className="w-full">
                                    <Button className="  !text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)]  w-full !justify-start !rounded-none" >Men</Button>
                                     {/* inner submenu */}
                                       <div className="submenu absolute top-[100%] opacity-0 transition-all  left-[100%] min-w-[150px] bg-white shadow-md ">
                            <ul>
                                <li className="list-none w-full">
                                    <Link to='/' className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none" >T-shirt</Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">
                                    <Link>
                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full  !justify-start !rounded-none">Jeans</Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">
                                    <Link>

                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none">Watch</Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">
                                    <Link>

                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none">Pants</Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">

                                    <Link>
                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none">Footwear</Button>
                                    </Link>
                                </li>
                               
                            </ul>
                        </div>
                                    </Link>
                       
                                </li>
                                <li className="list-none w-full">
                                    <Link>
                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full  !justify-start !rounded-none">Women</Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">
                                    <Link>

                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none">Kids</Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">
                                    <Link>

                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none">Girls</Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">

                                    <Link>
                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[var(--primary)] w-full !justify-start !rounded-none">Boys</Button>
                                    </Link>
                                </li>
                               
                            </ul>
                        </div>
                    </li>
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                         <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">
                        Electronics
                        </Button>
                        </Link>

                    </li>
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                         <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">Bags</Button>
                        </Link>
                        
                    </li>
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                         <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">Footwear</Button></Link>
                    </li>
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                         <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">Groceries</Button></Link>
                    </li>
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                         <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">Beauty</Button></Link>
                    </li>
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                         <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">Wellness</Button></Link>
                    </li>
                    <li className="list-none">
                        <Link to='/' className="link text-[14px] font-[500] ">
                         <Button className="font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[var(--primary)]
                        ">Jewellery</Button>
                        </Link>
                    </li>
                  
                </ul>

            </div>
            <div className="col_3 w-[20%]">
                <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0"> 
                    <GoRocket className="text-[18px]"/>
                     Free International Delivery</p>
            </div>
      

        </div>
    </nav>
    <CategoryPanel openCategoryPanel={openCategoryPanel}  isOpenCategoryPanel={isOpenCategoryPanel} />
    </>

  )
}

export default Navigation
