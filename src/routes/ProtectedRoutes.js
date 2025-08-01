import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({children}) => {
    const isAuth = useSelector((state)=> state.auth.isAuth)
  return isAuth ? children : <Navigate to={"/signup"} />
}
