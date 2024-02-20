import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

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
    <div className='flex flex-col items-center justify-center'>
      <button onClick={handleGoogleSignup} disabled={isLoading} 
      className='w-56 py-2 px-4 border border-transparent text-zinc-100 rounded-md shadow-sm text-sm font-roboto font-medium bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 flex items-center justify-center leading-normal tracking-wide'>
        <FaGoogle className='mr-2' />
        {isLoading ? 'Signing Up...' : 'Sign up with Google'}
      </button>
    </div>
  );
}

export default GoogleSignup;