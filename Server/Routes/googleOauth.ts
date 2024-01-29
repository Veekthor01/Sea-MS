import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google authentication route
router.get('/', 
passport.authenticate('google', { scope: ['profile'] }
));

// Google authentication callback route
router.get('/callback',
passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
    res.redirect('/');
});

export default router;
