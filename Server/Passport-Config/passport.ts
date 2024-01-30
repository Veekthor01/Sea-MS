import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { getUserById } from '../DB/user';
import dotenv from 'dotenv';
dotenv.config();

// Options for the JWT Strategy
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// JWT Strategy for authenticating a user
passport.use(new JwtStrategy(options, async (jwt_payload: any, done: VerifiedCallback) => {
  try {
    // Find the user associated with the id provided in the token
    const user = await getUserById(jwt_payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

export default passport;