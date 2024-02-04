"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPostRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.newPostRouter = router;
const posts_1 = __importDefault(require("../../models/posts"));
router.post('/api/post/new', async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        const error = new Error('title and content are required');
        error.status = 404;
        return next(error);
    }
    const newPost = new posts_1.default({
        title,
        content
    });
    const response = await newPost.save();
    console.log("Response value", response);
    res.status(201).send(response);
});
