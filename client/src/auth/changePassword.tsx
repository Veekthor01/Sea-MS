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
    <form onSubmit={handleSubmit}>
      <label>
        Old Password:
        <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
      </label>
      <label>
        New Password:
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
      </label>
      <button type="submit">Change Password</button>
    </form>
    </>
  );
}

export default ChangePasswordForm;