import express from 'express';
import { deleteRefreshToken } from '../DB/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticateJWT from '../Passport-Config/auth';

dotenv.config();

const router = express.Router();

// route to logout a user and clear the JWT and refresh token from the client's cookies
router.post('/', authenticateJWT, async (req: any, res: express.Response) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No access token found' });
    }
    let userId;
    try {
        const decoded = jwt.decode(token);
        if (typeof decoded === 'object' && decoded !== null) {
            userId = decoded._id;
        }
    } catch (err) {
        console.error('Error decoding JWT:', err);
        return res.status(403).json({ message: 'Invalid token' });
    }
    if (!userId) {
        return res.status(403).json({ message: 'Invalid user ID' });
    }
    const result = await deleteRefreshToken(userId);
    if (!result) {
        return res.status(403).json({ message: 'Failed to delete refresh token' });
    }
    // Clear the JWT and refresh token from the client's cookies
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logout successful' });
});


export default router;