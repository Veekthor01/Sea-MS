import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import parser from 'html-react-parser';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';

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

function UserBlog () {
    //const [userBlog, setUserBlog] = useState<UserBlog[] | null>(null);

    /*useEffect(() => {
        const fetchUserBlog = async () => {
          try {
            const response = await api.get(`${BACKEND_URL}/userBlog/user`, 
            { withCredentials: true });
            setUserBlog(response.data);
          } catch (error) {
            console.error('Error fetching user blog:', error);
          }
        };
      
        fetchUserBlog();
      }, []); */
      const userBlogQuery = useQuery({
        queryKey: ['userBlog'],
        queryFn: async () => {
          const response = await api.get(`${BACKEND_URL}/userBlog/user`, { withCredentials: true });
          const data = await response.data;
          return data;
        },
      });

      if (userBlogQuery.isLoading) return (<h1> Loading...</h1>)
      if (userBlogQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
      }
      if (userBlogQuery.isLoadingError) return (<h1> Loading Error...</h1>)// remove later

      //setUserBlog(userBlogQuery.data);
      const userBlog = userBlogQuery.data;

    return (
          <>
          <CheckAuthenticated />
          <div className="space-y-4">
        {userBlog && userBlog.map((blog: UserBlog) => (
          <Link to="/userblog" key={blog._id}>
          <div key={blog._id} className="space-y-1 mb-5">
            {/* Use html-react-parser to render content without <p> tags saved with by the RTE */}
            <div className='font-semibold font-roboto leading-normal tracking-wide'>{parser(blog.name)}</div>
            <div className='font-medium font-roboto leading-normal tracking-wide'>{parser(blog.title)}</div>
            <div className='font-medium font-roboto leading-normal tracking-wide'>{parser(blog.author)}</div>
            <div className='font-medium font-roboto leading-normal tracking-wide'>{parser(blog.createdAt?.toString() ?? '')}</div>
          </div>
          </Link>
            ))}
          </div>
          </>
    );
}

export default UserBlog;