import express, { Router } from "express";
import { body } from "express-validator";
import Controllers from "../../controllers";

export default (dependencies: any) => {
  const { signinController } = Controllers(dependencies);
  const {
    Common: { requestValidationerr },
  } = dependencies;
  const router: Router = express.Router();
  router.post(
    "/signin",
    body("username")
      .notEmpty()
      .trim()
      .withMessage("Please Make Sure Email is valid"),
    body("password")
      .notEmpty()
      .trim()
      .withMessage("Please Make Sure Password is valid"),
    requestValidationerr,
    signinController
  );
  return router;
};
