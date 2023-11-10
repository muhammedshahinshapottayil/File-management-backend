"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controllers_1 = __importDefault(require("../../controllers"));
exports.default = (dependencies) => {
    const { signinController } = (0, controllers_1.default)(dependencies);
    const { Common: { requestValidationerr }, } = dependencies;
    const router = express_1.default.Router();
    router.post("/signin", (0, express_validator_1.body)("username")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure Email is valid"), (0, express_validator_1.body)("password")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure Password is valid"), requestValidationerr, signinController);
    return router;
};
