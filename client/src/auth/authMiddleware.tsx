import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from './refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Middleware to check if the user is authenticated
function CheckAuthenticated() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get(`${BACKEND_URL}/protected`, { withCredentials: true });

                if (response.status === 200) {
                    setIsLoading(false);
                } else {
                    toast.error('Please log in to continue.');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                navigate('/login');
            }
        };

        verifyToken();
    }, [navigate]);

    if (isLoading) {
        return <div>...</div>;
    }

    return null;
}

export default CheckAuthenticated;