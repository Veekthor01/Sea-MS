import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { createUser, getUserByUsername, storeRefreshToken } from '../DB/user';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// POST /signup
router.post('/', async (req, res) => {
    const { username, password }: { username: string, password: string } = req.body;
    try {
        // Validate the password
        if (!validator.isLength(password, { min: 4 })) {
            return res.status(400).json({ message: 'Password must be at least 4 characters' });
        }
        // Check if the username is already taken
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the user
        const newUser = { username, password: hashedPassword };
        if (!newUser) {
            return res.status(400).json({ message: 'Signup Failed' });
        }
        // Save the user
        const user = await createUser(newUser);
        // Generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH as string, { expiresIn: '30d' });
        // Store the refresh token in the database
        if (user._id) {
            await storeRefreshToken(refreshToken, user._id.toString());
        } else {
            // Handle the case where user._id is undefined
            console.error('User ID is undefined');
        }
        // Set the JWT and refresh token in HTTP-only cookies 
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 6000 });//secure: true, sameSite: 'strict' in production
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 2592000000 });//secure: true, sameSite: 'strict' in production
        return res.status(200).json({ message: 'Signup Successful' });
    } catch (err) {
        console.error('Internal server error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;