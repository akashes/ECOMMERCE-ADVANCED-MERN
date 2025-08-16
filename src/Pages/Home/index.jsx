import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { fetchLatestProducts } from '../../features/latestProducts/latestProducts';
import { fetchFeaturedProducts } from '../../features/featuredProducts/featuredProducts';
import ProductItemSkeleton from '../../components/Skeltons/ProductItemSkelton';
import { MdOutlineSearchOff } from 'react-icons/md';
import ProductsSkelton from '../../components/ProductsSkelton';
import { fetchBannerV1 } from '../../features/bannerV1Slice';
import AdsBannerSkeletonSlider from '../../components/Skeltons/AdsBannerSkeltonSlider';
import { getAllBlogs } from '../../features/blog/blogSlice';




const Home = () => {

  const dispatch = useDispatch()


    const latestRef = useRef(null);
  const featuredRef = useRef(null);

  const [latestTriggered, setLatestTriggered] = useState(false);
  const [featuredTriggered, setFeaturedTriggered] = useState(false);
  
  const{categories}=useSelector(state=>state.category)
    const { productsByCategory,loading:popularProductsLoading } = useSelector(state => state.popularProducts);
    const{latestProducts,loading:latestProductsLoading}=useSelector(state=>state.latestProducts)
    const{featuredProducts,loading:featuredProductsLoading}=useSelector(state=>state.featuredProducts)
    const{banners,loading:adsBannerV1Loading}=useSelector(state=>state.bannerV1)
    const{blogs,loading:blogsLoading}=useSelector(state=>state.blog)
    console.log(banners)
    



    const [value, setValue] = React.useState(0);
    //popular products active tab handler
const handleChange = useCallback((event, newValue) => {
  setValue(newValue);
}, []);



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


    useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !latestTriggered) {
            dispatch(fetchLatestProducts());
            setLatestTriggered(true);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (latestRef.current) observer.observe(latestRef.current);
    return () => {
  if (latestRef.current) observer.unobserve(latestRef.current);
};
  }, [dispatch, latestTriggered]);

  // Observer for featured products
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !featuredTriggered) {
            dispatch(fetchFeaturedProducts());
            setFeaturedTriggered(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featuredRef.current) observer.observe(featuredRef.current);
   return () => {
   if (featuredRef.current) observer.unobserve(featuredRef.current);
};
  }, [dispatch, featuredTriggered]);

  useEffect(()=>{
    dispatch(fetchBannerV1())

  },[])

  useEffect(()=>{
    dispatch(getAllBlogs())

  },[])

  return (
   <>
   <HomeSlider/>


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
        {/* <div className="flex items-center gap-5 animate-pulse">
          <div className="col w-[20%] h-[250px]">
              <div className="  flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm  dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>


          </div>

        </div> */}
        {/* skelton when loading  */}
        {
          popularProductsLoading &&  <ProductsSkelton count={6}/>
      
        }
        {
          !popularProductsLoading && popularProducts?.length===0 &&  
          <div className="w-full h-[400px] flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-md shadow-sm border border-gray-200">
      <MdOutlineSearchOff className="text-5xl mb-2" />
      <p className="text-lg font-medium">No items found</p>
      <p className="text-sm text-gray-400">Try selecting a different category.</p>
    </div>
        }
      {
        popularProducts &&
      <ProductsSlider items={popularProducts} itemsCount={popularProducts?.length} />

      }
    </div>
   </section>



      {/* secondary banners */}
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



{
  adsBannerV1Loading ? (
    <AdsBannerSkeletonSlider itemsCount={4}/>
  ) : (
    banners?.length>0 && (
      <AdsBannerSliderV2 banners={banners} itemsCount={4} />

    )

  )
}

    </div>
   

   </section>

 {/* latest products and ads banner section  */}
   <section ref={latestRef} className="py-5 pt-0 bg-white">
    <div className="container">
      <h2 className='text-[20px] font-[600]'>Latest Products</h2>
       {
          latestProductsLoading ?(

            <ProductsSkelton count={6}/>
          )
          : latestProducts.length>0 ? (

            <ProductsSlider items={latestProducts} itemsCount={6}/>
          ):(
            latestTriggered && (
                     <div className="w-full h-[400px] flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-md shadow-sm border border-gray-200">
      <MdOutlineSearchOff className="text-5xl mb-2" />
      <p className="text-lg font-medium">No items found</p>
    </div>
            )
          )
        }

      <AdsBannerSlider itemsCount={3} />
    </div>
   </section>

  {/* Featured Products */}
   <section ref={featuredRef} className="py-5 pt-0 bg-white">
    <div className="container">
      {featuredProductsLoading || featuredProducts.length>0 &&
      <h2 className='text-[20px] font-[600]'>Featured Products</h2>
      
      }
          {
          featuredProductsLoading ? (

            <ProductsSkelton count={6}/>
            
          ):
          featuredProducts.length>0 && (

            <ProductsSlider items={featuredProducts} itemsCount={6}/>
          ) 

        }
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
        {
          blogs?.length>0 && blogs.map((blog)=>(
                   <SwiperSlide key={blog._id} >
          <BlogItem blog={blog} />
        </SwiperSlide>

          ))
        }
 
 

      </Swiper>
      
    </div>

   </section>



   </>
  )
}

export default Home
