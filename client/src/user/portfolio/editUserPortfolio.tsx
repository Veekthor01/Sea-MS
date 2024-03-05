import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import UserPortfolioTextEditor from './userPortfolioTextEditor';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';
import LoaderSpinner from '../../components/loading';

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
    technologies: string[];
    projects: Projects[];
}

// Edit User Portfolio Page
function EditUserPortfolio() {
    const [, setUserPortfolio] = useState<UserPortfolio | null>(null);
    const { id } = useParams();

    const userPortfolioQuery = useQuery({
        queryKey: ['userPortfolio', id],
        queryFn: async () => {
            const response = await api.get(`${BACKEND_URL}/userPortfolio/id/${id}`, { withCredentials: true });
            const data = await response.data;
            return data;
        },
    });

    if (userPortfolioQuery.isLoading) return <LoaderSpinner />;
    if (userPortfolioQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
    }

    // use data from the query
    const userPortfolio = userPortfolioQuery.data;

    const handleSave = async () => {
        if (!userPortfolio) {
            return;
        }
        try {
            // Update the user portfolio
            let response = await api.put(`${BACKEND_URL}/userPortfolio/${userPortfolio._id}`, {
                name: userPortfolio.name,
                author: userPortfolio.author,
                about: userPortfolio.about,
                technologies: userPortfolio.technologies,
                projects: userPortfolio.projects,
            }, { withCredentials: true });

            if (response.status === 200) {
                alert('Portfolio saved!');
            } else {
                console.error('Error saving portfolio:', response.data.message);
            }

        } catch (error) {
            console.error('Error saving portfolio:', error);
        }
    }

    const handleUserPortfolioChange = (newValues: Partial<UserPortfolio>) => {
        if (userPortfolio) {
            setUserPortfolio({ ...userPortfolio, ...newValues });
        }
    };

    return (
        <div>
           <CheckAuthenticated />
             <button
          className='mx-2 my-2 font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
          onClick={handleSave}>
            Save Portfolio
          </button>
        {userPortfolio ? (
          <>
            <UserPortfolioTextEditor value={userPortfolio} onChange={handleUserPortfolioChange} />
          </>
        ) : (
          <p>Wait a minute...</p>
        )}
      </div>
    );
}

export default EditUserPortfolio;