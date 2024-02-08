import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PortfolioTemplateTextEditor from './portfolioTemplateTextEditor';

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
    const [template, setTemplate] = useState<PortfolioTemplate | null>(null);
    const [, setUserPortfolioId] = useState<string | null>(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing portfolio template when the component is mounted
        axios.get(`${BACKEND_URL}/portfolioTemplate/id/${id}`)
            .then(response => setTemplate(response.data))
            .catch(error => console.error('Error fetching portfolio template:', error));
    }, [id]);

    const handleSave = async () => {
        if (!template) {
            return;
        }
        try {
            // Create a new user portfolio
            let responseCreate = await axios.post(`${BACKEND_URL}/userPortfolio`, { templateName: template.name });
            setUserPortfolioId(responseCreate.data._id); // Save the user portfolio ID
            // Update the newly created user portfolio
            let responseUpdate = await axios.put(`${BACKEND_URL}/userPortfolio/${responseCreate.data._id}`, {
                name: template.name,
                author: template.author,
                about: template.about,
                technologies: template.technologies,
                projects: template.projects,
            });

            if (responseUpdate.status === 200) {
                alert('Portfolio saved!');
            } else {
                console.error('Error saving portfolio:', responseUpdate.data.message);
            }
        } catch (error) {
            console.error('Error saving portfolio:', error);
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
            {template ? (
                <>
                    <PortfolioTemplateTextEditor value={template} onChange={handleTemplateChange} />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default EditPortfolioTemplate;