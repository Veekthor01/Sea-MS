import { toast } from 'react-toastify';
import api from './refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function Logout() {
    try {
        const response = await api.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });

        if (response.status === 200) {
            toast.info(response.data.message);
        } else {
            toast.error('Logout failed');
        }
    } catch (err) {
        toast.error('Something went wrong. Please try again later.');
    }
};

export default Logout;