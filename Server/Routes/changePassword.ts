import express from 'express';
import validator from 'validator';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { changePassword, getUserById } from '../DB/user';
import authenticateJWT from '../Passport-Config/auth';

const router = express.Router();
 
// Route to change the password
router.put('/', authenticateJWT, async (req, res) => {
    const { oldPassword, newPassword }: { oldPassword: string, newPassword: string } = req.body;
    try {
        const userId = req.user;
        if (!userId) {
            return res.status(400).json({ message: 'User ID not found' });
        }
        // Get the user from the database
        const user = await getUserById(new ObjectId(userId.toString()));
        if (user) {
            if (!user.password) {
                return res.status(400).json({ message: 'Please enter your password' });
            }
            const isValidPassword = await bcrypt.compare(oldPassword, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            // Validate the new password
            if (!validator.isLength(newPassword, { min: 4 })) {
                return res.status(400).json({ message: 'Password must be at least 4 characters' });
            }
            // Change the password
            await changePassword(userId.toString(), newPassword);
            return res.status(200).json({ message: 'Password changed successfully' });
        } else {
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (err) {
        console.log('Error in POST /changePassword', err);
        return res.status(400).json({ message: 'Failed to change password' });
    }
});

export default router;