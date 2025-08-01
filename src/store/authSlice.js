import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
    user: JSON.parse(localStorage.getItem("user")) || {
        uid: "",
        email: "",
        name: "",
        bio:"",
        profile: "",
        banner:"",
        posts: 0
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload
            localStorage.setItem("isAuth", JSON.stringify(action.payload))
        },
        setUser(state, action) {
            state.user = { ...state.user, ...action.payload }
            localStorage.setItem("user", JSON.stringify(state.user))
        },
        clearUser(state, action) {
            state.user = {}
            localStorage.clear("user")
        }
    }
})

export const { setIsAuth, setUser, clearUser } = authSlice.actions
export default authSlice.reducer