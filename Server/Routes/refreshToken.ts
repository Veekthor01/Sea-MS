import express from 'express';
import jwt from 'jsonwebtoken';
import { validateRefreshToken } from '../DB/user';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Route to refresh the JWT
router.post('/', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token not found, authorization denied' });
    }
  
    const userId = await validateRefreshToken(refreshToken);
    if (!userId) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
  
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600000 });
    res.json({ token });
  });

export default router;