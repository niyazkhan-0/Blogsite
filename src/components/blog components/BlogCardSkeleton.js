import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const BlogCardSkeleton = () => {
  return (

    <div className="rounded-lg shadow-md p-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-blue-900 dark:to-blue-800 min-h-[160px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton width={150} height={20} className="mb-1" />
          <Skeleton width={90} height={16} />
        </div>
        <Skeleton circle width={40} height={40} />
      </div>

      <div className="mb-6">
        <Skeleton count={2} />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton width={24} height={24} />
        <Skeleton width={30} height={16} />
      </div>
    </div>

  )
}
