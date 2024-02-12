import { useEffect, useState } from 'react';
//import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserResumeTextEditor from './userResumeTextEditor';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';

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

function EditUserResume() {
    const [userResume, setUserResume] = useState<UserResume | null>(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing user resume when the component is mounted
        api.get(`${BACKEND_URL}/userResume/id/${id}`, { withCredentials: true })
            .then(response => setUserResume(response.data))
            .catch(error => console.error('Error fetching user resume:', error));
    }, [id]);

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