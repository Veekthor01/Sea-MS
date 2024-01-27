import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { getUserByUsername } from '../DB/user';
import { ObjectId } from 'mongodb';
dotenv.config();

const router = express.Router();

interface User {
    _id: ObjectId
    username: string;
    password: string;
  }

// POST /login
router.post('/', async (req, res, next) => {
    const { username, password }: { username: string, password: string } = req.body;
    try {
    // Check if the email is correct or exists in the database
    const user = await getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: 'Incorrect username' });
      }
      // if username is correct or exists, Check if the password is correct
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }}
      // pass the request to the authentication middleware
      passport.authenticate('jwt', { session: false }, 
      (err: Error | null, user: User | false, info: { message: string }) => {
            if (err || !user) {
                const error = err || new Error(info.message);
                console.log('Error in POST /login', error);
                return res.status(500).json({ message: 'Login Failed' });
            }
           req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                // Generate a signed json web token with the contents of user object and return it in the response
                const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login Successful', user, token });
            });
        })(req, res, next);
    } catch (err) {
        console.log('Error in POST /login', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;