import { NextFunction, Request, Response } from "express";
import { userData } from "../interfaces";
export default (dependencies: any) => {
  const {
    useCases: { signUpUsecase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.password !== req.body.confirmPassword)
        throw new Error("Password and Confirm password does not match");
      const signup = await signUpUsecase(dependencies);
      const userCreate: userData | Error = await signup(req.body);
      if (userCreate instanceof Error) throw new Error(userCreate.toString());
      if (userCreate) {
        return res.status(200).json({
          message: "Successfully Completed",
          data: [],
        });
      } else throw new Error("Try Again");
    } catch (error) {
      next(error);
    }
  };
};
