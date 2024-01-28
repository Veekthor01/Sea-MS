import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
import './Passport-Config/passport';
import connectDB from './DB/db';
import signupRouter from './Routes/signup';
import loginRouter from './Routes/login';
import refreshRouter from './Routes/refreshToken';
import logoutRouter from './Routes/logout';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
//app.use(helmet()); in production
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'"],
        scriptSrc: ["'self'"],
    }
}));
app.use(passport.initialize());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});