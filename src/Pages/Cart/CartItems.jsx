

import React,{useState} from 'react'
import { IoIosClose } from 'react-icons/io';
import { VscTriangleDown } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import  Rating  from '@mui/material/Rating';


const CartItems = ({size,qty}) => {
        // menu component related 
  const [sizeAnchorEl, setSizeAnchorEl] = React.useState(null);
  const[selectedSize,setSelectedSize]=useState(size)
  const openSize = Boolean(sizeAnchorEl);
  
  
  const [qtyAnchorEl, setQtyAnchorEl] = React.useState(null);
  const[selectedQty,setSelectedQty]=useState(qty)
  const openQty = Boolean(qtyAnchorEl);


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
  const handleCloseQty = (value) => {
      setQtyAnchorEl(null);
    if(value!==null){
        setSelectedQty(value)
    }
  };

  return (
     <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
              {/* product image */}
              <div className="img w-[15%] rounded-md overflow-hidden">
                <Link className="group">
                  <img
                    src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                    alt=""
                    className="w-full group-hover:scale-105 transition-transform "
                  />
                </Link>
              </div>
              {/* product info */}
              <div className="info w-[85%] relative">
                <IoIosClose className="text-[25px] bg-gray-100 rounded-full text-gray-500 cursor-pointer absolute top-[0px] right-[0px] link transition-colors" />
                <span className="text-[13px]">Allen Solly</span>
                <h3 className="text-[15px]">
                  <Link to="/sdf" className="link">
                    Men Pure Cotton Striped Casual Shirt
                  </Link>
                </h3>
                <Rating
                  readOnly
                  name="size-small"
                  defaultValue={4}
                  size="small"
                />
                <div className="flex items-center gap-4 mt-2">


                <div className="relative ">

                  <span
                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                    onClick={handleClickSize}
                    >
                    Size : {selectedSize}
                    <VscTriangleDown />
                  </span>
            {/* menu */}
                <Menu
                  id="size-menu"
                  anchorEl={sizeAnchorEl}
                  open={openSize}
                  onClose={()=>handleClickSize(null)}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={()=>handleCloseSize('S')}>S</MenuItem>
                  <MenuItem  onClick={()=>handleCloseSize('M')}>M</MenuItem>
                  <MenuItem onClick={()=>handleCloseSize('L')}>L</MenuItem>
                  <MenuItem onClick={()=>handleCloseSize('XL')}>XL</MenuItem>
                  <MenuItem onClick={()=>handleCloseSize('XXL')}>XXL</MenuItem>
                </Menu>


                      </div>


                  <div className="relative">

                  <span
                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
           
                    onClick={handleClickQty}
                  >
                    Qty : {selectedQty}
                    <VscTriangleDown />
                  </span>
                     {/* menu */}
                <Menu
                  id="basic-menu"
                  anchorEl={qtyAnchorEl}
                  open={openQty}
                  onClose={handleCloseQty}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={()=>handleCloseQty(1)}>1</MenuItem>
                  <MenuItem onClick={()=>handleCloseQty(2)}>2</MenuItem>
                  <MenuItem onClick={()=>handleCloseQty(3)}>3</MenuItem>
                  <MenuItem onClick={()=>handleCloseQty(4)}>4</MenuItem>
                  <MenuItem onClick={()=>handleCloseQty(5)}>5</MenuItem>
  
                </Menu>
                  </div>

                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="price  font-[600] text-[14px]">1444</span>

                  <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                    ₹ 1,999
                  </span>
                  <span className="price text-primary font-[600] text-[14px]">
                    55% OFF
                  </span>
                </div>

       
              </div>
            </div>
  )
}

export default CartItems
