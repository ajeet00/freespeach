"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommentRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.newCommentRouter = router;
const comment_1 = __importDefault(require("../../models/comment"));
const posts_1 = __importDefault(require("../../models/posts"));
router.post('/api/comment/new/:postId', async (req, res, next) => {
    const { userName, content } = req.body;
    const { postId } = req.params;
    if (!content) {
        const error = new Error('title and content are required');
        error.status = 404;
        return next(error);
    }
    const newComment = new comment_1.default({
        userName: userName ? userName : 'anonymous',
        content
    });
    await newComment.save();
    const updatePost = await posts_1.default.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment._id } }, { new: true });
    res.status(201).send(updatePost);
});
