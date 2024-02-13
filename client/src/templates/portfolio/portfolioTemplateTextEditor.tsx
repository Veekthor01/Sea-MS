import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Projects {
    name: string;
    description: string;
    technologies: string[];
    url: string;
}

interface PortfolioTemplate {
    _id: string;
    author: string;
    about: string;
    technologies: string[];
    projects: Projects[];
}

interface TextEditorProps {
    value: PortfolioTemplate;
    onChange: (template: Partial<PortfolioTemplate>) => void;
}

function PortfolioTemplateTextEditor({ value, onChange }: TextEditorProps) {
    const quill = useRef<ReactQuill>(null);
    const [author, setAuthor] = useState('');
    const [about, setAbout] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [projects, setProjects] = useState<Projects[]>([]);

    useEffect(() => {
        setAuthor(value.author);
        setAbout(value.about);
        setTechnologies(value.technologies.join(', '));
        setProjects(value.projects || []);
    }, [value]);
    
    const handleAuthorChange = (newValue: string) => {
        setAuthor(newValue);
        const updatedValue = { ...value, author: newValue };
        onChange(updatedValue);
    };
    
    const handleAboutChange = (newValue: string) => {
        setAbout(newValue);
        const updatedValue = { ...value, about: newValue };
        onChange(updatedValue);
    };

    const handleTechnologiesChange = (newValue: string) => {
      setTechnologies(newValue);
      const updatedValue = { ...value, technologies: newValue.split(', ').filter(Boolean) };
      onChange(updatedValue);
    };
       

    const handleProjectsChange = (newValue: Partial<Projects>, index: number) => {
        const newProjects = [...projects];
        newProjects[index] = { ...newProjects[index], ...newValue };
        setProjects(newProjects);
        const updatedValue = { ...value, projects: newProjects };
        onChange(updatedValue);
    }
    
    // Define the image handler
  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    // When a file is selected
    input.onchange = async () => {
        if (input.files) {
          const file = input.files[0];
          const reader = new FileReader();
          // Read the selected file as a data URL
          reader.onload = async () => {
            if (quill.current) {
              const imageUrl = reader.result;
              const quillEditor = quill.current.getEditor();
              // Get the current selection range and insert the image at that index
              const range = quillEditor.getSelection(true);
              quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
              // Upload the image to the server
              const formData = new FormData();
              formData.append('file', file);
              let response = await axios.post(`${BACKEND_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              if (response.status === 200) {
                console.log('Image uploaded!');
                alert('Image uploaded!');
                // Replace the Data URL with the URL of the uploaded image
                const uploadedImageUrl = response.data.publicUrl; // Adjust this line based on the actual structure of your response
                quillEditor.deleteText(range.index, 1);
                quillEditor.insertEmbed(range.index, "image", uploadedImageUrl, "user");
              } else {
                if (response.status === 500) {
                    toast.error('Something went wrong. Please try again later.');
                } else {
                    toast.error(`Error uploading image: ${response.data.message}`);
                }
                quillEditor.deleteText(range.index, 1);
            }
            }
          };
          reader.readAsDataURL(file);
        }
      };
  }, []);

    // Function to remove image from text editor
    const removeImage = () => {
      if (quill.current) {
        const quillEditor = quill.current.getEditor();
        const range = quillEditor.getSelection();
        if (range) {
          if (range.length == 0) {
            const [leaf] = quillEditor.getLeaf(range.index);
            if (leaf) {
              const formats = leaf.formats();
              if (formats.image) {
                quillEditor.deleteText(range.index, 1);
              }
            }
          } else {
            const [leaf] = quillEditor.getLeaf(range.index + range.length);
            if (leaf) {
              const formats = leaf.formats();
              if (formats.image) {
                quillEditor.deleteText(range.index, range.length);
              }
            }
          }
        }
      }
    };

    // Define the formats for the toolbar
    const formats = ["header","bold","italic","underline","strike","blockquote","list","bullet",
    "indent","link","image","color","clean"];

        // Define the modules for the toolbar
        const modules = useMemo(
            () => ({
            toolbar: {
                container: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote", 'strike'],
                [{ color: [] }],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
                ],
                handlers: {
                image: imageHandler,
                },
            },
            clipboard: {
                matchVisual: true,
            },
            }),
            [imageHandler]
        );

    return (
        <>
        <div>
        <div className="flex justify-end">
      <button 
        className='mx-2 my-2 text-sm font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
      onClick={removeImage}>Remove Image</button>
    </div>
    <h1 className='font-roboto font-semibold'>Name and Profile Picture</h1>
        <ReactQuill
                theme="snow"
                ref={quill}
                value={author}
                onChange={handleAuthorChange}
                modules={modules}
                formats={formats}
            />
            <h1 className='font-roboto font-semibold'>About</h1>
            <ReactQuill
                theme="snow"
                ref={quill}
                value={about}
                onChange={handleAboutChange}
                modules={modules}
                formats={formats}
            />
            <h1 className='font-roboto font-semibold'>Technologies</h1>
            <ReactQuill
                theme="snow"
                value={technologies}
                onChange={handleTechnologiesChange}
                modules={modules}
                formats={formats}
              />
            {projects.map((project, index) => (
            <ProjectForm
                key={index}
                value={project}
                onChange={(newValue) => handleProjectsChange(newValue, index)}
            />
            ))}
        </div>
      </>
    );
}


interface ProjectFormProps {
    value: Projects;
    onChange: (project: Partial<Projects>) => void;
  }
  
  export function ProjectForm({ value, onChange }: ProjectFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [url, setUrl] = useState('');
  
    useEffect(() => {
      setName(value.name);
      setDescription(value.description);
      setTechnologies(value.technologies.join(', '));
      setUrl(value.url);
    }, [value]);
  
    const handleNameChange = (newValue: string) => {
      setName(newValue);
      const updatedValue = { ...value, name: newValue };
      onChange(updatedValue);
    };
  
    const handleDescriptionChange = (newValue: string) => {
      setDescription(newValue);
      const updatedValue = { ...value, description: newValue };
      onChange(updatedValue);
    };
  
    const handleTechnologiesChange = (newValue: string) => {
      setTechnologies(newValue);
      const updatedValue = { ...value, technologies: newValue.split(', ').filter(Boolean) };
      onChange(updatedValue);
    };
  
    const handleUrlChange = (newValue: string) => {
      setUrl(newValue);
      const updatedValue = { ...value, url: newValue };
      onChange(updatedValue);
    };
    // Define the formats for the toolbar
    const formats = ["header","bold","italic","underline","strike","blockquote","list","bullet",
    "indent","link","image","color","clean"];

        // Define the modules for the toolbar
        const modules = useMemo(
            () => ({
            toolbar: {
                container: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote", 'strike'],
                [{ color: [] }],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
                ],
            },
            clipboard: {
                matchVisual: true,
            },
            }),
            []
        );

  
    return (
      <div>
        <h2 className='font-roboto font-semibold'>Project Name</h2>
        <ReactQuill
          theme="snow"
          value={name}
          onChange={handleNameChange}
          modules={modules}
          formats={formats}
        />
        <h2 className='font-roboto font-semibold'>Project Description</h2>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={handleDescriptionChange}
          modules={modules}
          formats={formats}
        />
        <h2 className='font-roboto font-semibold'>Project Technologies</h2>
        <ReactQuill
          theme="snow"
          value={technologies}
          onChange={handleTechnologiesChange}
          modules={modules}
          formats={formats}
        />
        <h2 className='font-roboto font-semibold'>Project URL</h2>
        <ReactQuill
            theme="snow"
            value={url}
            onChange={handleUrlChange}
        />
      </div>
    );
  }

export default PortfolioTemplateTextEditor;