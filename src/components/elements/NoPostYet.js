

export const NoPostsYet = () => {
    return (

        <div className="flex justify-center my-20">
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-orange-200 relative dark:from-sky-950 to dark:to-blue-900">
                {/* Speech bubble tail */}
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-orange-200"></div>
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-7 border-t-transparent border-b-7 border-b-transparent border-r-7 border-r-orange-50"></div>

                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full dark:from-teal-600 dark:to-sky-700">
                    <i class="bi bi-file-earmark-post text-blue-300 text-3xl"></i>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-1 dark:text-white">
                        No posts yet
                    </h3>
                    <p className="text-orange-600 text-sm dark:text-red-300">
                        When a post id created, it will appear here.
                    </p>
                </div>
            </div>
        </div>

    );
}

