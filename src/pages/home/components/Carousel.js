import { useState } from "react"
import Hero from "../../../assets/carousel images/hero.jpg"
import profile from "../../../assets/profile.png"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"



export const Carousel = () => {
    const user = useSelector((state) => state.auth.user)
    const [toggelProfile, setToggelProfile] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="w-full sm:h-[45vh] h-[55vh] relative ">
            <img className="h-full min-w-full  object-cover object-center opacity-40 dark:opacity-35" src={Hero} alt="hero " />
            <div className="max-w-[1280px] mx-auto px-4  flex justify-between items-center shrink absolute inset-0">
                <div>
                    <h1 className="font-extrabold text-7xl mb-4 text-amber-600">Blog site</h1>
                    <h2 className="font-bold text-4xl text-amber-950 dark:text-amber-500"> Ink & Insight </h2>
                    <p className="font-semibold text-xl text-amber-950 dark:text-amber-500">Reflecting thoughts, ideas, and everyday moments that matter.</p>
                </div>
                <div className="flex flex-col items-start">
                    <div className=" mb-3">
                        <button
                            onClick={() => { navigate("/create") }}
                            type="submit"
                            class="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-400 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                        >
                            Post Blog
                            <svg
                                class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                                viewBox="0 0 16 19"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                    class="fill-gray-800 group-hover:fill-gray-800"
                                ></path>
                            </svg>
                        </button>

                    </div>
                    <div data-popover id="popover-left" role="tooltip" className={`${toggelProfile ? "" : "opacity-0"} z-10 inline-block w-64 text-sm mb-2 text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}>
                        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Your Profile</h3>
                        </div>
                        <div className="px-3 py-2">
                            <p>{user.name || "User name"}</p>
                            <p>Posts : {user.posts}  </p>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                    <div>
                        <img className="rounded-full w-16 h-16 dark:opacity-85 object-center object-cover" src={user.profile || profile} alt="profile" onMouseOver={() => { setToggelProfile(!toggelProfile) }} onMouseLeave={() => { setToggelProfile(!toggelProfile) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
