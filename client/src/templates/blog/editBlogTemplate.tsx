import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogTemplateTextEditor from './blogTemplateTextEditor';

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
    axios.get(`${BACKEND_URL}/blogTemplate/id/${id}`)
      .then(response => setTemplate(response.data))
      .catch(error => console.error('Error fetching blog template:', error));
  }, [id]);

  const handleSave = async () => {
    if (!template) {
      return;
    }
    try {
      // Create a new user blog
      let responseCreate = await axios.post(`${BACKEND_URL}/userBlog`, { templateName: template.name });
      setUserBlogId(responseCreate.data._id); // Save the user blog ID
      // Update the newly created user blog
      let responseUpdate = await axios.put(`${BACKEND_URL}/userBlog/${responseCreate.data._id}`, {
        name: template.name,
        title: template.title,
        author: template.author,
        content: template.content,
      });
  
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
      {template ? (
        <>
          <BlogTemplateTextEditor value={template} onChange={handleTemplateChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditBlogTemplate;