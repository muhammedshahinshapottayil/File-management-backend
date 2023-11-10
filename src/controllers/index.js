"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signinController_1 = __importDefault(require("./signinController"));
const signupController_1 = __importDefault(require("./signupController"));
const createThumbnailController_1 = __importDefault(require("./createThumbnailController"));
const createGalleryController_1 = __importDefault(require("./createGalleryController"));
const getAlbumsController_1 = __importDefault(require("./getAlbumsController"));
const deleteAlbumController_1 = __importDefault(require("./deleteAlbumController"));
const getGalleryController_1 = __importDefault(require("./getGalleryController"));
const deleteGalleryController_1 = __importDefault(require("./deleteGalleryController"));
exports.default = (dependencies) => {
    return {
        signinController: (0, signinController_1.default)(dependencies),
        signupController: (0, signupController_1.default)(dependencies),
        createThumbnailController: (0, createThumbnailController_1.default)(dependencies),
        createGalleryController: (0, createGalleryController_1.default)(dependencies),
        getAlbumsController: (0, getAlbumsController_1.default)(dependencies),
        deleteAlbumController: (0, deleteAlbumController_1.default)(dependencies),
        getGalleryController: (0, getGalleryController_1.default)(dependencies),
        deleteGalleryController: (0, deleteGalleryController_1.default)(dependencies),
    };
};
