"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200
}));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = require("./routers");
app.use((0, body_parser_1.urlencoded)({
    extended: false
}));
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
}));
app.use(routers_1.newPostRouter);
app.use(routers_1.deleteCommentRouter);
app.use(routers_1.deletePostRouter);
app.use(routers_1.updatePostRouter);
app.use(routers_1.showPostRouter);
app.use(routers_1.newCommentRouter);
app.all('*', (req, res, next) => {
    const error = new Error(" Request API Not found");
    error.status = 404;
    next(error);
});
/*
app.use((error :CustomError , req : Request, res : Response, next : NextFunction) => {
     if(error.status) {
         return res.status(error.status).json({ message : error.message });
     }
     return res.status(500).json({message : 'Internal Server Error'});
});
*/
const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('Mongo url is required');
    }
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY value is required');
    }
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (err) {
        console.log(err);
        throw new Error("Mongodb Error");
    }
    app.listen(8081, () => console.log("Server is up and runnning on 8081"));
};
start();
