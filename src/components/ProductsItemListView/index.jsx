import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";

import Tooltip from "@mui/material/Tooltip";

import { MdOutlineShoppingCart } from "react-icons/md";

import { useContext } from "react";
import { MyContext } from "../../App";
const ProductsItemListView = () => {
  const { setOpenProductDetailsModal } = useContext(MyContext);

  return (
    <div className="productItem rounded-md overflow-hidden shadow-lg border-1 border-[rgba(0,0,0,0.1)] flex items-center  ">
      <div className="imaWrapper w-[25%]  rounded-t-md overflow-hidden relative group">
        <Link to="/">
          <div className="img h-[220px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dllelmzim/image/upload/v1752164841/1742463096955_hbhb1_pf1tig.jpg"
              alt=""
              className="w-full "
            />
            <img
              src="https://res.cloudinary.com/dllelmzim/image/upload/v1752164708/1742463096956_hbhb2_arwfcv.jpg"
              alt=""
              className="w-full absolute left-0 top-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out "
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-md p-1 tex-[12px] font-[500]">
          10%
        </span> 
        <div
          className="actions absolute top-[-50px] group-hover:top-[15px] right-[5px]
          z-50 flex items-center gap-2 flex-col w-[50px] transition-all ease-in-out duration-300
          opacity-0 group-hover:opacity-100
           "
        >
          <Tooltip title="Quick View" placement="left">
            <Button
              className="  !w-[35px] !h-[35px] !min-w-[35px] group !rounded-full !bg-white
             
              hover:!bg-primary hover:!text-white "
              onClick={() => setOpenProductDetailsModal(true)}
            >
              <MdZoomOutMap className="action-icon w-full h-full text-[18px] text-black hover:text-white  transition-colors" />
            </Button>
          </Tooltip>

          <Tooltip title="Compare" placement="left">
            <Button className="!w-[35px] !h-[35px] !min-w-[35px] group !rounded-full !bg-white  hover:!bg-primary hover:!text-white">
              <IoGitCompareOutline className=" action-icon text-[18px] text-black hover:text-white transition-colors" />
            </Button>
          </Tooltip>

          <Tooltip title="Add To Wishlist" placement="left">
            <Button
              className="!w-[35px] !h-[35px] !min-w-[35px] group !rounded-full !bg-white hover:!bg-primary
             hover:!text-white
             "
            >
              <FaRegHeart className=" action-icon text-[18px] text-black hover:text-white transition-colors" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="info p-3 py-5  w-[75%]  px-8 ">
        <h6 className="text-[15px] !font-[400]">
          <Link to="/" className="link">
            Solyent Green
          </Link>
        </h6>
        <h3 className="text-[18px] title  font-[500] text-[#000] mb-1 mt-3 mb-3">
          <Link to="/" className="link">
            Siril Georgette Pink Color Saree With Blouse Piece
          </Link>
        </h3>
        <p className="text-[14px] mb-3">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo ipsa
          maxime est quas repellendus voluptatum, maiores libero officia
          necessitatibus explicabo?
        </p>
        <Rating name="size-small" defaultValue={2} size="small" readOnly />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            ₹ 1,999
          </span>
          <span className="price text-primary font-[600]">1444</span>
        </div>

        <Button className="btn-org !mt-3 flex gap-2 ">
          <MdOutlineShoppingCart className="text-[20px]" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductsItemListView;
