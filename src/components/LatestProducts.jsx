import React, { useEffect } from 'react'
import ProductsSkelton from './ProductsSkelton'
import ProductsSlider from './ProductsSlider'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLatestProducts } from '../features/latestProducts/latestProducts'

const LatestProducts = () => {
        const{latestProducts,loading:latestProductsLoading}=useSelector(state=>state.latestProducts)

        const dispatch = useDispatch()

        useEffect(()=>{
          dispatch(fetchLatestProducts())
          
        },[])
  return (
    <div>
         {
          latestProductsLoading || latestProducts.length>0 &&   <h2 className='text-[20px] font-[600]'>Latest Products</h2>
        }
     
       {
          latestProductsLoading ?(

            <ProductsSkelton count={6}/>
          )
          : latestProducts.length>0 && (

            <ProductsSlider items={latestProducts} itemsCount={6}/>
          )
   
        }
    </div>
  )
}

export default LatestProducts
