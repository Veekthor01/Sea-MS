import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
import { createUser, getUserByGoogleId } from '../DB/user';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;

// Add check to ensure that the environment variables are set
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !BACKEND_URL) {
    throw new Error('Environment variables not set');
}

// Google Strategy for authenticating a user
passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret:GOOGLE_CLIENT_SECRET,
            callbackURL: `${BACKEND_URL}/auth/google/callback`,
        }, 
        async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
        // Find the user associated with the id provided in the token
        const googleId = profile.id;
        const user = await getUserByGoogleId(googleId);
        if (!user) {
            // Create a new user if not found
            const newUser = { googleId, username: profile.displayName};
            const createdUser = await createUser(newUser);
            return done(null, createdUser);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));
/*
// Serialize the user id to push into the session
passport.serializeUser((user, done: any) => {
    done(null, user);
});

// Deserialize the user object based on a pre-serialized token
// which is the user id
passport.deserializeUser((user, done: any) => {
    done(null, user);
}); */

export default passport;