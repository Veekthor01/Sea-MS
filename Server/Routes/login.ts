import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { getUserByUsername, storeRefreshToken } from '../DB/user';
dotenv.config();

const router = express.Router();

// POST /login
router.post('/', async (req, res) => {
    const { username, password }: { username: string, password: string } = req.body;
    try {
    // Check if the email is correct or exists in the database
    const user = await getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: 'Incorrect username' });
      }
      // if username is correct or exists, Check if the password is correct
      if (user) {
        if (!user.password) {
          return res.status(400).json({ message: 'Please enter your password' });
      }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }}
      // Generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH as string, { expiresIn: '30d' });
      // Store the refresh token in the database
      if (user._id) {
          await storeRefreshToken(refreshToken, user._id.toString());
      } else {
          // Handle the case where user._id is undefined
          console.error('User ID is undefined');
      }
      return res.status(200).json({ message: 'Login Successful', token, refreshToken });
    } catch (err) {
        console.log('Error in POST /login', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;