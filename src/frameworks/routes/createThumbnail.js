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
    const { createThumbnailController } = (0, controllers_1.default)(dependencies);
    const { Common: { requestValidationerr }, Utils: { uploadToCloudinarySingle, uploadFile }, } = dependencies;
    const router = express_1.default.Router();
    router.post("/create-thumbnail", [
        (0, express_validator_1.body)("file")
            .notEmpty()
            .trim()
            .withMessage("Please Make Sure File is valid"),
        (0, express_validator_1.body)("name")
            .notEmpty()
            .trim()
            .withMessage("Please Make Sure Name is valid"),
    ], isAuth_1.default, 
    // requestValidationerr,
    uploadFile, uploadToCloudinarySingle, createThumbnailController);
    return router;
};
