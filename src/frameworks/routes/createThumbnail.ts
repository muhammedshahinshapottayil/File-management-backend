import express, { Router } from "express";
import { body } from "express-validator";
import controllers from "../../controllers";
import isAuth from "../../utils/isAuth";

export default (dependencies: any) => {
  const { createThumbnailController } = controllers(dependencies);
  const {
    Common: { requestValidationerr },
    Utils: { uploadToCloudinarySingle, uploadFile },
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
    ],
    isAuth,
    // requestValidationerr,
    uploadFile,
    uploadToCloudinarySingle,
    createThumbnailController
  );
  return router;
};
