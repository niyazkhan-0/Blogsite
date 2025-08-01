import { useNavigate } from "react-router-dom";
import { useTitle } from './../hooks/useTitle';

export const PageNotFound = () => {
  const navigate = useNavigate();
  useTitle("page not found")
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-100 to-blue-100 dark:from-blue-950 dark:to-blue-900 transition-colors duration-500">
        <div className="text-center p-8 rounded-xl shadow-lg bg-white dark:bg-gradient-to-tr dark:from-blue-950 dark:to-blue-800 dark:text-white w-[90%] max-w-lg animate-fadeIn">
          <h1 className="text-7xl font-bold text-orange-500 dark:text-blue-300 mb-4 transition-all duration-300">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 hover:scale-105 active:scale-100 transition-all duration-300 shadow-md"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
