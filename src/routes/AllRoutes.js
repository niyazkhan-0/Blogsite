import { Routes, Route } from "react-router-dom"
import { HomePage, PageNotFound, CreatePostPage, SignUpPage, UserProfile } from "../pages"
import { ProtectedRoutes } from "./ProtectedRoutes"

export const AllRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<ProtectedRoutes> <UserProfile/> </ProtectedRoutes>} />
        <Route path="/create" element={ <ProtectedRoutes> <CreatePostPage/> </ProtectedRoutes>  } />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
    )
}
