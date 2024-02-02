import express from 'express';
import jwt from 'jsonwebtoken';
import { validateRefreshToken } from '../DB/user';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { refreshToken }: { refreshToken: string } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token not found, authorization denied' });
    }
  
    const userId = await validateRefreshToken(refreshToken);
    if (!userId) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
  
    const accessToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ accessToken });
  });

export default router;

/* when making frontend, replace return res.status(401).json({ message: 'Refresh Token not found, authorization denied' });
with just return res.sendStatus(401)
and  return res.sendStatus(403)
*/