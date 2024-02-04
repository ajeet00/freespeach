import { Router, Request, Response, NextFunction } from "express";
import Post from '../../models/posts';
const router = Router();

router.get('/api/post/show/:id',  async (req : Request, res : Response, next : NextFunction) => { 
    const { id }  = req.params; 

    if(!id) {
        const error = new Error('post id is required') as CustomError;
        error.status = 400;
        next(error);
    }

    try {

        if(!id) {
            const allPost =  await Post.find();
            return res.status(200).send(allPost);
        }

        const post = await Post.findOne({ _id: id }).populate('comments');
        res.status(200).send(post);

    } catch(erro) {
        const error = new Error('Post cannot be updated') as CustomError;
        error.status = 400;
        next(error);
    }
});


export { router as showPostRouter }