const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      {/* Image */}
      <div className="aspect-square bg-gray-200" />

      {/* Content */}
      <div className="p-4">
        <div className="h-3 w-20 bg-gray-200 rounded mb-3" />

        <div className="h-5 w-full bg-gray-200 rounded mb-2" />
        <div className="h-5 w-2/3 bg-gray-200 rounded mb-4" />

        <div className="flex justify-between items-center">
          <div>
            <div className="h-5 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>

          <div className="h-10 w-10 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
