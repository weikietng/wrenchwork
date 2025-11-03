import { Skeleton } from "@/components/ui/skeleton"

export function GarageSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Skeleton className="h-9 w-64" />
          <Skeleton className="mt-2 h-5 w-96" />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-8 w-16" />
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-48" />
          <div className="mt-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
