import express, { Router } from "express";
import { body } from "express-validator";
import controllers from "../../controllers";
import isAuth from "../../utils/isAuth";

export default (dependencies: any) => {
  const { createThumbnailController } = controllers(dependencies);
  const {
    Common: { requestValidationerr },
    Utils: { uploadFiles, uploadToCloudinaryMultiple },
  } = dependencies;
  const router: Router = express.Router();
  router.post(
    "/create-thumbnail",
    [
      body("file")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure File is valid"),
      body("name")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure Name is valid"),
      body("albumId")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure Name is valid"),
    ],
    isAuth,
    // requestValidationerr,
    uploadFiles,
    uploadToCloudinaryMultiple,
    createThumbnailController
  );
  return router;
};
