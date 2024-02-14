import { useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function GoogleSignup () {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGoogleSignup = () => {
    setIsLoading(true);
    try {
    // Redirect the user to the Google OAuth endpoint
    window.location.href = `${BACKEND_URL}/auth/google`;
    } catch (error: any) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='mb-6 text-3xl font-bold text-gray-900'>Google Signup</h1>
    <button onClick={handleGoogleSignup} disabled={isLoading} 
    className='w-64 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        {isLoading ? 'Logging in...' : 'Sign up with Google'}
      </button>
    </div>
  );
}

export default GoogleSignup;