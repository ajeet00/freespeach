import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import Comment from '../../models/comment';
import Post from "../../models/posts";


router.post('/api/comment/new/:postId', async(req : Request, res : Response, next : NextFunction) => {
    const { userName, content } = req.body;
    const { postId } = req.params;

    if(!content) {
        const error = new Error('title and content are required') as CustomError;
        error.status = 404;
        return next(error);
    }

    const newComment = new Comment({
        userName : userName ? userName : 'anonymous', 
        content
    }); 

    await newComment.save();

    const updatePost = await Post.findOneAndUpdate(
        {_id: postId },
        { $push : {comments: newComment._id  } },
        { new : true }
    )

    res.status(201).send(updatePost);
});

export { router as newCommentRouter }