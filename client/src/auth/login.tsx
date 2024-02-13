import { useState } from 'react';
import { toast } from 'react-toastify';
import GoogleLogin from './googleLogin';
import api from './refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function LoginPage () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post(`${BACKEND_URL}/login`, 
            { username, password }, { withCredentials: true });

            toast.success(response.data.message);
            setUsername('');
            setPassword('');
        } catch (error: any) {
            if (error.response.status === 500) {
                toast.error('Something went wrong. Please try again later.');
            } else {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h1 className='mb-6 text-3xl font-bold text-gray-900'>Login</h1>
            <form onSubmit={handleSubmit} className='w-64'>
                <label className='block mb-4'>
                    <span className='text-gray-700'>Username:</span>
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        required
                    />
                </label>
                <label className='block mb-6'>
                    <span className='text-gray-700'>Password:</span>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        required
                    />
                </label>
                <button type="submit" className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Login
                </button>
                <GoogleLogin />
            </form>
        </div>
    );
}

export default LoginPage;