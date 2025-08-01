import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs:[],
    filterState:""
}

const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
        setBlogs(state, action){
            state.blogs = action.payload
        },
        setFilterState(state, action){
            state.filterState = action.payload
        },
        removeBlog(state, action){
            state.blogs.filter((blog) => blog.id !== action.payload)
        }
    }
})

export const selectFilteredBlogs = (state) => {
    const {blogs, filterState} = state.blog
    if(!filterState || filterState === "all"){
        return blogs
    }else{
        return blogs.filter((blog) => blog.category === filterState)
    }
}

export const {setBlogs, setFilterState, removeBlog} = blogSlice.actions
export default blogSlice.reducer