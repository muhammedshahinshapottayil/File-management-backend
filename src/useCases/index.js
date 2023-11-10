"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signupUsecase_1 = __importDefault(require("./signupUsecase"));
const signinUsecase_1 = __importDefault(require("./signinUsecase"));
const createThumbnailUseCase_1 = __importDefault(require("./createThumbnailUseCase"));
const createGalleryUsecase_1 = __importDefault(require("./createGalleryUsecase"));
const getAbumsUsecase_1 = __importDefault(require("./getAbumsUsecase"));
const deleteThumbnailUseCase_1 = __importDefault(require("./deleteThumbnailUseCase"));
const getGalleryUsecase_1 = __importDefault(require("./getGalleryUsecase"));
const deleteGalleryUsecase_1 = __importDefault(require("./deleteGalleryUsecase"));
exports.default = {
    signUpUsecase: signupUsecase_1.default,
    signinUsecase: signinUsecase_1.default,
    createThumbnailUseCase: createThumbnailUseCase_1.default,
    createGalleryUsecase: createGalleryUsecase_1.default,
    getAbumsUsecase: getAbumsUsecase_1.default,
    deleteThumbnailUseCase: deleteThumbnailUseCase_1.default,
    getGalleryUsecase: getGalleryUsecase_1.default,
    deleteGalleryUsecase: deleteGalleryUsecase_1.default
};
