import express from 'express';
import validator from 'validator';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { changePassword, getUserById } from '../DB/user';

const router = express.Router();

interface RequestWithUserId extends express.Request {
    userId: string;
} 

// Put /changePassword
router.put('/', async (req, res) => {
    const { oldPassword, newPassword }: { oldPassword: string, newPassword: string } = req.body;
    try {
        const { userId } = req as RequestWithUserId;// get the userId from the request object
        // Get the user from the database
        const user = await getUserById(new ObjectId(userId));
        if (user) {
            if (!user.password) {
                return res.status(400).json({ message: 'Please enter your password' });
            }
            const isValidPassword = await bcrypt.compare(oldPassword, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }}
        // Validate the new password
        if (!validator.isLength(newPassword, { min: 4 })) {
            return res.status(400).json({ message: 'Password must be at least 4 characters' });
        }
        // Change the password
        await changePassword(userId, newPassword);
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.log('Error in POST /changePassword', err);
        return res.status(400).json({ message: 'Failed to change password' });
    }
});

export default router;