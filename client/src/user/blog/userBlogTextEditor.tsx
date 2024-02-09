import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Quill from 'quill';

// Define the custom blot to apply the class to the image
const BlockEmbed = Quill.import('blots/block/embed');
class ImageBlot extends BlockEmbed {
  static create(value: { alt: any; url: any; }) {
    let node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    node.setAttribute('class', "portfolio-img");// works for both user blog and user portfolio
    return node;
  }

  static value(node: { getAttribute: (arg0: string) => any; }) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    };
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UserBlog {
    _id: string;
    name: string;
    title: string;
    content: string;
    author: string;
}

interface TextEditorProps {
  value: UserBlog;
  onChange: (userBlog: Partial<UserBlog>) => void;
}

function UserBlogTextEditor({ value, onChange }: TextEditorProps) {
  const quill = useRef<ReactQuill>(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    setName(value.name);
    setContent(value.content);
    setTitle(value.title);
    setAuthor(value.author);
  }, [value]);

  const handleNameChange = (newValue: string) => {
    setName(newValue);
    const updatedValue = { ...value, name: newValue };
    onChange(updatedValue);
  }

  const handleContentChange = (newValue: string) => {
    setContent(newValue);
    const updatedValue = { ...value, content: newValue };
    console.log('Updated Value:', updatedValue); // Log for debugging
    onChange(updatedValue);
  };
  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
    const updatedValue = { ...value, title: newValue };
    onChange(updatedValue);
  }

  const handleAuthorChange = (newValue: string) => {
    setAuthor(newValue);
    const updatedValue = { ...value, author: newValue };
    onChange(updatedValue);
  };

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
                console.error('Error uploading image:', response.data.message);
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

  // Define the toolbar options
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },  
    }), [imageHandler]);

    return (
        <div>
        <h1 className='font-roboto font-semibold'> URL Name()</h1>
        <ReactQuill theme="snow"
        modules={modules}
        formats={formats}
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
        />
         <h1 className='font-roboto font-semibold'>Title</h1>
        <ReactQuill theme="snow"
        modules={modules}
        formats={formats}
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <h1 className='font-roboto font-semibold'>Name</h1> 
      <ReactQuill theme="snow"
        modules={modules}
        formats={formats}
        value={author}
        onChange={handleAuthorChange}
        placeholder="Author"
      />
      <div className="flex justify-end">
      <button 
        className='mx-2 my-2 text-sm font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
      onClick={removeImage}>Remove Image</button>
    </div>
      <h1 className='font-roboto font-semibold'>Content</h1>
         <ReactQuill 
        theme="snow"
        ref={quill}
        value={content}
        onChange={handleContentChange}
        modules={modules}
            />
        </div>
        );
    }

export default UserBlogTextEditor;