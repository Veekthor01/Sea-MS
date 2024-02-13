import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import parser from 'html-react-parser';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface WorkExperience {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    description: string[];
}

interface Education {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
}

interface UserResume {
  _id: string;
  name: string;
  author: string;
  email: string;
  phone: string;
  userId: string;
  WorkExperience: WorkExperience[];
  Education: Education[];
  certifications: string[];
  skills: string[];
}

function UserResume () {
    //const [userResume, setUserResume] = useState<UserResume[] | null>(null);

    /*useEffect(() => {
        const fetchUserResume = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/userResume/user`, 
            { withCredentials: true });
            setUserResume(response.data);
          } catch (error) {
            console.error('Error fetching user resume:', error);
          }
        };
      
        fetchUserResume();
      }, []); */

      const userResumeQuery = useQuery({
        queryKey: ['userResume'],
        queryFn: async () => {
          const response = await api.get(`${BACKEND_URL}/userResume/user`, { withCredentials: true });
          const data = await response.data;
          return data;
        },
      });

      if (userResumeQuery.isLoading) return (<h1> Loading...</h1>)
      if (userResumeQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
      }
      if (userResumeQuery.isLoadingError) return (<h1> Loading Error...</h1>)// remove later

      //setUserResume(userResumeQuery.data);
      const userResume = userResumeQuery.data;

    return (
        <>
        <CheckAuthenticated />
         <div className="space-y-4">
        {userResume && userResume.map((resume: UserResume) => (
           <Link to="/userresume" key={resume._id}>
            <div key={resume._id} className="space-y-1 mb-5">
            <div className='font-semibold font-roboto leading-normal tracking-wide'>{parser(resume.name)}</div>
            <div className='font-medium font-roboto leading-normal tracking-wide'>{parser(resume.author)}</div>
            <div className='font-medium font-roboto leading-normal tracking-wide'>{parser(resume.email)}</div>
            <div className='font-medium font-roboto leading-normal tracking-wide'>{parser(resume.phone)}</div>
            </div>
            </Link>
        ))}
        </div>
        </>
    );
}

export default UserResume;