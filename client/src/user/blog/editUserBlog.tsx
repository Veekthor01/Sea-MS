import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import UserBlogTextEditor from './userBlogTextEditor';
import CheckAuthenticated from '../../auth/authMiddleware';
import api from '../../auth/refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UserBlog {
    _id: string;
    name: string;
    title: string;
    content: string;
    author: string;
}

function EditUserBlog() {
    const [, setUserBlog] = useState<UserBlog | null>(null);
    const { id } = useParams();

    /*useEffect(() => {
        // Fetch the existing user blog when the component is mounted
        api.get(`${BACKEND_URL}/userBlog/id/${id}`, { withCredentials: true })
            .then(response => setUserBlog(response.data))
            .catch(error => console.error('Error fetching user blog:', error));
    }, [id]); */

    const userBlogQuery = useQuery({
        queryKey: ['userBlog', id],
        queryFn: async () => {
            const response = await api.get(`${BACKEND_URL}/userBlog/id/${id}`, { withCredentials: true });
            const data = await response.data;
            return data;
        },
    });

    if (userBlogQuery.isLoading) return (<h1> Loading...</h1>)
    if (userBlogQuery.isError) {
        toast.error('An error occurred. Please try again later.');
        return;
    }
    if (userBlogQuery.isLoadingError) return (<h1> Loading Error...</h1>)// remove later

    // use data from the query
    const userBlog = userBlogQuery.data;

    const handleSave = async () => {
        if (!userBlog) {
            return;
        }
        try {
            // Update the user blog
            let response = await api.put(`${BACKEND_URL}/userBlog/${userBlog._id}`, {
                name: userBlog.name,
                title: userBlog.title,
                content: userBlog.content,
                author: userBlog.author,
            }, { withCredentials: true });

            if (response.status === 200) {
                toast.success('Blog saved successfully.');
            } else {
                console.error('Error saving blog:', response.data.message);
                toast.error('An error occurred. Please try again later.');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            toast.error('An error occurred. Please try again later.');
        }
    }

    const handleUserBlogChange = (newValues: Partial<UserBlog>) => {
        if (userBlog) {
            console.log('New Values:', newValues);
            setUserBlog({ ...userBlog, ...newValues });
        }
    };

    return (
        <div>
            <CheckAuthenticated />
        {userBlog ? (
          <>
          <button 
            className='mx-2 my-2 font-roboto font-semibold bg-black text-white px-2 py-1 rounded'
            onClick={handleSave}>
              Save Blog
            </button>
            <UserBlogTextEditor value={userBlog} onChange={ handleUserBlogChange} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}

export default EditUserBlog;