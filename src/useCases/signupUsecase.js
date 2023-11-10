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
const signUpUsecase = (dependencies) => __awaiter(void 0, void 0, void 0, function* () {
    const { User: { getUserbyusername, createUser }, Utils: { generateHashedPassword }, } = dependencies;
    const signup = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userExists = yield getUserbyusername(username);
            if (userExists)
                throw new Error("User Already Exists");
            password = yield generateHashedPassword(password);
            const userCreate = yield createUser({
                username,
                password,
            });
            return userCreate;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    });
    return signup;
});
exports.default = signUpUsecase;
