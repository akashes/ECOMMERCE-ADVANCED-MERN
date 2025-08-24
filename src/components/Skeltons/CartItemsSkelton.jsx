import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CartItemSkeleton = () => {
  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      {/* Image placeholder */}
      <div className="img w-[15%] rounded-md overflow-hidden">
        <Skeleton variant="rectangular" width={"100%"} height={80} />
      </div>

      {/* Info placeholder */}
      <div className="info w-[85%] relative">
        <div className="flex flex-col gap-2">
          <Skeleton width="30%" height={20} />
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={20} />

          <div className="flex gap-4 mt-2">
            <Skeleton variant="rounded" width={80} height={30} />
            <Skeleton variant="rounded" width={80} height={30} />
          </div>

          <div className="flex gap-4 mt-2">
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
