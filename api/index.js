import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

//Mongodb connection
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to Mongodb');
})

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log(' Server is running on port 3000');
})

//Test Route API
app.use('/api/user',userRouter);
//SignUp Route API
app.use('/api/auth',authRouter);
//
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
})
//Middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
})