export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-48 w-full bg-gray-200" />
          <div className="p-5">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full rounded bg-gray-100" />
            <div className="mt-2 h-4 w-5/6 rounded bg-gray-100" />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-3 w-16 rounded bg-gray-100" />
              </div>
              <div className="h-9 w-20 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
