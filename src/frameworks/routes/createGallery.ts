import express, { Router } from "express";
import { body } from "express-validator";
import controllers from "../../controllers";
import isAuth from "../../utils/isAuth";

export default (dependencies: any) => {
  const { createGalleryController } = controllers(dependencies);
  const {
    Common: { requestValidationerr },
    Utils: { uploadFiles, uploadToCloudinaryMultiple },
  } = dependencies;
  const router: Router = express.Router();
  router.post(
    "/create-gallery",
    [
      body("file")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure File is valid"),
    ],
    isAuth,
    // requestValidationerr,
    uploadFiles,
    uploadToCloudinaryMultiple,
    createGalleryController
  );
  return router;
};
