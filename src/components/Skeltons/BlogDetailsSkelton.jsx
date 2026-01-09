import React from "react";

const BlogDetailsSkeleton = () => {
  return (
    <div className="container mx-auto p-6 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Blog Content Skeleton */}
        <div className="lg:w-[70%] w-full">
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>

          {/* Image */}
          <div className="w-full max-h-[400px] h-[300px] bg-gray-300 rounded-lg mb-6"></div>

          {/* Paragraphs */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>

        {/* Right Side: More Blogs Skeleton */}
        <div className="lg:w-[30%] w-full max-h-[90vh] overflow-y-scroll">
          {/* Section Title */}
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>

          {/* List of More Blogs */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-b pb-4 last:border-none">
                {/* Blog title */}
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

                {/* Blog image */}
                <div className="w-full h-[120px] bg-gray-300 rounded-md mb-2"></div>

                {/* Blog excerpt */}
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
