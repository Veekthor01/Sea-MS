import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import parser from 'html-react-parser';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';
import LoaderSpinner from '../../components/loading';
import '../../templates/template.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UserBlog {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// User Blog Pages
function UserBlog () {
      const userBlogQuery = useQuery({
        queryKey: ['userBlog'],
        queryFn: async () => {
          const response = await api.get(`${BACKEND_URL}/userBlog`, { withCredentials: true });
          const data = await response.data;
          return data;
        },
      });

      if (userBlogQuery.isLoading) return <LoaderSpinner />;
      if (userBlogQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
      }

      const userBlog = userBlogQuery.data;

    return (

        <main className="pt-8 pb-16 lg:pt-12 lg:pb-20 bg-white dark:bg-gray-900 antialiased">
          <CheckAuthenticated />
          <div className="px-4 mx-auto max-w-screen-xl">
        {userBlog && userBlog.map((blog: UserBlog) => (
            <div key={blog._id} className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            {/* Use html-react-parser to render content without <p> tags saved with by the RTE */}
            <div className="flex justify-end">
              <Link to={`/edituserblog/${blog._id}`}>
                <button className="font-roboto font-semiboldfont-roboto font-semibold border border-white text-white px-2 py-1 rounded hover:bg-white hover:text-black transition-colors duration-200">
                  Edit Blog
                </button>
              </Link>
            </div>
            <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <div>
                        <a href="#" rel="author" className="text-xl font-sans font-bold text-gray-900 dark:text-white leading-normal tracking-wide">
                          {parser(blog.author)}
                          </a>
                        <p className="text-base font-roboto text-gray-500 dark:text-gray-400">
                        {parser(blog.createdAt?.toString() ?? '')}
                          </p>
                      </div>
                    </div>
                  </address>
                  <h2 className="mb-4 text-2xl font-sans font-bold text-gray-900 lg:text-3xl dark:text-white leading-normal tracking-wide">
                    {parser(blog.title)}
                    </h2>
                </header>
                <div className="text-lg font-sans mt-7 text-gray-500 dark:text-gray-400 leading-normal tracking-wide">
                  {parser(blog.content)}
                  </div>         
              </div>
            ))}
          </div>
        </main>
    );
}

export default UserBlog;