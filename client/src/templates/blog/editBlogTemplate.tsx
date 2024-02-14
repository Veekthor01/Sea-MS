import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogTemplateTextEditor from './blogTemplateTextEditor';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';
import LoaderSpinner from '../../components/loading';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface BlogTemplate {
  _id: string;
  name: string;
  title: string;
  content: string;
  author: string;
}

// Edit Blog Template Page
function EditBlogTemplate() {
  const [, setTemplate] = useState<BlogTemplate | null>(null);
  const [, setUserBlogId] = useState<string | null>(null);
  const { id } = useParams();

  const editBlogTemplateQuery = useQuery({
    queryKey: ['blogTemplate', id],
    queryFn: async () => {
      const response = await api.get(`${BACKEND_URL}/blogTemplate/id/${id}`, { withCredentials: true });
      const data = await response.data;
      return data;
    },
  });

  if (editBlogTemplateQuery.isLoading) return <LoaderSpinner />;
  if (editBlogTemplateQuery.isError) {
    toast.error('An error occurred. Please try again later.');
    return;
  }

  const template = editBlogTemplateQuery.data;

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
        toast.success('Blog saved successfully!!');
      } else {
        const errorMessage = responseUpdate.data.message || 'An error occurred. Please try again later.';
        toast.error(`${errorMessage}`);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('An error occurred. Please try again later.');
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
        <p>Wait a minute...</p>
      )}
    </div>
  );
}

export default EditBlogTemplate;