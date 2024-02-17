import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import UserResumeTextEditor from './userResumeTextEditor';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';
import LoaderSpinner from '../../components/loading';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface WorkExperience {
    company: string;
    position: string;
    startDate: string
    endDate: string;
    description: string[];
}

interface Education {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
}

interface UserResume {
    _id: string;
    name: string;
    author: string;
    email: string;
    phone: string;
    WorkExperience: WorkExperience[];
    Education: Education[];
    certifications: string[];
    skills: string[];
}

// Edit User Resume Page
function EditUserResume() {
    const [, setUserResume] = useState<UserResume | null>(null);
    const { id } = useParams();

    const userResumeQuery = useQuery({
        queryKey: ['userResume', id],
        queryFn: async () => {
            const response = await api.get(`${BACKEND_URL}/userResume/id/${id}`, { withCredentials: true });
            const data = await response.data;
            return data;
        },
    });

    if (userResumeQuery.isLoading) return <LoaderSpinner />;
    if (userResumeQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
    }

    // use data from the query
    const userResume = userResumeQuery.data;

    const handleSave = async () => {
        if (!userResume) {
            return;
        }
        try {
            // Update the user resume
            let response = await api.put(`${BACKEND_URL}/userResume/${userResume._id}`, {
                name: userResume.name,
                author: userResume.author,
                email: userResume.email,
                phone: userResume.phone,
                WorkExperience: userResume.WorkExperience,
                Education: userResume.Education,
                certifications: userResume.certifications,
                skills: userResume.skills,
            }, { withCredentials: true });

            if (response.status === 200) {
                alert('Resume saved!');
            } else {
                console.error('Error saving resume:', response.data.message);
            }
        } catch (error) {
            console.error('Error saving resume:', error);
        }
    }

    const handleUserResumeChange = (newValues: Partial<UserResume>) => {
        if (userResume) {
            console.log('New Values:', newValues);
            setUserResume({ ...userResume, ...newValues });
        }
    };

    return (
        <div>
            <CheckAuthenticated />
            <button
          className='mx-2 my-2 font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
          onClick={handleSave}>
            Save Resume
          </button>
        {userResume ? (
            <>
            <UserResumeTextEditor value={userResume} onChange={handleUserResumeChange} />
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );
}

export default EditUserResume;