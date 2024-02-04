import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import Post from '../../models/posts';

router.post('/api/post/new', async(req : Request, res : Response, next : NextFunction) => {
    const { title, content } = req.body;

    if(!title || !content) {
        const error = new Error('title and content are required') as CustomError;
        error.status = 404;
        return next(error);
    }

    const newPost = new Post({
        title, 
        content
    }); 
    const response =  await newPost.save();

    console.log("Response value", response);

    res.status(201).send(response);
});

export { router as newPostRouter }