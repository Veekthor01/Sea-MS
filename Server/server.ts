import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './Passport-Config/passport';
import connectDB from './DB/db';
import signupRouter from './Routes/signup';
import loginRouter from './Routes/login';
import refreshRouter from './Routes/refreshToken';
import logoutRouter from './Routes/logout';
import googleRouter from './Routes/googleOauth';
import changePasswordRouter from './Routes/changePassword';
import blogRouter from './ContentRoute/blogRoute'
import resumeRouter from './ContentRoute/resumeRoute'
import portfolioRouter from './ContentRoute/portfolioRoute'
import blogTemplateRouter from './TemplateRoute/blogTemplateRoute'
import portfolioTemplateRouter from './TemplateRoute/portfolioTemplateRoute'
import resumeTemplateRouter from './TemplateRoute/resumeTemplateRoute'
import imageRouter from './Images/imageRoute'
import protectedRouter from './Passport-Config/protected';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser(SECRET_KEY));
app.use(passport.initialize());

// Routes
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/auth/google', googleRouter);
app.use('/userBlog', blogRouter)
app.use('/userResume', resumeRouter)
app.use('/userPortfolio', portfolioRouter)
app.use('/blogTemplate', blogTemplateRouter)
app.use('/portfolioTemplate', portfolioTemplateRouter)
app.use('/resumeTemplate', resumeTemplateRouter)
app.use('/upload', imageRouter)
app.use('/protected', protectedRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});