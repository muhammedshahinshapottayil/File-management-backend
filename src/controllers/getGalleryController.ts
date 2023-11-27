import { NextFunction, Request, Response } from "express";
declare global {
  namespace Express {
    interface Request {
      user?: any;
      filenames?: any;
      fileOriginalname?: any;
    }
  }
}
export default (dependencies: any) => {
  const {
    useCases: { getGalleryUsecase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signin = await getGalleryUsecase(dependencies);
      const token: any | Error = await signin(req.user._id, req.params.id);
      if (token instanceof Error) throw new Error(token.toString());
      return res.status(200).json({
        message: "Successfully Completed",
        data: {
          albumName: token.length > 0 ? token[0].albumName : "",
          data: token.length > 0 ? token[0].gallery : [],
        },
      });
    } catch (error) {
      next(error);
    }
  };
};
