import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


export const ProfileSkeletonCard = () => {
    return (
        <div className="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-900">
            {/* Cover image skeleton */}
            <div className="relative h-48 w-full">
                <Skeleton height="100%" width="100%" />
                <div className="absolute top-2 right-2">
                    <Skeleton circle width={30} height={30} />
                </div>
            </div>

            {/* Profile image and name */}
            <div className="flex flex-col items-center -mt-12">
                <div className="rounded-full border-4 border-white dark:border-gray-900">
                    <Skeleton circle height={100} width={100} />
                </div>
                <div className="mt-4 text-center">
                    <Skeleton width={120} height={20} />
                    <Skeleton width={180} height={16} style={{ marginTop: '0.5rem' }} />
                </div>
            </div>

            {/* Post count */}
            <div className="mt-4 text-center">
                <Skeleton width={30} height={18} />
                <Skeleton width={50} height={14} style={{ marginTop: '0.3rem' }} />
            </div>

            {/* Edit Profile button */}
            <div className="mt-4 px-6 pb-6">
                <Skeleton height={40} borderRadius={12} />
            </div>
        </div>
    )
}
