import { Carousel } from './components/Carousel';
import { Category } from './components/Category';
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from './../../firebase/config';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredBlogs, setBlogs } from '../../store/blogSlice';
import { BlogCard, BlogCardSkeleton, BlogCategorySkeleton, NoPostsYet } from './../../components';
import { useTitle } from './../../hooks/useTitle';

export const HomePage = () => {
  useTitle("explore blogs")
  const blogs = useSelector(selectFilteredBlogs);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const blogRef = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const data = await getDocs(blogRef);
        const blogList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate().toString(),
          updatedAt: doc.data().updatedAt?.toDate().toString()
        }));
        const categoryList = [...new Set(blogList.map((blog) => blog.category))];

        dispatch(setBlogs(blogList));
        setCategories(categoryList);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false); // make sure to stop loading on error
      }
    }
    fetchBlogs();
  }, [dispatch]);

  return (
    <>
      <Carousel />
      <main>
        {loading ? (
          <>
            <BlogCategorySkeleton />
            <div className="flex w-full flex-col gap-4 mt-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          </>
        ) : blogs && blogs.length > 0 ? (
          <>
            <section>
              <div className="overflow-x-auto whitespace-nowrap bg-sky-100 px-4 py-2 rounded-full scroll-hidden opacity-50 text-center shadow-lg shadow-blue-300 dark:bg-blue-950 dark:shadow-blue-900">
                {categories.map((category, index) => (
                  <Category category={category} key={index} />
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-5 px-3 my-7">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </>
        ) : (
          <NoPostsYet />
        )}
      </main>
    </>
  );
};
