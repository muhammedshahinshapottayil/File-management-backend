"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { userData } from "../interfaces";
const env_1 = __importDefault(require("../env"));
const generateAccessToken = (data) => {
    try {
        return jsonwebtoken_1.default.sign({ data }, env_1.default.SIGNATURE, {
            expiresIn: "14d",
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
const generateToken = (data) => {
    return generateAccessToken(data);
};
exports.generateToken = generateToken;
