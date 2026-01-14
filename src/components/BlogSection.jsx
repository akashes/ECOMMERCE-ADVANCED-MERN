import React, { useEffect } from 'react'
import BlogItemSkeleton from './Skeltons/BlogItemSkelton'
import BlogItem from './BlogItem'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { useDispatch, useSelector } from 'react-redux'
import { FreeMode, Navigation } from 'swiper/modules';
import { getAllBlogs } from '../features/blog/blogSlice';


const BlogSection = () => {
        const{blogs,loading:blogsLoading}=useSelector(state=>state.blog)
        const dispatch = useDispatch()
        useEffect(()=>{
          dispatch(getAllBlogs())

        },[dispatch])
        
         

  return (
      <section className=' blogSection py-5 pt-0 pb-3 lg:pb-8 bg-white'>
    <div className="container">
      <h2 className='text-[20px] font-[600] mb-4'>From The Blog</h2>
       <Swiper
        
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
          freeMode={true}
               modules={[Navigation,FreeMode]}
                          breakpoints={{
    0: { slidesPerView: 1,spaceBetween:10 },  
           330:{slidesPerView:2,spaceBetween:20},
           500:{slidesPerView:2,spaceBetween:30},
    700: { slidesPerView: 4,spaceBetween:30 },

        }}
        className="blogSlider "
      >
        {
          blogs?.length>0 ? blogs.map((blog)=>(
                   <SwiperSlide
                   
                   key={blog._id} >
          <BlogItem blog={blog} />
        </SwiperSlide>

          ))
          :
            Array.from({ length: 4 }).map((_, index) => (
        <SwiperSlide key={index}>
          <BlogItemSkeleton />
        </SwiperSlide>
      ))

        }
 
 

      </Swiper>
      
    </div>

   </section>
  )
}

export default BlogSection
