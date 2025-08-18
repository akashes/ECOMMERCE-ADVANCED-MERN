import React from "react";
import Skeleton from "@mui/material/Skeleton";

const ProductsItemListViewSkeleton = () => {
  return (
    <div className="productItem rounded-md overflow-hidden shadow-lg border border-[rgba(0,0,0,0.1)] flex items-center">
      {/* Image Section with Icon */}
      <div className="imaWrapper w-[25%] h-[220px] flex items-center justify-center bg-gray-200 relative animate-pulse">
        <svg
          className="w-12 h-12 text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>

      {/* Info Section */}
      <div className="info p-3 py-5 w-[75%] px-8">
        <Skeleton variant="text" width={80} height={18} />
        <Skeleton variant="text" width="60%" height={22} style={{ marginTop: 8 }} />
        <Skeleton variant="text" width="90%" height={16} style={{ marginTop: 6 }} />
        <Skeleton variant="text" width="40%" height={16} style={{ marginTop: 6 }} />

        <div className="flex items-center gap-4 mt-3">
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="text" width={80} height={22} />
        </div>

        <Skeleton variant="rectangular" width={120} height={36} style={{ marginTop: 12 }} />
      </div>
    </div>
  );
};

export default ProductsItemListViewSkeleton;
