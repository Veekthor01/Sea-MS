import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface BlogTemplate {
  _id: string;
  name: string;
  title: string;
  content: string;
  author: string;
}

interface TextEditorProps {
  value: BlogTemplate;
  onChange: (template: Partial<BlogTemplate>) => void;
}

function BlogTemplateTextEditor({ value, onChange }: TextEditorProps) {
 const quill = useRef<ReactQuill>(null);
 const [editorContent, setEditorContent] = useState('');
 const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

 useEffect(() => {
  setEditorContent(value.content);
  setTitle(value.title);
  setAuthor(value.author);
}, [value]);


    
 const handleValueChange = (newValue: string) => {
  setEditorContent(newValue);
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
      const range = quillEditor.getSelection(true);
      quillEditor.deleteText(range.index, 1);
    }
  }


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
      <ReactQuill theme="snow"
        modules={modules}
        formats={formats}
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <ReactQuill theme="snow"
        modules={modules}
        formats={formats}
        value={author}
        onChange={handleAuthorChange}
        placeholder="Author"
      />
      <ReactQuill theme="snow"
        modules={modules}
        formats={formats}
        ref={quill}
        value={editorContent}
        onChange={handleValueChange}
      />
    </div>
    <div>
    <button onClick={removeImage}>Remove Image</button>
  </div>
</>
  );
}

export default BlogTemplateTextEditor;
/* const removeImage = () => {
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
  That's great! The code you used is a simplified version of the removeImage function. 
  It assumes that the current selection is an image and directly deletes it. 
  This will work fine if you ensure that the user only clicks the "Remove Image" button 
  when an image is selected. If the user clicks the button when the selection is not an image, 
  it will delete the character at the current selection. 
  If this behavior is acceptable in your application, then your simplified code is a good solution.
  */