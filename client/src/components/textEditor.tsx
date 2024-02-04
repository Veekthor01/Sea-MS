import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

function TextEditor({ value, onChange }: TextEditorProps) {
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
    input.onchange = () => {
        if (input.files) {
          const file = input.files[0];
          const reader = new FileReader();
          // Read the selected file as a data URL
          reader.onload = () => {
            if (quill.current) {
              const imageUrl = reader.result;
              const quillEditor = quill.current.getEditor();
              // Get the current selection range and insert the image at that index
              const range = quillEditor.getSelection(true);
              quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
            }
          };
          reader.readAsDataURL(file);
        }
      };
  }, []);

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
  );
}

export default TextEditor;