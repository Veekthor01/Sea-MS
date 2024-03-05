import express from 'express';
import passport from '../Passport-Config/passportOauth';
import dotenv from 'dotenv';
dotenv.config();

const Frontend_URL = process.env.FRONTEND_URL;

const router = express.Router();

// Google authentication route
router.get('/', 
passport.authenticate('google', { scope: ['profile'] }
));

// Google authentication callback route
router.get('/callback',
passport.authenticate('google', { failureRedirect: `${Frontend_URL}/signup`, session: false}),
(req, res) => {
    res.redirect(`${Frontend_URL}/template`);
});

export default router;