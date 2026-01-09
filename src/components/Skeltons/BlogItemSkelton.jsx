import React from "react";
import Skeleton from "@mui/material/Skeleton";

const BlogItemSkeleton = () => {
  return (
    <div className="blogItem">
      {/* Image Skeleton */}
      <div className="imgWrapper w-full overflow-hidden rounded-md relative">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
          className="rounded-md"
        />
      </div>

      {/* Info Skeleton */}
      <div className="info py-4">
        {/* Title */}
        <Skeleton
          variant="text"
          width="80%"
          height={24}
          animation="wave"
          className="mb-3"
        />

        {/* Description */}
        <Skeleton
          variant="text"
          width="100%"
          height={18}
          animation="wave"
        />
        <Skeleton
          variant="text"
          width="90%"
          height={18}
          animation="wave"
          className="mb-4"
        />

        {/* Read More Button */}
        <Skeleton
          variant="rectangular"
          width={100}
          height={30}
          animation="wave"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default BlogItemSkeleton;
