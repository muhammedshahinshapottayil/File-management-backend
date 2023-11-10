import { NextFunction, Request, Response } from "express";
export default (dependencies: any) => {
  const {
    useCases: { getAbumsUsecase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signin = await getAbumsUsecase(dependencies);
      const token: any | Error = await signin(req.user._id);
      if (token instanceof Error) throw new Error(token.toString());
      return res.status(200).json({
        message: "Successfully Completed",
        data: token.length > 0 ? token[0].albums : [],
      });
    } catch (error) {
      next(error);
    }
  };
};
