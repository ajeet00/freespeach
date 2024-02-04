import { Router, Request, Response, NextFunction } from "express";
import Post from '../../models/posts';
const router = Router();

router.delete('/api/post/delete/:id',  async (req : Request, res : Response, next : NextFunction) => { 
    const { id }  = req.params; 

    if(!id) {
        const error = new Error('post id is required') as CustomError;
        error.status = 400;
        next(error);
    }

    try {
          await Post.deleteMany({_id : id });
    } catch(erro) {
        const error = new Error('Post cannot be updated') as CustomError;
        error.status = 400;
        next(error);
    }
    res.status(200).json({ success: true });   
});


export { router as deletePostRouter }