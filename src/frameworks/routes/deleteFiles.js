"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../../controllers"));
const isAuth_1 = __importDefault(require("../../utils/isAuth"));
exports.default = (dependencies) => {
    const { deleteAlbumController, deleteGalleryController } = (0, controllers_1.default)(dependencies);
    const router = express_1.default.Router();
    router.delete("/delete-albums/:id", isAuth_1.default, deleteAlbumController);
    router.delete("/delete-gallery/:albumId/:id", isAuth_1.default, deleteGalleryController);
    return router;
};
