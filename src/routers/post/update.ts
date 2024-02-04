import { Router, Request, Response, NextFunction } from "express";
import Post from '../../models/posts';

const router = Router();

router.post('/api/post/upate/:id',  async (req : Request, res : Response, next : NextFunction) => { 
    const { id }  = req.params; 
    const { content, title } = req.body;

    if(!id) {
        const error = new Error('post id is required') as CustomError;
        error.status = 400;
        next(error);
    }

    let updatePost = null;
    try {
         updatePost = await Post.findOneAndUpdate({_id : id }, { $set: { content, title }}, { new : true} );
    } catch(erro) {
        const error = new Error('Post cannot be updated') as CustomError;
        error.status = 400;
        next(error);
    }
    res.status(200).send(updatePost);
});


export { router as updatePostRouter }