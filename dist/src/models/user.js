"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("../../common");
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
userSchema.pre('save', async function (done) {
    if (this.isModified('password') || this.isNew) {
        const hashedPwd = common_1.authenticationService.pwdToHash(this.get('password'));
        this.set('password', hashedPwd); // Fix the typo here
    }
    done();
});
exports.User = mongoose_1.default.model('User', userSchema);
