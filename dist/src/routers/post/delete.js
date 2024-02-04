"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostRouter = void 0;
const express_1 = require("express");
const posts_1 = __importDefault(require("../../models/posts"));
const router = (0, express_1.Router)();
exports.deletePostRouter = router;
router.delete('/api/post/delete/:id', async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        const error = new Error('post id is required');
        error.status = 400;
        next(error);
    }
    try {
        await posts_1.default.deleteMany({ _id: id });
    }
    catch (erro) {
        const error = new Error('Post cannot be updated');
        error.status = 400;
        next(error);
    }
    res.status(200).json({ success: true });
});
