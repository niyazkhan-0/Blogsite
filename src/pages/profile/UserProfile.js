import { useLocation } from "react-router-dom"
import { UserInfo } from "./components/UserInfo"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { db } from "../../firebase/config"
import { collection, getDocs, orderBy, where, query } from "firebase/firestore"
import { setBlogs } from "../../store/blogSlice"
import { BlogCard, BlogCardSkeleton, NoPostsYet } from './../../components'
import { useTitle } from './../../hooks/useTitle';

const useQuery = () => new URLSearchParams(useLocation().search)

export const UserProfile = () => {
  useTitle("view profile")
  const user = useSelector((state) => state.auth.user)
  const blogs = useSelector((state) => state.blog.blogs)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const searchedQuery = useQuery()
  const searchedUser = searchedQuery.get("query")
  const isOwner = searchedUser === user.uid

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      const blogRef = query(
        collection(db, "blogs"),
        where("author.uid", "==", searchedUser),
        orderBy("createdAt")
      )
      const data = await getDocs(blogRef)
      const blogList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate().toString(), // 👈 convert to JS Date
        updatedAt: doc.data().updatedAt?.toDate().toString()
      }))
      dispatch(setBlogs(blogList))
      setLoading(false)
    }

    if (searchedUser) fetchBlogs()
  }, [searchedUser, dispatch, user])

  return (
    <main>
      <UserInfo user={user} isOwner={isOwner} searchedUser={searchedUser} />
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 my-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : blogs && blogs.length > 0 ? (
        <div className="grid-cols-1 lg:grid-cols-3 md:grid-cols-2 grid gap-5 px-3 items-stretch min-h-[220px] my-7">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} page={"profile"} isOwner={isOwner} />
          ))}
        </div>
      ) : (
        <NoPostsYet />
      )}

    </main>
  )
}
