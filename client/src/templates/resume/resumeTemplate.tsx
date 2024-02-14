import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import {ObjectId} from 'mongodb';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';
import LoaderSpinner from '../../components/loading';
import '../template.css'

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
    _id: ObjectId;
    name: string;
    author: string;
    email: string;
    phone: string;
    WorkExperience: WorkExperience[];
    Education: Education[];
    certifications: string[];
    skills: string[];
}

// Resume Template Page
function ResumeTemplate() {
    const resumeTemplateQuery = useQuery({
        queryKey: ['resumeTemplate'],
        queryFn: async () => {
            const response = await api.get(`${BACKEND_URL}/resumeTemplate`, { withCredentials: true });
            const data = await response.data;
            return data;
          },
          staleTime: 1000 * 60 * 30,
        })

    if (resumeTemplateQuery.isLoading) return <LoaderSpinner />;
    if (resumeTemplateQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
    }

    return (
        <div className="bg-white p-6">
        <CheckAuthenticated />
            {resumeTemplateQuery.data.map((resume: ResumeTemplate) => (
            <div key={resume._id.toString()} className="mb-4">
                <div className="flex justify-end">
                <Link to={`/editResumeTemplate/${resumeTemplateQuery.data[0]._id}`}>
                  <button className="font-roboto font-semiboldfont-roboto font-semibold border border-black text-black px-2 py-1 rounded hover:bg-black hover:text-white transition-colors duration-200">
                    Edit Template
                  </button>
                </Link>
                </div>
                <h1 className="text-3xl font-sans font-bold mb-2 text-center">{resume.author}</h1>
                <p className="mb-2 font-roboto text-lg text-center">Email: {resume.email} || Phone: {resume.phone}</p>
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />

                <h2 className="text-xl font-sans font-bold mb-2">WORK EXPERIENCE</h2>
                {resume.WorkExperience?.map((work, index) => (
                <div key={index} className="mb-2 font-roboto">
                    <h3 className="font-bold text-lg">{work.position}</h3>
                    <p>{work.company}</p>
                    <p className='italic'>Start Date: {work.startDate?.toString()}</p>
                    <p  className='italic'>End Date: {work.endDate?.toString()}</p>
                    <ul className="list-disc list-inside">
                        {work.description?.map((desc, index) => (
                        <li key={index} className="mb-1 mt-1 font-roboto">{desc}</li>
                        ))}
                    </ul>
                </div>
                ))}
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />

                <h2 className="text-xl font-sans font-bold mb-2">EDUCATION</h2>
                {resume.Education?.map((edu, index) => (
                <div key={index} className="mb-2 font-roboto">
                    <h3 className="font-bold text-lg">{edu.school}</h3>
                    <p>{edu.degree}</p>
                    <p className='italic'>Start Date: {edu.startDate?.toString()}</p>
                    <p className='italic'>End Date: {edu.endDate?.toString()}</p>
                </div>
                ))}
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />

                <h2 className="text-xl font-sans font-bold mb-2">CERTIFICATIONS</h2>
                <ul className="list-disc list-inside">
                    {resume.certifications?.map((cert, index) => (
                    <li key={index} className="mb-1 font-roboto">{cert}</li>
                    ))}
                </ul>
                <hr style={{ margin: '1rem 0', borderTop: '2px solid #1a202c' }} />
                
                <h2 className="text-xl font-sans font-bold mb-2">SKILLS</h2>
                <ul className="list-disc list-inside">
                    {resume.skills?.map((skill, index) => (
                    <li key={index} className="mb-1 font-roboto">{skill}</li>
                    ))}
                </ul>
            </div>
            ))}
        </div>
    )
}

export default ResumeTemplate