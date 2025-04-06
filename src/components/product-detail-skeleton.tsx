export default function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          <div className="w-full bg-accent animate-pulse aspect-square rounded-md"></div>
          <div className="flex flex-row space-x-4">
            <div className="w-1/4 bg-accent animate-pulse aspect-square rounded-md"></div>
            <div className="w-1/4 bg-accent animate-pulse aspect-square rounded-md"></div>
            <div className="w-1/4 bg-accent animate-pulse aspect-square rounded-md"></div>
            <div className="w-1/4 bg-accent animate-pulse aspect-square rounded-md"></div>
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex flex-col space-y-4">
          <div className="h-16 bg-accent animate-pulse rounded-md "></div>
          <div className="h-20 bg-accent animate-pulse rounded-md"></div>
          <div className="h-24 bg-accent animate-pulse rounded-md"></div>
          <div className="flex-grow bg-accent animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
