import React from "react";

const HomeLoading = () => {
  // Helper skeleton block
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-700 rounded-md ${className}`} />
  );

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-900 text-white">
      {/* ---- Songs Section ---- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Spotify Songs</h2>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 p-4 pr-5 rounded-lg flex items-center gap-4 animate-pulse"
            >
              <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
              <div className="flex-grow space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Albums Section ---- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Spotify Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg animate-pulse">
              <Skeleton className="aspect-square mb-4 rounded-lg" />
              <Skeleton className="h-3 w-3/4 mb-2" />
              <Skeleton className="h-2 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* ---- Artists Section ---- */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Spotify Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg animate-pulse">
              <Skeleton className="aspect-square mb-4 rounded-lg" />
              <Skeleton className="h-3 w-2/3 mb-2" />
              <Skeleton className="h-2 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;
