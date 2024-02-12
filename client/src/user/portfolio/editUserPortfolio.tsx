import { useEffect, useState } from 'react';
//import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserPortfolioTextEditor from './userPortfolioTextEditor';
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
    technologies: string[];
    projects: Projects[];
}

function EditUserPortfolio() {
    const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing user portfolio when the component is mounted
        api.get(`${BACKEND_URL}/userPortfolio/id/${id}`, { withCredentials: true })
            .then(response => setUserPortfolio(response.data))
            .catch(error => console.error('Error fetching user portfolio:', error));
    }
    , [id]);

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
            console.log('New Values:', newValues);
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
          <p>Loading...</p>
        )}
      </div>
    );
}

export default EditUserPortfolio;