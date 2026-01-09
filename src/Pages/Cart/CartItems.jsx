

import React,{useContext, useState} from 'react'
import { IoIosClose } from 'react-icons/io';
import { VscTriangleDown } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import  Rating  from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCart } from '../../features/cart/cartSlice';
import { showError, showSuccess } from '../../utils/toastUtils';
import { MyContext } from '../../contexts/MyContext';

const CartItems = ({item,size}) => {
  const context = useContext(MyContext)
  const dispatch = useDispatch()
  console.log(item)
        // menu component related 
  const [sizeAnchorEl, setSizeAnchorEl] = React.useState(null);
  const[selectedSize,setSelectedSize]=useState(size)
  const openSize = Boolean(sizeAnchorEl);
  
  
  const [qtyAnchorEl, setQtyAnchorEl] = React.useState(null);
  const[selectedQty,setSelectedQty]=useState(item.quantity)
  const openQty = Boolean(qtyAnchorEl);

  const stock = item.productId.countInStock

  const isOutOfStock = stock ===0
  const exceedsStock = selectedQty>stock

  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };
  const handleCloseSize = (value) => {
      setSizeAnchorEl(null);
    if(value!==null){
        setSelectedSize(value)
    }
  };


  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty=()=>{
   setQtyAnchorEl(null)
  }
  const handleChangeQty = async(value) => {
    if(!value) return
      setQtyAnchorEl(null);
      if(value===item.quantity){
        setQtyAnchorEl(null)
        return
      }
    if(value!==null){
        setSelectedQty(value)
        const resultAction = await dispatch(updateCart({cartItemId:item._id,quantity:value}))
        console.log(resultAction)
        if(updateCart.fulfilled.match(resultAction)){
          showSuccess('Cart Item Updated ')
        }
        if(updateCart.rejected.match(resultAction)){
          showError(resultAction.payload)
        }

    }
  };

    const handleRemoveCartItem=async(id)=>{
      const resultAction = await dispatch(removeCartItem(id))
      if(removeCartItem.fulfilled.match(resultAction)){
        showSuccess('Item removed from Cart')
      }
      if(removeCartItem.rejected.match(resultAction)){
        showError('Error removing item from Cart')
      }
      
  
    }

  return (
<div className='border-b border-[rgba(0,0,0,0.1)] '>
     <div className={`cartItem w-full p-1 md:p-3 flex items-center gap-2 md:gap-4 pb-2 md:pb-5  ${isOutOfStock || exceedsStock ? 'opacity-50':""}`}>
              {/* product image */}
              <div className="img w-[30%] sm:w-[20%] lg:w-[15%] rounded-md overflow-hidden">
                <Link className="group">
                  <img
                    src={item.productId.images[0].url}
                    alt=""
                    className="w-full group-hover:scale-105 transition-transform "
                  />
                </Link>
              </div>
              {/* product info */}
              <div className="info w-[70%] sm:w-[80%] lg:w-[85%] relative">
                <IoIosClose 
                onClick={()=>handleRemoveCartItem(item._id)}
                className={` ${isOutOfStock || exceedsStock ? 'text-primary text-[30px]  ':''} text-[25px] bg-gray-100 rounded-full text-gray-500 cursor-pointer absolute top-[0px] right-[0px] link transition-colors`} />
                <span className="text-[13px]">{item.productId.brand}</span>
                <h3 className=" text-[13px] sm:text-[15px]">
                  <Link to="/sdf" className="link">
                  {
                    context.windowWidth<992 ? item.productId.name.substr(0,30)+'...':item.productId.name.substr(0,120)+'...'
                  }
                  </Link>
                </h3>
                <Rating
                  readOnly
                  name="size-small"
                  value={item.productId.rating}
                  size="small"
                />
                <div className="flex items-center gap-1 md:gap-4 mt-1 md:mt-2">




                  <div className="relative">

                  <span
                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
           
                    onClick={handleClickQty}
                  >
                    Qty : {item.quantity}
                    <VscTriangleDown />
                  </span>
                     {/* menu */}
                <Menu
                  id="basic-menu"
                  anchorEl={qtyAnchorEl}
                  open={openQty}
                  onClose={handleCloseQty}
                  value={selectedQty}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                   anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "left",
  }}
                >

{/* stock less than current qty , showing maximum stock option */}
{
  exceedsStock && stock>0 && (
    <MenuItem
    key={stock}
    className='!font-bold !text-primary'
    onClick={()=>handleChangeQty(stock)}
    >
      Max Available ({stock})
    </MenuItem>
  )
}

                 {Array.from({ length:11 }, (_, i) => {
    const value = item.quantity - 5 + i; 
    if (value < 1) return null; 
    const isOutOfStock = value>stock
    return (
      <MenuItem 
      disabled={isOutOfStock}
        className={`${
          value === item.quantity && "!bg-gray-100 !font-bold !text-red-500"
        } ${isOutOfStock && "!opacity-50 !cursor-not-allowed"}`}  
            key={value} 
      onClick={() => handleChangeQty(value)}>
        {value}
                {isOutOfStock && <span className="ml-2 text-xs text-gray-500">(Out)</span>}

      </MenuItem>
    );
  })}
                </Menu>
                  </div>

                </div>
                <div className="flex items-center gap-2 md:gap-4  mt-1 md:mt-2">
                  <span className="price   text-[13px] md:text-[14px] font-bold"> ₹ {item.productId.price}</span>

                  <span className="oldPrice line-through text-gray-500 text-[12px] md:text-[14px] font-[500]">
                    ₹ {item.productId.oldPrice}
                  </span>
                  <span className="price text-green-600 font-[600] text-[12px] md:text-[14px]">
{item.productId?.discount!==0 && !isNaN(Number(item.productId.discount)) && 
  Math.floor(Number(item.productId.discount)) + '% Off'}
                  </span>
                </div>

       
              </div>
          
            </div>
                {
                isOutOfStock && <p className='text-center text-primary text-[14px] font-bold' >Sorry , Currently Out of Stock</p>
              }
</div>
  )
}

export default CartItems
