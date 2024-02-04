"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentRouter = void 0;
const express_1 = require("express");
const posts_1 = __importDefault(require("../../models/posts"));
const comment_1 = __importDefault(require("../../models/comment"));
const router = (0, express_1.Router)();
exports.deleteCommentRouter = router;
const mongoose_1 = __importDefault(require("mongoose"));
router.delete('/api/comment/:commentId/delete/:postId', async (req, res, next) => {
    const { postId, commentId } = req.params;
    if (!postId || !commentId) {
        const error = new Error('post id and comment Id is required');
        error.status = 400;
        next(error);
    }
    try {
        await comment_1.default.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(commentId) });
    }
    catch (erro) {
        const error = new Error('Post cannot be updated');
        error.status = 400;
        next(error);
    }
    await posts_1.default.findOneAndUpdate({ _id: postId }, { $pull: { comments: new mongoose_1.default.Types.ObjectId(commentId) } });
    res.status(200).json({ success: true });
});
