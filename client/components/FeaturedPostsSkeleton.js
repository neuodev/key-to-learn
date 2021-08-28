import React from "react";
import Skeleton from "react-loading-skeleton";

const FeaturedPostsSkeleton = () => {
  return (
    <div className="p-4 grid grid-cols-12 row-cols-6 gap-9">
      <div className="col-span-12 ">
        <Skeleton height={200} />
        <Skeleton height={20} className="mt-3" />
        <div className="flex items-center justify-start">
          <Skeleton height={20} clasName="mr-10" width={100} />
          <Skeleton height={20} className="ml-5" width={100} />
          <Skeleton height={20} className="ml-1" width={100} />
          <Skeleton height={20} className="ml-1" width={100} />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6">
        <Skeleton height={200} />
        <Skeleton height={20} className="mt-3" />
        <div className="flex items-center justify-start">
          <Skeleton height={20} clasName="mr-10" width={100} />
          <Skeleton height={20} className="ml-5" width={100} />
          <Skeleton height={20} className="ml-1" width={100} />
          <Skeleton height={20} className="ml-1" width={100} />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6">
        <Skeleton height={200} />
        <Skeleton height={20} className="mt-3" />
        <div className="flex items-center justify-start">
          <Skeleton height={20} clasName="mr-10" width={100} />
          <Skeleton height={20} className="ml-5" width={100} />
          <Skeleton height={20} className="ml-1" width={100} />
          <Skeleton height={20} className="ml-1" width={100} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostsSkeleton;
