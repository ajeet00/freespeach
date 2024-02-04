"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.signinRouter = router;
const user_1 = require("../../models/user");
const common_1 = require("../../../common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_1.User.findOne({ email });
    if (!user)
        return new Error('Email not found');
    const isEqual = await common_1.authenticationService.pwdCompare(user.password, password);
    if (!isEqual) {
        return next(new Error('Email not found'));
    }
    // res.status(201).send(newUser);
    const Token = jsonwebtoken_1.default.sign({ email, userId: user._id }, process.env.JWT_KEY);
    req.session = { jwt: Token };
    res.status(200).send(user);
});
