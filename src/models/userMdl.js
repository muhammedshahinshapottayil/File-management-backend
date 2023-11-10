"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("../env"));
const user = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    albums: {
        type: [
            {
                name: { type: String, required: true },
                file: { type: String, required: true },
                fileName: { type: String, required: true },
                date: { type: Date, default: new Date() },
                status: { type: Boolean, default: true },
                gallery: {
                    type: [
                        {
                            file: { type: String, required: true },
                            fileName: { type: String, required: true },
                            date: { type: Date, default: new Date() },
                            status: { type: Boolean, default: true },
                        },
                    ],
                },
            },
        ],
    },
    status: { type: Boolean, default: true },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        },
    },
});
user.statics.build = (attrs) => {
    return new User(attrs);
};
const User = mongoose_1.default.model(env_1.default.USER_COLLECTION, user);
exports.default = User;
