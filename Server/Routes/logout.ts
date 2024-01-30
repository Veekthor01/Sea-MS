import express from 'express';
import { deleteRefreshToken } from '../DB/user';

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId }: { userId: string } = req.body;
    // or const { userId } = req.params; which passes the userId as a parameter in the url
    if (!userId) {
        return res.status(400).json({ message: 'User ID not provided' });
    }
  
    const user = await deleteRefreshToken(userId);
    if (!user) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
    res.json({ message: 'Logout successful' });
});

export default router;