import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductsSlider from './ProductsSlider'
import ProductsSkelton from './ProductsSkelton'
import { fetchFeaturedProducts } from '../features/featuredProducts/featuredProducts'

const FeaturedProducts = () => {
        const{featuredProducts,loading:featuredProductsLoading}=useSelector(state=>state.featuredProducts)

        const dispatch = useDispatch()

        useEffect(()=>{
          dispatch(fetchFeaturedProducts())

        },[])
  return (
    <>
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
    </>
  )
}

export default FeaturedProducts
