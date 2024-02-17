import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import GoogleSignup from './googleSignup';
import { useNavigate } from 'react-router-dom';
import api from './refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`${BACKEND_URL}/signup`,
       { username, password }, { withCredentials: true });

       toast.success(response.data.message);
      setUsername('');
      setPassword('');
      navigate('/template');
    } catch (error: any) {
      if (error.response.status === 500) {
        toast.error('Something went wrong. Please try again later.');
    } else {
        toast.error(error.response.data.message);
    }
  }
  };


  return (
  <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
    <div className='w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
        <h1 className='mb-6 text-xl md:text-2xl text-zinc-900 font-roboto font-bold leading-normal tracking-wide'>
          Create a new account
          </h1>
        <GoogleSignup />
        <div className='my-4 flex items-center'>
          <hr className='w-full border border-zinc-900' />
          <span className='mx-2 font-roboto'>or</span>
          <hr className='w-full border border-zinc-900' />
        </div>
          <div>
            <label className='block mb-2 text-sm font-roboto font-bold leading-normal tracking-wide'>
              Username
            </label>
            <input type="text"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5'
              required 
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-roboto font-bold leading-normal tracking-wide'>
              Password
              </label>
            <input type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5'
              required 
            />
          </div>
          <button type="submit" className='w-full font-roboto text-zinc-100 bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center leading-normal tracking-wide'>
            Signup
          </button>
          <p className='text-sm font-roboto font-light leading-normal tracking-wide'>
            Already have an account? <Link to='/login' className='font-bold text-zinc-900 hover:underline'>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  );
}

export default SignupPage