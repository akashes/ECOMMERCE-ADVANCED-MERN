import React, { useContext } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../../contexts/MyContext'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setCategories, setSubCategories } from '../../features/productsFilter/productsFilterSlice'
import axios from 'axios'
import { showWarning } from '../../utils/toastUtils'

const BannerBoxV2 = ({banner}) => {
  const context = useContext(MyContext)
  const navigate = useNavigate()
 const dispatch = useDispatch()


  const handleClick=async()=>{

    if(banner.product){


            const { data } = await axios.get(`/api/product/get-product/${banner.product}`);
            if(data?.success){

              
              
              navigate( `/product/${banner.product}`)
            }else{
              showWarning('product not available')
            }
    }
    else if (banner.thirdSubCatId) {
      
           try {
             const { data } = await axios.get(`/api/product/get-product-by-third-sub-category/${banner.thirdSubCatId}`);
            if(data?.success){

              
              
              navigate(`/products?subCatId=${banner.thirdSubCatId}&page=1`)
              dispatch(setSubCategories(banner.thirdSubCatId))
            }else{
              showWarning('Subcategory not found')
            }
           } catch (error) {
            showWarning('Subcategory not found')
           }

  }
  else if (banner.subCatId) {
         try {
           const { data } = await axios.get(`/api/product/get-product-by-sub-category/${banner.subCatId}`);
          if(data?.success){

            
            navigate( `/products?subCatId=${banner.subCatId}&page=1`)
            dispatch(setSubCategories(banner.subCatId))
            return
          }else{

            showWarning('Subcategory not found')
          }
         } catch (error) {
          showWarning('Subcategory not found')
          
         }
         

  }
  else if (banner.category) {
    try {
            const { data } = await axios.get(`/api/product/get-product-by-category/${banner.category}`);
          if(data?.success){

            
            navigate(`/products?category=${banner.category}&page=1`)
            dispatch(setCategories([banner.category]))
          }else{
            showWarning('Category not found')
          }
    } catch (error) {
      showWarning('Category not found')
    }
  }  
  }
  return (
    <div className='group bannerBoxV2 w-full overflow-hidden rounded-md group relative h-[150px] md:h-[250px] lg:h-[300px] ' >
        <img src={banner.bannerImage.url}
         alt="" className='w-full transition-all duration-150 ease-in-out group-hover:scale-105 ' />
         <div className={`info absolute w-[50%] top-0 h-[full%]  z-50  p-1 md:p-3 lg:p-5 flex items-start  justify-center lg:justify-center flex-col gap-1 lg:gap-2 ${banner?.alignInfo==='left'?'left-0':'right-0'}`}>
            <h2 className='text-[13px] sm:text-[14px]  md:text-[18px] font-[600]'>
  {banner.title?.length > (context.windowWidth > 992 ? 70 : 30) 
    ? banner.title.substr(0, context.windowWidth > 992 ? 70 : 30) + "..." 
    : banner.title}              </h2>
            <span className='text-[13px] md:text-[18px] lg:text-[20px] text-primary font-[600] w-full'>₹{banner?.price}</span>
            <div className='w-full '>
               <Button onClick={handleClick} className='text-[12px] lg:text-[16px] font-[600] link !text-gray-700 hover:!text-gray-900 hover:!bg-gray-400  transition-colors duration-300  '>
            SHOP NOW
            </Button>
            </div>
            
         </div>
      
    </div>
  )
}

export default BannerBoxV2
