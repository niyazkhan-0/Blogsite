import { CreateBlog } from './../components/blog components/CreateBlog';
import { useSelector } from 'react-redux';
import { useTitle } from './../hooks/useTitle';

export const CreatePostPage = () => {
  useTitle("create a memory")
  const user = useSelector((state) => state.auth.user)

  return (
    <main>
      <CreateBlog user={user} />
    </main>
  )
}
