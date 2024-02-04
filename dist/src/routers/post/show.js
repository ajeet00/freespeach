"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPostRouter = void 0;
const express_1 = require("express");
const posts_1 = __importDefault(require("../../models/posts"));
const router = (0, express_1.Router)();
exports.showPostRouter = router;
router.get('/api/post/show/:id', async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        const error = new Error('post id is required');
        error.status = 400;
        next(error);
    }
    try {
        if (!id) {
            const allPost = await posts_1.default.find();
            return res.status(200).send(allPost);
        }
        const post = await posts_1.default.findOne({ _id: id }).populate('comments');
        res.status(200).send(post);
    }
    catch (erro) {
        const error = new Error('Post cannot be updated');
        error.status = 400;
        next(error);
    }
});
