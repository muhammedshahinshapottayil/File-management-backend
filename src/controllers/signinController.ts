import { NextFunction, Request, Response } from "express";
export default (dependencies: any) => {
  const {
    useCases: { signinUsecase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signin = await signinUsecase(dependencies);
      const token: any | Error = await signin(req.body);
      if (token instanceof Error) throw new Error(token.toString());
      return res.status(200).json({
        message: "SET_LOGIN",
        data: [token],
      });
    } catch (error) {
      next(error);
    }
  };
};
