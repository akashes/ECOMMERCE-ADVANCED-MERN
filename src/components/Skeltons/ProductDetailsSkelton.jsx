import Skeleton from "@mui/material/Skeleton";
const ProductDetailsSkeleton = () => {
  return (
    <section className="bg-white py-5">
      <div className="container flex gap-8 items-center">
        {/* Image Skeleton */}
        <div className="w-[40%]">
          <Skeleton variant="rectangular" width="100%" height={500} />
          <div className="flex gap-2 mt-3">
            {Array(5).fill("").map((_, i) => (
              <Skeleton key={i} variant="rectangular" width={70} height={70} />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="w-[60%] pr-10 pl-10">
          <Skeleton variant="text" width="70%" height={40} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="rectangular" width="50%" height={30} className="my-4" />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <div className="flex gap-3 mt-4">
            {Array(4).fill("").map((_, i) => (
              <Skeleton key={i} variant="rectangular" width={60} height={40} />
            ))}
          </div>
          <Skeleton variant="rectangular" width="40%" height={50} className="mt-5" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="container pt-10">
        <div className="flex gap-6">
          {Array(3).fill("").map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={120} height={35} />
          ))}
        </div>
        <Skeleton variant="rectangular" width="100%" height={200} className="mt-5" />
      </div>
    </section>
  );
};


export default ProductDetailsSkeleton