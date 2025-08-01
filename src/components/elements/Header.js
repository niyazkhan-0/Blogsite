import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"

import Logo from "../../assets/blogger.png"

import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"

import { useSelector, useDispatch } from "react-redux"
import { clearUser, setIsAuth } from "../../store/authSlice"


export const Header = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const user = useSelector((state) => state.auth.user)
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")) || false)
  const [linksDropdown, setLinksDropdown] = useState(false)
  const navigate = useNavigate()

  const activeClass = "text-base block py-2 pr-4 pl-3 text-orange-600  rounded md:bg-transparent md:text-orange-600 md:p-0 dark:text-orange-500 font-semibold";
  const inActiveClass = "text-base block py-2 pr-4 pl-3 text-oragne-600 rounded   md:hover:bg-transparent  md:p-0  dark:text-orange-200 dark:hover:bg-orange-100 dark:hover:bg-opacity-10 dark:hover:text-orange-300 md:dark:hover:bg-transparent dark:border-gray-700 font-semibold";

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme))
    if (theme) {
      document.documentElement.classList.add("dark")
    }
    else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  function handelLoginLogout() {
    if (isAuth) {
      signOut(auth)
      dispatch(setIsAuth(false))
      dispatch(clearUser())
    }
    else {
      navigate("/signup")
    }
  }

  return (
    <nav className="bg-sky-100 border-b-indigo-200 dark:border-blue-600 border-b dark:bg-blue-950">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center sm:justify-between flex-row gap-2 mx-auto p-4 ">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-orange-600 dark:text-orange-400">Blog Site</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center sm:gap-4 ">
          <div onClick={() => setTheme(!theme)}>
            {theme ? (
              <i className="bi bi-cloud-sun-fill text-3xl text-white "></i>
            ) : (
              <i className="bi bi-cloud-moon-fill text-3xl "></i>
            )}
          </div>
          <button type="button" onClick={handelLoginLogout} className="text-white bg-orange-400 hover:bg-orange-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 ">{isAuth ? "Log Out" : "Login"}</button>
          <button onClick={() => setLinksDropdown(!linksDropdown)} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none  dark:text-orange-400  " aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

        </div>
        <div className={`${linksDropdown ? "" : "hidden"} items-center justify-between  w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
          <ul className="flex flex-col font-medium p-2 md:p-0 mt-2 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inActiveClass} aria-current="page" end>Home</NavLink>
            </li>
            <li className="relative group" disabled={!isAuth}>
              <NavLink to={isAuth ? `/profile?query=${encodeURIComponent(user.uid)}` : "#"} className={({ isActive }) =>
                `${isActive ? activeClass : inActiveClass} ${isAuth ? "" : "cursor-not-allowed pointer-events-none text-gray-400"
                }`
              }
              >Profile</NavLink>
              <div className={` ${isAuth ? "hidden" : ""} absolute left-1/2 transform -translate-x-1/2 top-full z-10 mt-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
                Login in to view profile
                {/* Arrow pointing down */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  )
}
