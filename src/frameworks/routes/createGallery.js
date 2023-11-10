"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controllers_1 = __importDefault(require("../../controllers"));
const isAuth_1 = __importDefault(require("../../utils/isAuth"));
exports.default = (dependencies) => {
    const { createGalleryController } = (0, controllers_1.default)(dependencies);
    const { Common: { requestValidationerr }, Utils: { uploadFiles, uploadToCloudinaryMultiple }, } = dependencies;
    const router = express_1.default.Router();
    router.post("/create-gallery", [
        (0, express_validator_1.body)("file")
            .notEmpty()
            .trim()
            .withMessage("Please Make Sure File is valid"),
    ], isAuth_1.default, 
    // requestValidationerr,
    uploadFiles, uploadToCloudinaryMultiple, createGalleryController);
    return router;
};
