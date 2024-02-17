import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import parser from 'html-react-parser';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';
import LoaderSpinner from '../../components/loading';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UserBlog {
    _id: string;
    name: string;
    title: string;
    content: string;
    userId: string;
    author: string;
    createdAt?: Date;
}

// Blog after created from a template
function UserBlog () {
      const userBlogQuery = useQuery({
        queryKey: ['userBlog'],
        queryFn: async () => {
          const response = await api.get(`${BACKEND_URL}/userBlog/user`, { withCredentials: true });
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
          <>
          <CheckAuthenticated />
          <div className="space-y-4">
            {userBlog && userBlog.length > 0 ? (
                userBlog.map((blog: UserBlog) => (
                    <Link to="/userblog" key={blog._id}>
                        <div key={blog._id} className="space-y-1 mb-5">
                            {/* Use html-react-parser to render content without <p> tags saved with by the RTE */}
                            <div className='text-sm md:text-base font-semibold text-zinc-900 font-roboto leading-normal tracking-wide'>{parser(blog.name)}</div>
                            <div className='text-sm md:text-base font-medium text-zinc-900 font-roboto leading-normal tracking-wide'>{parser(blog.title)}</div>
                            <div className='text-sm md:text-base font-medium text-zinc-900 font-roboto leading-normal tracking-wide'>{parser(blog.author)}</div>
                            <div className='text-sm md:text-base font-medium text-zinc-900 font-roboto leading-normal tracking-wide'>{parser(blog.createdAt?.toString() ?? '')}</div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Pick a template to start</p>
            )}
        </div>
          </>
    );
}

export default UserBlog;