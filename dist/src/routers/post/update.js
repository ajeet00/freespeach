"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostRouter = void 0;
const express_1 = require("express");
const posts_1 = __importDefault(require("../../models/posts"));
const router = (0, express_1.Router)();
exports.updatePostRouter = router;
router.post('/api/post/upate/:id', async (req, res, next) => {
    const { id } = req.params;
    const { content, title } = req.body;
    if (!id) {
        const error = new Error('post id is required');
        error.status = 400;
        next(error);
    }
    let updatePost = null;
    try {
        updatePost = await posts_1.default.findOneAndUpdate({ _id: id }, { $set: { content, title } }, { new: true });
    }
    catch (erro) {
        const error = new Error('Post cannot be updated');
        error.status = 400;
        next(error);
    }
    res.status(200).send(updatePost);
});
