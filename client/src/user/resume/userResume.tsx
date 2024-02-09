import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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


function UserResume () {
    const [userResume, setUserResume] = useState<UserResume[] | null>(null);

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
         <div className="bg-white p-6">
        {userResume && userResume.map((resume: UserResume) => (
            <div key={resume._id} className="mb-4">
            <div className="flex justify-end">
            <Link to={`/edituserresume/${resume._id}`}>
                <button className="font-roboto font-semiboldfont-roboto font-semibold border border-black text-black px-2 py-1 rounded hover:bg-black hover:text-white transition-colors duration-200">
                Edit Resume
                </button>
            </Link>
            </div>
            <h1 className="text-3xl font-sans font-bold mb-2 text-center">{parser(resume.author)}</h1>
            <div className="mb-2 font-roboto text-lg text-center">
                Email: {parser(resume.email)}
                <div className="mb-2 font-roboto text-lg text-center">
                     Phone: {parser(resume.phone)}
                </div>
                </div>
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />

                <h2 className="text-xl font-sans font-bold mb-2">WORK EXPERIENCE</h2>
                {resume.WorkExperience?.map((work, index) => (
                <div key={index} className="mb-2 font-roboto">
                    <h3 className="font-bold text-lg">{parser(work.position)}</h3>
                    <div>{parser(work.company)}</div>
                    <div className='italic'>Start Date: {parser(work.startDate?.toString())}</div>
                    <div  className='italic'>End Date: {parser(work.endDate?.toString())}</div>
                    <ul className="list-disc list-inside">
                        {work.description?.map((desc, index) => (
                        <li key={index} className="mb-1 mt-1 font-roboto">{parser(desc)}</li>
                        ))}
                    </ul>
                </div>
                ))}
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />

                <h2 className="text-xl font-sans font-bold mb-2">EDUCATION</h2>
                {resume.Education?.map((edu, index) => (
                <div key={index} className="mb-2 font-roboto">
                    <h3 className="font-bold text-lg">{parser(edu.school)}</h3>
                    <div>{parser(edu.degree)}</div>
                    <div className='italic'>Start Date: {parser(edu.startDate?.toString())}</div>
                    <div className='italic'>End Date: {parser(edu.endDate?.toString())}</div>
                </div>
                ))}
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />

                <h2 className="text-xl font-sans font-bold mb-2">CERTIFICATIONS</h2>
                <ul className="list-disc list-inside">
                    {resume.certifications?.map((cert, index) => (
                    <li key={index} className="mb-1 font-roboto">{parser(cert)}</li>
                    ))}
                </ul>
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />
                
                <h2 className="text-xl font-sans font-bold mb-2">SKILLS</h2>
                <ul className="list-disc list-inside">
                    {resume.skills?.map((skill, index) => (
                    <li key={index} className="mb-1 font-roboto">{parser(skill)}</li>
                    ))}
                </ul>
            </div>
            ))}
        </div>
    )
}

export default UserResume;