import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {ObjectId} from 'mongodb';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface WorkExperience {
    company?: string;
    position?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string[];
}

interface Education {
    school?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: Date;
    endDate?: Date;
}

interface ResumeTemplate {
    _id: ObjectId;
    name?: string;
    author?: string;
    email?: string;
    phone?: string;
    WorkExperience?: WorkExperience[];
    Education?: Education[];
    certifications?: string[];
    skills?: string[];
}

function ResumeTemplate() {
    const resumeTemplateQuery = useQuery({
        queryKey: ['resumeTemplate'],
        queryFn: async () => {
            const response = await axios.get(`${BACKEND_URL}/resumeTemplate`);
            const data = await response.data;
            return data;
          },
            staleTime: 1000 * 60 * 2, // 2 minutes or set to 0 for no caching or Infinity for no re-fetching
        })

    if (resumeTemplateQuery.isLoading) return (<h1> Loading...</h1>)
    if (resumeTemplateQuery.isError) return (<h1> Error: {resumeTemplateQuery.error.message}</h1>)
    if (resumeTemplateQuery.isLoadingError) return (<h1> Loading Error...</h1>)

  return (
    <div>
      <h1>Resume templates</h1>
        <div>
        {resumeTemplateQuery.data.map((resume: ResumeTemplate) => (
        <div key={resume._id.toString()}>
            <h2>{resume.name}</h2>
            <p>{resume.author}</p>
            <p>Email: {resume.email}</p>
            <p>Phone: {resume.phone}</p>
            {resume.WorkExperience?.map((work, index) => (
            <div key={index}>
                <h3>{work.company}</h3>
                <p>{work.position}</p>
                <p>Start Date: {work.startDate?.toString()}</p>
                <p>End Date: {work.endDate?.toString()}</p>
                {work.description?.map((desc, index) => (
                <p key={index}>{desc}</p>
                ))}
            </div>
            ))}
            {resume.Education?.map((edu, index) => (
            <div key={index}>
                <h3>{edu.school}</h3>
                <p>{edu.degree}</p>
                <p>Field of Study: {edu.fieldOfStudy}</p>
                <p>Start Date: {edu.startDate?.toString()}</p>
                <p>End Date: {edu.endDate?.toString()}</p>
            </div>
            ))}
            {resume.certifications?.map((cert, index) => (
            <p key={index}>{cert}</p>
            ))}
            {resume.skills?.map((skill, index) => (
            <p key={index}>{skill}</p>
            ))}
        </div>
        ))}
        </div>
    </div>
  )
}

export default ResumeTemplate