import React from 'react'
import HomeSlider from '../../components/HomeSlider'
import HomeCatSlider from '../../components/HomeCatSlider'

import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from '../../components/AdsBannerSlider';


const Home = () => {
  return (
   <>
   <HomeSlider/>
   <HomeCatSlider/>
   <section className='py-16 bg-white '>
    <div className="container">
      <div className="freeShipping w-full  p-4 border-2 border-[var(--primary)] flex items-center justify-between rounded-md mb-5 ">
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

   <AdsBannerSlider itemCount={4}/>
    </div>
   

   </section>

   <br />
   <br />
   <br />
   <br />
   <br />
   <br />
   </>
  )
}

export default Home
