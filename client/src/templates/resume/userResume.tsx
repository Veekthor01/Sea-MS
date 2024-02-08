import { useEffect, useState } from 'react';
import axios from 'axios';
import parser from 'html-react-parser';

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

interface ResumeTemplate {
    _id: string;
    name: string;
    author: string;
    email: string;
    phone: string;
    workExperience: WorkExperience[];
    education: Education[];
    certifications: string[];
    skills: string[];
}

function UserResume () {
    const [userResume, setUserResume] = useState<ResumeTemplate[] | null>(null);

    useEffect(() => {
        const fetchUserResume = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/userResume`);
            setUserResume(response.data);
          } catch (error) {
            console.error('Error fetching user resume:', error);
          }
        };
      
        fetchUserResume();
      }, []);

    return (
        <>
        <div>
        {userResume && userResume.map((resume: ResumeTemplate) => (
            <div key={resume._id}>
            <div>{parser(resume.name)}</div>
            <div>{parser(resume.author)}</div>
            <div>{parser(resume.email)}</div>
            <div>{parser(resume.phone)}</div>
            </div>
        ))}
        </div>
        </>
    );
}

export default UserResume;