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
const signUpUseCase = (dependencies) => __awaiter(void 0, void 0, void 0, function* () {
    const { User: { createGallery }, } = dependencies;
    const signup = (id, albumId, filenames, fileOriginalname) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = filenames.map((item, i) => ({
                file: item,
                fileName: fileOriginalname[i],
            }));
            const userCreate = yield createGallery(id, albumId, data);
            return userCreate;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    });
    return signup;
});
exports.default = signUpUseCase;
