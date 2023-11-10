import { NextFunction, Request, Response } from "express";
import { thumbnailData } from "../interfaces";
declare global {
  namespace Express {
    interface Request {
      filenames?: any;
      fileOriginalname?: any;
      user?: any;
    }
  }
}
export default (dependencies: any) => {
  const {
    useCases: { createGalleryUsecase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createThumbnail = await createGalleryUsecase(dependencies);
      const createdResponse: thumbnailData | Error = await createThumbnail(
        req.user._id,
        req.body.name,
        req.filenames,
        req.fileOriginalname
      );
      if (createdResponse instanceof Error)
        throw new Error(createdResponse.toString());
      if (createdResponse) {
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
