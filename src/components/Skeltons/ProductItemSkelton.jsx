import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { FaStar } from "react-icons/fa"; // star icon

const ProductItemSkeleton = () => {
  return (
    <div className="productItem rounded-md overflow-hidden shadow-lg border-1 border-[rgba(0,0,0,0.1)]">
      {/* Image Section with Icon */}
      <div className="imgWrapper w-[100%] h-[220px] rounded-t-md overflow-hidden relative flex items-center justify-center bg-gray-200 animate-pulse">
        <svg
          className="w-10 h-10 text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>

      {/* Info Section */}
      <div className="info p-3 py-5">
        {/* Brand */}
        <Skeleton variant="text" width={60} height={16} />

        {/* Product Name */}
        <Skeleton variant="text" width="80%" height={20} style={{ marginTop: 6 }} />

        {/* Star Rating Skeleton */}
        <div className="flex gap-1 mt-2 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className="text-gray-300 w-[18px] h-[18px]" />
          ))}
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-4 mt-3">
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={50} height={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
