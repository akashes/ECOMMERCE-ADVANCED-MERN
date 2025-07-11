import React from 'react'
import HomeSlider from '../../components/HomeSlider'
import HomeCatSlider from '../../components/HomeCatSlider'

import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from '../../components/AdsBannerSlider';



import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductsSlider from '../../components/ProductsSlider';


const Home = () => {

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
   <>
   <HomeSlider/>
   <HomeCatSlider/>
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




   <section className='py-16 bg-white '>
    <div className="container">
      <div className="freeShipping w-[80%] mx-auto  p-4 border-2 border-[var(--primary)] flex items-center justify-between rounded-md mb-5 ">
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
