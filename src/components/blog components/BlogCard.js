import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { updateDoc, doc, serverTimestamp, arrayRemove, arrayUnion, deleteDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../store/updateUserProfile";
import { removeBlog } from "../../store/blogSlice";


export const BlogCard = ({ blog, page, isOwner }) => {

    const isProfilePage = page === "profile"
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const [liked, setLiked] = useState(blog.likedBy.includes(user.uid) || false);
    const [count, setCount] = useState(blog.likedBy.length || 0)
    const [showMore, setShowMore] = useState(false)
    const blogRef = doc(db, "blogs", blog.id)
    const [disableLikeButton, setDisableLikeButton] = useState(user.uid || false)

    const toggleLike = () => {
        setLiked(!liked);
        setCount(prev => liked ? prev - 1 : prev + 1);
        updateDoc(blogRef, {
            likedBy: liked ? arrayRemove(user.uid) : arrayUnion(user.uid),
            updatedAt: serverTimestamp()
        })
            .then(() => {
                console.log("success")
            })
            .catch((error) => {
                console.log(error)
            })
    };

    useEffect(() => {
        setCount(blog.likedBy.length)
        if (user?.uid) {
            setLiked(blog.likedBy.includes(user.uid))
        } else {
            setLiked(false)
            setDisableLikeButton(false)
        }
    }, [user, blog.likedBy])

    async function handelDeleteBlog() {
        deleteDoc(blogRef)
            .then(() => {
                const info = {
                    uid: user.uid,
                    posts: user.posts - 1
                }
                updateUserProfile(info, user, dispatch)
                dispatch(removeBlog(blog.id))
            })
    }

    const wordArray = blog.content.split(" ")
    const validLength = wordArray.length <= 20
    const previewText = wordArray.slice(0, 20).join(" ")

    return (

        <div className={`${isProfilePage ? "w-auto my-4" : "w-[100%] my-2"} flex flex-col justify-between h-full min-h-[170px] p-4  bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 rounded-lg shadow-md dark:bg-gradient-to-l dark:from-cyan-900 dark:to-blue-950 dark:border-blue-950`}>
            <div className="col-span-2 text-lg font-bold capitalize rounded-md flex items-center gap-2 justify-between dark:text-white mb-2">
                <div className="flex items-center sm:flex-row flex-col justify-center">
                    <p>{blog.title}</p>
                    <span className="ml-6 text-sm font-normal "> {blog.category} </span>
                </div>
                {!isProfilePage && <img onClick={() => { navigate(`/profile?query=${encodeURIComponent(blog.author.uid)}`) }} className="rounded-full w-10 h-10 dark:opacity-85 object-cover object-center" src={blog.author.profile} referrerPolicy="no-referrer" alt="profile" />}
            </div>
            <div className="rounded-md">
                <p className="dark:text-white">
                    {!validLength ? (
                        <>
                            {previewText}...
                            <span onClick={() => setShowMore(true)} className="text-blue-600 hover:underline ml-2 text-sm dark:text-blue-200"> More </span>
                        </>
                    ) : (
                        blog.content
                    )}
                </p>
                {showMore && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-md max-w-lg w-full shadow-lg dark:text-white">
                            <h3 className="text-lg font-semibold mb-4">{blog.title}</h3>
                            <p className="text-sm">{blog.content}</p>
                            <button
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => setShowMore(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-auto flex items-center justify-between pt-4">
                <div className=" rounded-xl dark:text-white py-1 px-3 w-1/6 mt-auto">
                    <button
                        disabled={!disableLikeButton}
                        onClick={toggleLike}
                        className={`${disableLikeButton ? "" : "cursor-not-allowed"} flex items-center gap-2 transition duration-200 ${liked ? "text-red-600" : "text-gay-600 dark:text-white hover:text-red-600"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-6 h-6 transition-transform duration-300 ease-in-out ${liked ? " animate-ping-fast" : "scale-100"
                                }`}
                            viewBox="0 0 24 24"
                            fill={liked ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                                        14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                                        6.86-8.55 11.54L12 21.35z"
                            />
                        </svg>
                        <span className="text-sm font-medium">{count}</span>
                    </button>
                </div>
                {isOwner && (<div className="text-red-700 dark:text-red-300 cursor-pointer">
                    <p onClick={handelDeleteBlog}>Delete <i class="bi bi-trash3-fill"></i></p>
                </div>)}
            </div>
        </div>
    )
}
