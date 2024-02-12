import { useEffect, useState } from 'react';
//import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogTemplateTextEditor from './blogTemplateTextEditor';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface BlogTemplate {
  _id: string;
  name: string;
  title: string;
  content: string;
  author: string;
}

function EditBlogTemplate() {
  const [template, setTemplate] = useState<BlogTemplate | null>(null);
  const [, setUserBlogId] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch the existing blog template when the component is mounted
    api.get(`${BACKEND_URL}/blogTemplate/id/${id}`, { withCredentials: true })
      .then(response => setTemplate(response.data))
      .catch(error => console.error('Error fetching blog template:', error));
  }, [id]);

  const handleSave = async () => {
    if (!template) {
      return;
    }
    try {
      // Create a new user blog
      let responseCreate = await api.post(`${BACKEND_URL}/userBlog`, 
      { templateName: template.name }, { withCredentials: true });
      setUserBlogId(responseCreate.data._id); // Save the user blog ID
      // Update the newly created user blog
      let responseUpdate = await api.put(`${BACKEND_URL}/userBlog/${responseCreate.data._id}`, 
      {
        name: template.name,
        title: template.title,
        author: template.author,
        content: template.content,
      },
      { withCredentials: true });
  
      if (responseUpdate.status === 200) {
        alert('Blog saved!');
      } else {
        console.error('Error saving blog:', responseUpdate.data.message);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleTemplateChange = (newValues: Partial<BlogTemplate>) => {
    if (template) {
      console.log('New Values:', newValues);
      setTemplate({ ...template, ...newValues });
    }
  };

  return (
    <div>
      <CheckAuthenticated />
      {template ? (
        <>
        <button 
          className='mx-2 my-2 font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
          onClick={handleSave}>
            Save Template
          </button>
          <BlogTemplateTextEditor value={template} onChange={handleTemplateChange} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditBlogTemplate;