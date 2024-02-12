import { useEffect, useState } from 'react';
//import axios from 'axios';
import { useParams } from 'react-router-dom';
import ResumeTemplateTextEditor from './resumeTemplateTextEditor';
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

interface ResumeTemplate {
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

function EditResumeTemplate() {
    const [template, setTemplate] = useState<ResumeTemplate | null>(null);
    const [, setUserResumeId] = useState<string | null>(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing resume template when the component is mounted
        api.get(`${BACKEND_URL}/resumeTemplate/id/${id}`, { withCredentials: true })
            .then(response => setTemplate(response.data))
            .catch(error => console.error('Error fetching resume template:', error));
    }, [id]);

    const handleSave = async () => {
        if (!template) {
            return;
        }
        try {
            // Create a new user resume
            let responseCreate = await api.post(`${BACKEND_URL}/userResume`, 
            { templateName: template.name }, { withCredentials: true });
            setUserResumeId(responseCreate.data._id); // Save the user resume ID
            // Update the newly created user resume
            let responseUpdate = await api.put(`${BACKEND_URL}/userResume/${responseCreate.data._id}`, {
                name: template.name,
                author: template.author,
                email: template.email,
                phone: template.phone,
                WorkExperience: template.WorkExperience,
                Education: template.Education,
                certifications: template.certifications,
                skills: template.skills,
            }, { withCredentials: true });

            if (responseUpdate.status === 200) {
                alert('Resume saved!');
            } else {
                console.error('Error saving resume:', responseUpdate.data.message);
            }
        } catch (error) {
            console.error('Error saving resume:', error);
        }
    }

    const handleTemplateChange = (newValues: Partial<ResumeTemplate>) => {
        if (template) {
            console.log('New Values:', newValues);
            setTemplate({ ...template, ...newValues });
        }
    };

    return (
        <div>
            <CheckAuthenticated />
            <div>
            <button 
          className='mx-2 my-2 font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
          onClick={handleSave}>
            Save Template
          </button>
            {template ? (
                <>
                    <ResumeTemplateTextEditor value={template} onChange={handleTemplateChange} />
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
        </div>
    );
}

export default EditResumeTemplate;