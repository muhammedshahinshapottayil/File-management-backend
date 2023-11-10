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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { useCases: { createThumbnailUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createThumbnail = yield createThumbnailUseCase(dependencies);
            const createdResponse = yield createThumbnail(req.user._id, req.body, req.filenames, req.fileOriginalname);
            if (createdResponse instanceof Error)
                throw new Error(createdResponse.toString());
            if (createdResponse) {
                return res.status(200).json({
                    message: "Successfully Completed",
                    data: [],
                });
            }
            else
                throw new Error("Try Again");
        }
        catch (error) {
            next(error);
        }
    });
};
