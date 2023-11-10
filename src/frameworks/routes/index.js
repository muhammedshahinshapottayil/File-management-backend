"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signin_1 = __importDefault(require("./signin"));
const signup_1 = __importDefault(require("./signup"));
const createThumbnail_1 = __importDefault(require("./createThumbnail"));
const createGallery_1 = __importDefault(require("./createGallery"));
const getFiles_1 = __importDefault(require("./getFiles"));
const deleteFiles_1 = __importDefault(require("./deleteFiles"));
exports.default = (dependencies) => {
    const routes = express_1.default.Router();
    const signin = (0, signin_1.default)(dependencies);
    const signup = (0, signup_1.default)(dependencies);
    const createThumbnail = (0, createThumbnail_1.default)(dependencies);
    const createGallery = (0, createGallery_1.default)(dependencies);
    const getFiles = (0, getFiles_1.default)(dependencies);
    const deleteAlbums = (0, deleteFiles_1.default)(dependencies);
    routes.use("/user", signin);
    routes.use("/user", signup);
    routes.use("/user", createThumbnail);
    routes.use("/user", createGallery);
    routes.use("/user", getFiles);
    routes.use("/user", deleteAlbums);
    return routes;
};
