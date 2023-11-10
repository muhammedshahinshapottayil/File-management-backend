import express, { Router } from "express";
import { body } from "express-validator";
import controllers from "../../controllers";
export default (dependencies: any) => {
  const { signupController } = controllers(dependencies);
  const {
    Common: { requestValidationerr },
  } = dependencies;
  const router: Router = express.Router();
  router.post(
    "/register",
    [
      body("username")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure Email is valid"),
      body("password")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure Password is valid"),
        body("confirmPassword")
        .notEmpty()
        .trim()
        .withMessage("Please Make Sure Confirm Password is valid"),
    ],
    requestValidationerr,
    signupController
  );
  return router;
};
