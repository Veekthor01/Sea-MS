import  { useState } from 'react';
import { toast } from 'react-toastify';
import CheckAuthenticated from './authMiddleware';
import api from './refreshMiddleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.put(`${BACKEND_URL}/changePassword`, 
        { oldPassword, newPassword }, 
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setOldPassword('');
      setNewPassword('');
    } catch (error: any) {
      if (error.response.status === 500) {
        toast.error('Something went wrong. Please try again later.');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <CheckAuthenticated />
      <section className='bg-zinc-100'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <h1 className='mb-6 text-center text-xl md:text-2xl text-zinc-900 font-roboto font-bold leading-normal tracking-wide'>
            Change Your Password
            </h1>
          <form onSubmit={handleSubmit} className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <div>
              <label className='block mb-2 text-sm font-roboto font-bold leading-normal tracking-wide'>
                  Old Password
                  </label>
                <input type="password" 
                  value={oldPassword} 
                  onChange={e => setOldPassword(e.target.value)} 
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5'
                  required 
                />
              </div>
              <div>
              <label className='block mb-2 text-sm font-roboto font-bold leading-normal tracking-wide'>
                  New Password
                  </label>
                <input type="password" 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)} 
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5'
                  required 
                />
              </div>
              <button type="submit" 
           className='w-full font-roboto text-zinc-100 bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center leading-normal tracking-wide'>
                Change Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ChangePasswordForm;