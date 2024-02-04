"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.signupRouter = router;
const user_1 = require("../../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_1.User.findOne({ email });
    if (user)
        return new Error('User with the same email already exist');
    const newUser = new user_1.User({
        email,
        password
    });
    await newUser.save();
    req.session = {
        jwt: jsonwebtoken_1.default.sign({ email, userId: newUser._id }, process.env.JWT_KEY)
    };
    res.status(201).send(newUser);
});
