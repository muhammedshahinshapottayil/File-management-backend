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
    const { useCases: { signUpUsecase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.body.password !== req.body.confirmPassword)
                throw new Error("Password and Confirm password does not match");
            const signup = yield signUpUsecase(dependencies);
            const userCreate = yield signup(req.body);
            if (userCreate instanceof Error)
                throw new Error(userCreate.toString());
            if (userCreate) {
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
