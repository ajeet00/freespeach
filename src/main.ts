import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieSession from 'cookie-session';
import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../common';
const app = express();

app.use(cors({
    origin : "*",
    optionsSuccessStatus : 200
}));

import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import { newPostRouter, deletePostRouter, updatePostRouter, showPostRouter, newCommentRouter, deleteCommentRouter } from './routers';

app.use(urlencoded({
    extended : false
}));

app.use(json());

app.use(cookieSession({
    signed : false,
    secure: false,
}))

app.use(newPostRouter);
app.use(deleteCommentRouter);
app.use(deletePostRouter);
app.use(updatePostRouter);
app.use(showPostRouter);
app.use(newCommentRouter);

app.all('*', (req, res, next) => {
    const  error = new Error(" Request API Not found") as CustomError;
    error.status = 404;
    next(error);
});

declare global {
    interface CustomError extends Error {
        status?:number
    }
}

/*
app.use((error :CustomError , req : Request, res : Response, next : NextFunction) => {
     if(error.status) {
         return res.status(error.status).json({ message : error.message });
     }
     return res.status(500).json({message : 'Internal Server Error'});
});
*/

const start = async () => {
    if(!process.env.MONGO_URI) {
        throw new Error('Mongo url is required');
    }

    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY value is required');
    }

    try {
       await mongoose.connect(process.env.MONGO_URI);
    } catch(err) {
        console.log(err);
        throw new Error("Mongodb Error");
    }
    
    app.listen(8081, () => console.log("Server is up and runnning on 8081"))
}

start();