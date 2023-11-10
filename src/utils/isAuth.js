"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getuserData_1 = __importDefault(require("./getuserData"));
const env_1 = __importDefault(require("../env"));
exports.default = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            throw new Error("UNAUTHERISED_ACCESS NO TOKEN");
        jsonwebtoken_1.default.verify(token, env_1.default.SIGNATURE, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                throw new Error("UNAUTHERISED_ACCESS");
            }
            else {
                const isValid = yield (0, getuserData_1.default)(decoded.data.id);
                if (isValid) {
                    req.user = isValid;
                    next();
                }
                else
                    throw new Error("UNAUTHERISED_ACCESS");
            }
        }));
    }
    catch (err) {
        next(err);
    }
};
