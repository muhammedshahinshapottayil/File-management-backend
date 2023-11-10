import { NextFunction, Request, Response } from "express";
import { thumbnailData } from "../interfaces";
export default (dependencies: any) => {
  const {
    useCases: { deleteThumbnailUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteThumbnail = await deleteThumbnailUseCase(dependencies);
      const createdResponse: thumbnailData | Error = await deleteThumbnail(
        req.user._id,
        req.params.id
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
