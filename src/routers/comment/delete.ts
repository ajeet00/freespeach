import { Router, Request, Response, NextFunction } from "express";
import Post from '../../models/posts';
import Comment from "../../models/comment";
const router = Router();
import mongoose from 'mongoose';

router.delete('/api/comment/:commentId/delete/:postId',  async (req : Request, res : Response, next : NextFunction) => { 
    const { postId, commentId }  = req.params; 

    if(!postId || !commentId ) {
        const error = new Error('post id and comment Id is required') as CustomError;
        error.status = 400;
        next(error);
    }

    try {
          await Comment.deleteOne({_id : new mongoose.Types.ObjectId(commentId) });
    } catch(erro) {
        const error = new Error('Post cannot be updated') as CustomError;
        error.status = 400;
        next(error);
    }

    await Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: new mongoose.Types.ObjectId(commentId) } });
    
    res.status(200).json({ success: true });   

});

export { router as deleteCommentRouter }