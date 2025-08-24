import React, { useContext, useEffect, useRef, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";

import Rating from '@mui/material/Rating';
import  Button  from "@mui/material/Button";




import TextField from '@mui/material/TextField';
import ProductsSlider from "../../components/ProductsSlider";
import ProductInfo from "../../components/ProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { addReview, fetchProductById, getRelatedProducts } from "../../features/product/productSlice";
import { CircularProgress, Typography } from "@mui/material";
import ProductDetailsSkeleton from "../../components/Skeltons/ProductDetailsSkelton";
import { showError, showWarning } from "../../utils/toastUtils";
import { AuthContext } from "../../contexts/AuthContext";
import { MyContext } from "../../App";
import { addToCart } from "../../features/cart/cartSlice";

const ProductDetails = () => {
    const{user}=useContext(AuthContext)
    const{user:contextUser}=useContext(MyContext)
    console.log(user)
    let reviewRef = useRef()
    const {id}=useParams()
    const dispatch = useDispatch()
    const{product,loading,reviewLoading,relatedProducts,relatedProductsLoading}=useSelector(state=>state.product)
    console.log(product)

    const[productRating,setProductRating]=useState(1)
    const[review,setReview]=useState('')


    const handleAddReview=async()=>{
        if(!user){
            showWarning('You are not logged in ')
            return
        }
        console.log(productRating,review)
        if(!productRating){
            showWarning('Please Provide a Rating')
            return
        }
        if(productRating<1){
            showWarning('Minimum of 1 Rating is required')
            return
        }
       const resultAction =  await dispatch(addReview({productId:id,rating:productRating,comment:review,userId:user._id}))
       console.log(resultAction)
        if (addReview.fulfilled.match(resultAction)) {
            window.scrollTo({top:reviewRef.current.offsetTop,behavior:"smooth"})
            // dispatch(fetchProductById(id))
            setProductRating(1)
            setReview('')

        }
        if(addReview.rejected.match(resultAction)){
            
            showError(resultAction.payload || resultAction.error.message)
        }


    }
   


    // tabs state  for product details/description/reviews
    const[activeTab,setActiveTab]=useState(0)

    const goToReviews=()=>{
                    window.scrollTo({top:reviewRef.current.offsetTop-170,behavior:"smooth"})
                    setActiveTab(2)


    }
    useEffect(()=>{
        if(id){
            dispatch(fetchProductById(id))
        }

    },[dispatch,id])

const category = product?.category;
const subCat = product?.subCat;
const thirdSubCat = product?.thirdSubCat;
 
useEffect(()=>{
                window.scrollTo({ top: 0, behavior: "smooth" });

},[])
useEffect(()=>{
        if(id){

            dispatch(getRelatedProducts(id))
        }

},[id])
        return (
 <>
    {/* breadcrumbs container */}
    <div className="py-5 ">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
        {
            category?.name && (
                  <Link
            className="link transition !text-[14px]"
            underline="hover"
            color="inherit"
            href="/"
          >
            {category?.name}
          </Link>

            )
        }
        
        {subCat && (
    <Link
      underline="hover"
      color="inherit"
      className="link transition"
      to={`/products?subCatId=${product?.subCatId}`}
    >
      {subCat}
    </Link>
  )}

  {thirdSubCat && (
    <Typography sx={{ color: "text.primary" }}>
      {thirdSubCat}
    </Typography>
  )}
        </Breadcrumbs>
      </div>
 
    </div>
    {
        loading ? <ProductDetailsSkeleton/> : (
            <section className="bg-white py-5">
       
             <div className="container flex gap-8 items-center ">
                {/* product image section */}
        <div className="productZoomContainer w-[40%]  ">
            <ProductZoom images={product?.images} />
        </div>

        {/* product information section */}
        <div className=" productContent w-[60%] pr-10 pl-10">
        <ProductInfo product={product} goToReviews={goToReviews} />
    


            

        </div>
        

      </div>


      <div className="container pt-10" ref={reviewRef}>
        <div className="flex items-center gap-8 mb-5">
            <span className={` text-[17px] cursor-pointer font-[500] transition-colors duration-300 ease-in-out px-3 py-1 rounded-full
                 ${activeTab===0 && 'text-white bg-primary  '} `}  onClick={()=>setActiveTab(0)}>Description</span>
            {/* <span className={` text-[17px] cursor-pointer font-[500] transition-colors duration-300 ease-in-out px-3 py-1 rounded-full
                 ${activeTab===1 && 'text-white bg-primary  '} `}  onClick={()=>setActiveTab(1)}>Product Details</span> */}
            <span className={` text-[17px] cursor-pointer font-[500] transition-colors duration-300 ease-in-out px-3 py-1 rounded-full
                 ${activeTab===2 && 'text-white bg-primary  '} `}  onClick={()=>setActiveTab(2)}>Reviews ({product?.numReviews})</span>
        </div>
      {
        activeTab===0 && (
                 <div className="shadow-md w-full py-5 px-8 rounded-md">
                    <p>
                        {product?.description}
                    </p>
           
            

        </div>
        )
      }
      {/* {
        activeTab===1 &&(
            
                 <div className="shadow-md w-full py-5 px-8 rounded-md">

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
        </thead>
  
    </table>
</div>
</div>

                
        )
      } */}
      {
        activeTab===2 && (
                 <div className="shadow-md w-[80%] py-5 px-8 rounded-md">

            <div  className="w-full productReviewContainer">
                <h2 className="text-[18px]">Customer Reviews </h2>
                <div className="reviewsContainer w-full max-h-[300px] overflow-y-scroll  overflow-x-hidden  mt-5 ">

                    {/* review */}
                    {
                        product?.reviews?.length>0 && [...product?.reviews].reverse().map((review)=>(
                                  <div className="review py-5 pr-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
                        <div className="info w-[60%] flex items-center gap-3 ">
                            <div className="img w-[80px] h-[80px] rounded-full overflow-hidden">
                                {
                                    review.user.avatar.url ? 
                                    <img
                                    
                                     src={review.user.avatar.url} alt=""
                                     className="h-full w-full object-cover"
                                     />
                                     :
                                     <img
                                     
                                      src={'https://res.cloudinary.com/dllelmzim/image/upload/v1753808261/user_dhgqbt.png'} alt=""
                                      className="w-[80px] h-[80px] rounded-full overflow-hidden object-cover"
                                      />

                                }
                            </div>
                            <div className="w-[80%]">
                                <h4 className="text-[16px]">{review.user.name}</h4>
                                <h5 className="text-[13px] mb-0">{review.createdAt}</h5>
                                <p className="mt-0 mb-0">{review.comment}</p>
                            </div>
                        </div>
            <Rating name="size-medium" value={review.rating} size="medium" precision={0.5} readOnly />



                    </div>

                        ))
                    }
              
               
                
            

                </div>

                <br />
                {/* write review */}
                <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md">
                    <h2 className="text-[18px]">Add a Review</h2>
                    <form className="w-full">
                       <TextField
                       onChange={(e)=>setReview(e.target.value)}
                       value={review}
                       className="w-full !my-5 "
          id="outlined-multiline-static"
          label="your review"
          multiline
          rows={5}
        />
        <Rating size="medium" value={productRating} precision={0.5} onChange={(e)=>setProductRating(e.target.value)} />
        <div className="flex items-center mt-5">
            <Button onClick={handleAddReview} className="btn-org min-w-[250px]">
                
                    {reviewLoading?"Submitting Review" : "Submit Review"} 
                
                
            </Button>

        </div>
                    </form>


                </div>

            </div>

        </div>

        )
      }
      </div>
      {
        relatedProducts?.length>0 && 
         <div className="container !mt-8">
          <h2 className='text-[20px] font-[600]'>Related Products</h2>
   
      <ProductsSlider items={relatedProducts} itemsCount={relatedProducts.length}/>
          

      </div>
      }
     
    </section>
            
        )
    }
    
 </>
  );
};

export default ProductDetails;
