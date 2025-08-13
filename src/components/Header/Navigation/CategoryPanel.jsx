import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { IoCloseSharp } from "react-icons/io5";

import { useEffect, useState } from 'react';
import CategoryCollapse from '../../CategoryCollapse';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuCategories } from '../../../features/category/categoryMenuSlice';


const CategoryPanel = (props) => {
  const{categories}=useSelector(state=>state.category)



    // const openSubmenu=(index)=>{
    //     if(submenuIndex === index){
    //         return setSubmenuIndex(null)
    //     }
    //      setSubmenuIndex(index)
    // }

    // const openInnerSubmenu=(index)=>{
    //     if(innerSubMenuIndex === index){
    //         return setInnerSubMenuIndex(null)
    //     }
    //      setInnerSubMenuIndex(index)
    // }



    const DrawerList = (
    <Box 
    // sx={{ width: 250 }}
     role="presentation" className='categoryPanel px-3'
    //  onClick={()=>props.openCategoryPanel(false)}
     >
        <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>
            Shop By Categories
             <IoCloseSharp onClick={()=>props.openCategoryPanel(false)} className='cursor-pointer text-[20px]' />
                 </h3>

                {
                  categories.length!==0 &&   <CategoryCollapse />
                }
                
                 
   
  
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
