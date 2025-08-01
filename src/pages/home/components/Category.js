import { useDispatch, useSelector } from "react-redux"
import { setFilterState } from "../../../store/blogSlice"

export const Category = ({ category }) => {

    const dispatch = useDispatch()
    const activeCategory = useSelector((state) => state.blog.filterState)
    const isActive = activeCategory === category

    function handelToggel(event) {
        if (isActive) {
            dispatch(setFilterState(""))
        } else {
            dispatch(setFilterState(category))
        }
    }


    return (
        <button onClick={handelToggel} type="button" value={category} class={`mx-2 gap-2 transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
        ${isActive
                ? "bg-red-200 text-red-800 dark:bg-orange-700 dark:text-white"
                : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}>
            {category}

            {isActive && <svg class=" w-4 h-4 text-black bg-white dark:bg-black rounded-full dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l8 8m0-8L6 14" />
            </svg>}
        </button>
    )
}
