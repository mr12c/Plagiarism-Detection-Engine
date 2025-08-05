import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
 
const app = express();



app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}))

app.use(express.json());

// If using URL-encoded data (like from HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// write a middlwer to see the every requeest
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    console.log('Request Body:', req.body); 
    next();
});

import userRoute from './routes/user.routes.js';
import submissionRoute from './routes/submission.routes.js';
import contestRoute from './routes/contest.routes.js';
 

app.use('/api/v1/users', userRoute);
app.use('/api/v1/submissions', submissionRoute);
app.use('/api/v1/contests', contestRoute);


 
app.use(errorHandler);

export { app };