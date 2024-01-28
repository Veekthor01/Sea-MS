import passport from 'passport';
//import bcrypt from 'bcrypt';
//import { Request } from 'express';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
//import { Strategy as LocalStrategy } from 'passport-local';
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

/* Local Strategy for signup a user
passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req: Request, username: string, password: string, done) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create the new user
      const newUser = { 
        username: username, 
        password: hashedPassword,
      }
      // Save the user
        const user = await createUser(newUser);
        return done(null, user);
    } catch (err) {
      return done(err);
    }
  })); */

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