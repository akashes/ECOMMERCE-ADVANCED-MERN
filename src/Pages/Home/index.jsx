import React, { useEffect, useState } from 'react'
import HomeSlider from '../../components/HomeSlider'
import HomeCatSlider from '../../components/HomeCatSlider'

import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from '../../components/AdsBannerSlider';



import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BlogItem from '../../components/BlogItem';
import HomeSliderV2 from '../../components/HomeSliderV2';
import BannerBoxV2 from '../../components/BannerBoxV2';
import AdsBannerSliderV2 from '../../components/AdsBannerSliderV2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularProductsByCategory } from '../../features/popularProducts/popularProducts';



const Home = () => {

  const dispatch = useDispatch()
  
  const{categories}=useSelector(state=>state.category)
    const { productsByCategory, loading } = useSelector(state => state.popularProducts);

 



    const [value, setValue] = React.useState(0);
    //popular products active tab handler
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  useEffect(()=>{
    if(categories.length>0){
      const categoryId = categories[value]?._id
      //fetching only if not present in state
      if(!productsByCategory[categoryId]){
        dispatch(fetchPopularProductsByCategory(categoryId))
      }
    }

  },[value,categories,dispatch])

  const currentCategoryId = categories[value]?._id
  const popularProducts=productsByCategory[currentCategoryId]||[]

  console.log(currentCategoryId)
  console.log(popularProducts)

  return (
   <>
   <HomeSlider/>
   <section className='py-6'>
    <div className="container flex   gap-5  ">
      <div className="section1 w-[70%]    ">

      <HomeSliderV2  />
      </div>
      <div className="section2 w-[30%] flex flex-col justify-between items-center gap-5  " 
      >
        <BannerBoxV2 info="left" src={"https://res.cloudinary.com/dllelmzim/image/upload/v1752300372/1741664496923_1737020250515_New_Project_47_rsj6yc.jpg"}  />
        <BannerBoxV2 info="right" src={"https://res.cloudinary.com/dllelmzim/image/upload/v1752300372/1741664665391_1741497254110_New_Project_50_fwovj5.jpg"} />
      </div>

    </div>
   </section>
   <HomeCatSlider/>

   {/* shows products by category using tabs */}
   <section className='bg-white py-8 '>
    <div className="container">
      <div className="flex items-center justify-between ">
        <div className="leftSec">
          <h2 className='text-[20px] font-[600]'>Popular Products</h2>
          <p className='text-[14px] font-[400] mt-0 mb-0'>Do not miss out on our most popular products</p>
        </div>
        <div className="rightSec w-[60%]">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {
          categories?.length>0 && categories.map((category)=>(

            <Tab key={category._id} label={category.name} />
          ))

        }
      
    
      </Tabs>
        </div>
      </div>
      {
        popularProducts &&
      <ProductsSlider items={popularProducts} itemsCount={popularProducts?.length} />

      }
    </div>
   </section>

  {/* ads banners section with multiple views */}
   <section className='py-4 pt-2  bg-white '>
    <div className="container">
      {/* free shipping info section */}
      <div className="freeShipping w-[80%] mx-auto  p-4 border-2 border-[var(--primary)] flex items-center justify-between rounded-md mb-5 cursor-pointer ">
        <div className="col1 flex items-center gap-4">
        <LiaShippingFastSolid className='text-[50px]'/>
        <span className='text-[20px] font-[600]'>Free Shipping</span>

        </div>
        <div className="col2">
          <p className='mb-0 font-[500]'>Free Delivery Now On Your First Order and Order over <span className='font-[600]'>₹249</span> </p>
        </div>
        <p className='font-bold text-[20px]'>
          - ONLY ₹249
        </p>
        

      </div>




   <AdsBannerSliderV2 itemsCount={4}/>
    </div>
   

   </section>

 {/* latest products and ads banner section  */}
   <section className="py-5 pt-0 bg-white">
    <div className="container">
      <h2 className='text-[20px] font-[600]'>Latest Products</h2>
      <ProductsSlider itemsCount={6}/>

      <AdsBannerSlider itemsCount={3} />
    </div>
   </section>

  {/* Featured Products */}
   <section className="py-5 pt-0 bg-white">
    <div className="container">
      <h2 className='text-[20px] font-[600]'>Featured Products</h2>
      <ProductsSlider itemsCount={6}/>
      <AdsBannerSlider itemsCount={3} />
    </div>
   </section>

   <section className=' blogSection py-5 pt-0 pb-8 bg-white'>
    <div className="container">
      <h2 className='text-[20px] font-[600] mb-4'>From The Blog</h2>
       <Swiper
        
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="blogSlider "
      >
        <SwiperSlide>
          <BlogItem/>
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem/>
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem/>
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem/>
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem/>
        </SwiperSlide>
      </Swiper>
      
    </div>

   </section>



   </>
  )
}

export default Home
