import React, { useEffect } from 'react'
import HomeSlider from '../../components/HomeSlider'
import HomeCatSlider from '../../components/HomeCatSlider'

import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from '../../components/AdsBannerSlider';







// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import HomeSliderV2 from '../../components/HomeSliderV2';
import BannerBoxV2 from '../../components/BannerBoxV2';
import AdsBannerSliderV2 from '../../components/AdsBannerSliderV2';
import {  useSelector } from 'react-redux';


import AdsBannerSkeletonSlider from '../../components/Skeltons/AdsBannerSkeltonSlider';
import PopularProducts from '../../components/PopularProducts';
import LatestProducts from '../../components/LatestProducts';
import FeaturedProducts from '../../components/FeaturedProducts';
import BlogSection from '../../components/BlogSection';




const Home = () => {



    const{banners,loading:adsBannerV1Loading}=useSelector(state=>state.bannerV1)
    





const getRandomBanners = (arr, count = 2) => {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const randomBanners = React.useMemo(() => getRandomBanners(banners, 2), [banners]);






  // Observer for featured products
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting && !featuredTriggered) {
//             dispatch(fetchFeaturedProducts());
//             setFeaturedTriggered(true);
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     if (featuredRef.current) observer.observe(featuredRef.current);
//    return () => {
//    if (featuredRef.current) observer.unobserve(featuredRef.current);
// };
//   }, [dispatch, featuredTriggered]);

// useEffect(()=>{
//   dispatch(fetchFeaturedProducts())
// },[dispatch])



  // useEffect(()=>{
  //   dispatch(getAllBlogs())

  // },[])



  useEffect(()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });


  },[])



  return (
   <>
   <HomeSlider/>
   <HomeCatSlider/>
   <PopularProducts/>



      {/* secondary banners */}
   <section className='py-2 lg:py-6 bg-white'>
    <div className="container flex flex-col lg:flex-row   gap-2  lg:gap-5  ">
      <div className="section1  w-full lg:w-[70%]    ">

      <HomeSliderV2  />
      </div>
      <div className="section2 w-full lg:w-[30%]  flex flex-row lg:flex-col justify-between items-center gap-3 lg:gap-5   " 
      >
        {
         randomBanners?.length>0 && randomBanners.map((item)=>(

            <BannerBoxV2 banner={item}  />
          ))
        }
      </div>

    </div>
   </section> 
   





  {/* ads banners section with multiple views */}
   <section className='py-2  lg:py-4   bg-white '>
    <div className="container">
      {/* free shipping info section */}
      <div className="freeShipping w-full  md:w-[80%] mx-auto  p-4 border-2 border-[var(--primary)] flex flex-col lg:flex-row items-center justify-center  lg:justify-between rounded-md  cursor-pointer ">
        <div className="col1 flex items-center gap-4">
        <LiaShippingFastSolid className=  ' text-[30px] md:text-[40px] lg:text-[50px]'/>
        <span className=' text-[16px] lg:text-[20px] font-[600]'>Free Shipping</span>

        </div> 
        <div className="col2">
          <p className='mb-0 text-center lg:text-left font-[500]'>Free Delivery Now On Your First Order and Order over ₹249</p>
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
   <section className="py-5 pt-0 bg-white">
    <div className="container">
      <LatestProducts/>

      <AdsBannerSlider itemsCount={3} />
    </div>
   </section>

  {/* Featured Products */}
   <section className=" py-2  md:py-3 lg:py-5 pt-0 bg-white">
    <div className="container">
      
        <FeaturedProducts/>
      <AdsBannerSlider itemsCount={3} />
    </div>
   </section>

   <BlogSection/>



   </>
  )
}

export default Home
