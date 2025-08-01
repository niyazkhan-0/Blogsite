import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


export const BlogCategorySkeleton = () => {
    return <div className="overflow-x-auto whitespace-nowrap bg-sky-100 px-4 py-2 rounded-full scroll-hidden opacity-50 text-center shadow-lg shadow-blue-300 dark:bg-blue-950 dark:shadow-blue-900 flex gap-3 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                    key={i}
                    height={32}
                    width={100}
                    borderRadius={9999}
                    baseColor="#cbd5e1" // slate-300
                    highlightColor="#e2e8f0" // slate-200
                />
            ))}
        </div>
}
