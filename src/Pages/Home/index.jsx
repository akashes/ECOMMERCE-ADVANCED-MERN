import React from 'react'
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
import Footer from '../../components/Footer';



const Home = () => {

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
   <>
   <HomeSlider/>
   <HomeCatSlider/>

   {/* shows products by category using tabs */}
   <section className='bg-white py-8 '>
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="leftSec">
          <h2 className='text-[20px] font-[600]'>Popular Products</h2>
          <p className='text-[14px] font-[400]'>Do not miss out on our most popular products</p>
        </div>
        <div className="rightSec w-[60%]">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Fashion" />
        <Tab label="Electronics" />
        <Tab label="Bags" />
        <Tab label="Footwear" />
        <Tab label="Groceries" />
        <Tab label="Wellness" />
        <Tab label="Jewellery" />
    
      </Tabs>
        </div>
      </div>
      <ProductsSlider itemsCount={6} />
    </div>
   </section>

  {/* ads banners section with multiple views */}
   <section className='py-4 pt-2  bg-white '>
    <div className="container">
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

   <AdsBannerSlider itemsCount={4}/>
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

 <Footer/>


   </>
  )
}

export default Home
