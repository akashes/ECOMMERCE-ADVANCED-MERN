import { Tab, Tabs } from '@mui/material';
import React, { useCallback, useEffect } from 'react'
import { MdOutlineSearchOff } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import ProductsSlider from './ProductsSlider';
import ProductsSkelton from './ProductsSkelton';
import { fetchPopularProductsByCategory } from '../features/popularProducts/popularProducts';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion'

const PopularProducts = () => {
    const dispatch = useDispatch()
    const{categories}=useSelector(state=>state.category)
    console.log(categories) 
        const { productsByCategory,loading:popularProductsLoading } = useSelector(state => state.popularProducts);
    
       const [value, setValue] = React.useState(0);
       console.log(value)
        //popular products active tab handler
    const handleChange = useCallback((event, newValue) => {
      setValue(newValue);
    }, []);
    
  const currentCategoryId =categories?.length>0 ? categories?.[value]?._id:null
  console.log(currentCategoryId)
  const popularProducts=productsByCategory[currentCategoryId]||[]
  console.log(popularProducts)
    useEffect(()=>{
        //fetching only if not present in state
        if( currentCategoryId && !productsByCategory[currentCategoryId]){
          dispatch(fetchPopularProductsByCategory(currentCategoryId))
        }
      
  
    },[currentCategoryId,dispatch,productsByCategory])

  return (
  <section className='bg-white py-3 md:py-5 lg:py-8 '>
    <div className="container ">
      <div className="flex items-center justify-between flex-col lg:flex-row ">
        <div className="leftSec w-full lg:w-[40%]">
          <h2 className=' text-[14px] md:text-[16px] lg:text-[20px] font-[600]'>Popular Products</h2>
          <p className=' text-[12px] sm:text-[14px] md:text-[16px]   lg:text-[14px] font-[400] mt-0 mb-0'>Do not miss out on our most popular products</p>
        </div>
        <div className="rightSec w-full lg:w-[60%]">
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
  
        {/* skelton when loading  */}
        <AnimatePresence mode='wait'>

        {
          popularProductsLoading ? 
          (
           <motion.div
           key="skelton"
           key={currentCategoryId}
            initial={{opacity:0,x:20}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-20}}
            transition={{duration:0.3}}
           >

               <ProductsSkelton />
           </motion.div>
        ) : popularProducts?.length>0 ?
        (
            <motion.div
            key={currentCategoryId}
            initial={{opacity:0,x:20}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-20}}
            transition={{duration:0.3}}
            >

                  <ProductsSlider key={currentCategoryId} items={popularProducts} itemsCount={popularProducts?.length} />
            </motion.div>


        ):(
              <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full h-[400px] flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-md border border-dashed border-gray-300"
  >
    <MdOutlineSearchOff className="text-6xl text-gray-300 mb-4" />
    <h3 className="text-xl font-semibold text-gray-700">No Products Found</h3>
    <p className="text-sm text-gray-400 max-w-[250px] text-center mt-2">
      We couldn't find any popular products in this category right now.
    </p>
  </motion.div>

)

}
</AnimatePresence>
      
  
    </div>
   </section>

  )
}

export default React.memo(PopularProducts)
