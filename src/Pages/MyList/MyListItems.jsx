

import React,{useContext, useState} from 'react'
import { IoIosClose, IoMdInformationCircleOutline } from 'react-icons/io';
import { VscTriangleDown } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import  Rating  from '@mui/material/Rating';
import { Alert, Button } from '@mui/material';
import { addToCart } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlistReducer, removeWishlistItem } from '../../features/wishList/wishListSlice';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { AuthContext } from '../../contexts/AuthContext';


const MyListItems = ({item}) => {

  const[showAlert,setShowAlert]=useState(false)
  const context = useContext(AuthContext)
  const{wishlist}=useSelector(state=>state.wishlist)
  console.log(wishlist)

  const wishlistItemId = wishlist.find(i=>i.productId?._id===item?._id)?._id
  console.log(wishlistItemId)
  const dispatch = useDispatch()
  console.log(item)

  const handleMoveToCart=async(itemId,productId)=>{
    if(!context.user){
      showWarning('Login to use Cart functionalities')
      return
    }
          const resultAction = await dispatch(addToCart(productId))
          console.log(resultAction)
          if(addToCart.fulfilled.match(resultAction)){
            const removeListItemResult = await dispatch(removeWishlistItem({wishlistItemId:itemId,user:context.user}))
            if(removeWishlistItem.fulfilled.match(removeListItemResult)){
              showSuccess('Item moved to Cart')
              return
            }else{
              showError('Failed to move item to Cart')
              return
            }
          }else{
              // showError(resultAction.payload || 'Failed to move item to Cart')
              if(resultAction.payload=='Product already in cart'){
                setShowAlert(true)

              }
            
          }
    
  }

  const handleRemoveFromWishlist=async(id)=>{
  const resultAction =   await dispatch(removeWishlistItem({wishlistItemId:id,user:context.user}))
  if(removeWishlistItem.fulfilled.match(resultAction)){
    showSuccess("Item removed from Wishlist")
  }
  if(removeWishlistItem.rejected.match(resultAction)){
    showError("Error removing item from Wishlist")
  }

  }

  return (
     <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
              {/* product image */}
              <div className="img w-[15%] h-[150px] rounded-md overflow-hidden">
                <Link className="group">
                  <img
                    src={item.productId?.images[0]?.url}
                    alt=""
                    className="w-full group-hover:scale-105 transition-transform "
                  />
                </Link>
              </div>
              {/* product info */}
              <div className="info w-[85%] relative">
                <IoIosClose onClick={()=>{
               
                    handleRemoveFromWishlist(item._id)
                  
                }} className="text-[25px] bg-gray-100 rounded-full text-gray-500 cursor-pointer absolute top-[0px] right-[0px] link transition-colors" />
                <span className="text-[13px]">{item.productId?.brand}</span>
                <h3 className="text-[15px]">
                  <Link to={`/product/${item.productId?._id ||item.productId}`} className="link">
                    {item.productId?.name.substr(0,50)+'...'}
                  </Link>
                </h3>
                <Rating
                  readOnly
                  name="size-small"
                  value={item.productId?.rating}
                  size="small"
                />
               
                <div className="flex items-center gap-4 mt-2 mb-2">
                  <span className="price  font-[600] text-[14px]">₹{item.productId?.price}</span>

                  <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                    ₹{item.productId?.oldPrice}
                  </span>
                  <span className="price text-primary font-[600] text-[14px]">
                    {item.productId?.discount>0 ? item.productId?.discount+'% OFF':''}
                  </span>
                </div>{
                  showAlert ?
                  <>
                   <Alert
       className='mt-5 !w-[200px]'
      severity="info"
      icon={<IoMdInformationCircleOutline size={22} />}
      sx={{
        mb: 2,
        borderRadius: 2,
        fontSize: "0.9rem",
        bgcolor: "rgba(33, 150, 243, 0.08)",
      }}
    >
      Item already in Cart:

    </Alert>
                        <Button onClick={()=>handleRemoveFromWishlist(item._id)} className='btn-org btn-sm !p-2'>Remove from Wishlist</Button>
                  </>

    
    : 
    <>
       <Button  onClick={()=>handleMoveToCart(item._id,item.productId._id)} className={`btn-org btn-sm ${!context.user && 'opacity-50'}`}>Move to Cart</Button>
   
    
    </>

                }

       
              </div>
            </div>
  )
}

export default MyListItems
