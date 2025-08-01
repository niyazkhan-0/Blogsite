import { Link } from "react-router-dom"
import Blog from "../../assets/blogger.png"

export const Footer = () => {
  return (
    <footer class="bg-sky-100 border-t-indigo-200 border-t dark:border-blue-600 border-b dark:bg-blue-950  rounded-lg shadow-sm ">
      <div class="w-full max-w-screen-xl mx-auto p-1 md:py-3">
        <div class="sm:flex sm:items-center sm:justify-between ">
          <Link to="/" class="flex items-center justify-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={Blog} class="h-8" alt="blog site Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blog site</span>
          </Link>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 justify-center">
            <li>
              <Link to="/" class="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link to="/" class="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/" class="hover:underline me-4 md:me-6">Licensing</Link>
            </li>
            <li>
              <Link to="/" class="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 text-center">© 2025 <Link to="/" class="hover:underline">Blog site™</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  )//eslint-disable-next-line
}
