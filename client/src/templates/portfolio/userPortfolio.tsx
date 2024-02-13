import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import parser from 'html-react-parser';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Projects {
    name: string;
    description: string;
    technologies: string[];
    url: string;
  }
  
  interface UserPortfolio {
    _id: string;
    name: string;
    author: string;
    about: string;
    userId: string;
    technologies: string[];
    projects: Projects[];
  }

function UserPortfolio () {
    //const [userPortfolio, setUserPortfolio] = useState< UserPortfolio[] | null>(null);

    /*useEffect(() => {
        const fetchUserPortfolio = async () => {
          try {
            const response = await api.get(`${BACKEND_URL}/userPortfolio/user`,
             { withCredentials: true });
            setUserPortfolio(response.data);
          } catch (error) {
            console.error('Error fetching user portfolio:', error);
          }
        };
      
        fetchUserPortfolio();
      }, []); */

      const userPortfolioQuery = useQuery({
        queryKey: ['userPortfolio'],
        queryFn: async () => {
          const response = await api.get(`${BACKEND_URL}/userPortfolio/user`, { withCredentials: true });
          const data = await response.data;
          return data;
        },
      });

      if (userPortfolioQuery.isLoading) return (<h1> Loading...</h1>)
      if (userPortfolioQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
      }
      if (userPortfolioQuery.isLoadingError) return (<h1> Loading Error...</h1>)// remove later

      //setUserPortfolio(userPortfolioQuery.data);
      const userPortfolio = userPortfolioQuery.data;

    return (
        <>
        <CheckAuthenticated />
        <div className="space-y-4">
        {userPortfolio && userPortfolio.map((portfolio: UserPortfolio) => (
          <Link to='/userportfolio' key={portfolio._id}>
            <div key={portfolio._id} className="space-y-2 mb-5">
            <div className='font-semibold font-roboto leading-normal tracking-wide'>{parser(portfolio.name)}</div>
            <div className='font-medium font-roboto leading-normal tracking-wide'>{parser(portfolio.about.slice(0, 200) + '...')}</div>
            </div>
          </Link>
        ))}
        </div>
        </>
    );
}

export default UserPortfolio;