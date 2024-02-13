import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import PortfolioTemplateTextEditor from './portfolioTemplateTextEditor';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Projects {
    name: string;
    description: string;
    technologies: string[];
    url: string;
}

interface PortfolioTemplate {
    _id: string;
    name: string;
    author: string;
    about: string;
    technologies: string[];
    projects: Projects[];
}

function EditPortfolioTemplate() {
    const [, setTemplate] = useState<PortfolioTemplate | null>(null);
    const [, setUserPortfolioId] = useState<string | null>(null);
    const { id } = useParams();

    /*useEffect(() => {
        // Fetch the existing portfolio template when the component is mounted
        api.get(`${BACKEND_URL}/portfolioTemplate/id/${id}`, { withCredentials: true })
            .then(response => setTemplate(response.data))
            .catch(error => console.error('Error fetching portfolio template:', error));
    }, [id]); */

    const editPortfolioTemplateQuery = useQuery({
        queryKey: ['portfolioTemplate', id],
        queryFn: async () => {
            const response = await api.get(`${BACKEND_URL}/portfolioTemplate/id/${id}`, { withCredentials: true });
            const data = await response.data;
            return data;
        },
    });

    if (editPortfolioTemplateQuery.isLoading) return (<h1> Loading...</h1>)
    if (editPortfolioTemplateQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
    }
    if (editPortfolioTemplateQuery.isLoadingError) return (<h1> Loading Error...</h1>)// remove later

    //setTemplate(editPortfolioTemplateQuery.data);
    const template = editPortfolioTemplateQuery.data;

    const handleSave = async () => {
        if (!template) {
            return;
        }
        try {
            // Create a new user portfolio
            let responseCreate = await api.post(`${BACKEND_URL}/userPortfolio`, 
            { templateName: template.name }, { withCredentials: true });
            setUserPortfolioId(responseCreate.data._id); // Save the user portfolio ID
            // Update the newly created user portfolio
            let responseUpdate = await api.put(`${BACKEND_URL}/userPortfolio/${responseCreate.data._id}`, {
                name: template.name,
                author: template.author,
                about: template.about,
                technologies: template.technologies,
                projects: template.projects,
            }, { withCredentials: true });

            if (responseUpdate.status === 200) {
                toast.success('Portfolio saved successfully!')
            } else {
                const errorMessage = responseUpdate.data.message || 'An error occurred. Please try again later.';
                toast.error(`${errorMessage}`);
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            toast.error('An error occurred. Please try again later.');
        }
    }

    const handleTemplateChange = (newValues: Partial<PortfolioTemplate>) => {
        if (template) {
            console.log('New Values:', newValues);
            setTemplate({ ...template, ...newValues });
        }
    };

    return (
        <div>
            <CheckAuthenticated />
            <button
          className='mx-2 my-2 font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
          onClick={handleSave}>
            Save Template
          </button>
            {template ? (
                <>
                    <PortfolioTemplateTextEditor value={template} onChange={handleTemplateChange} />
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default EditPortfolioTemplate;