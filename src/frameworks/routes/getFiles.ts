import express, { Router } from "express";
import controllers from "../../controllers";
import isAuth from "../../utils/isAuth";

export default (dependencies: any) => {
  const { getAlbumsController ,getGalleryController} = controllers(dependencies);
  const router: Router = express.Router();
  router.get("/get-albums", isAuth, getAlbumsController);
  router.get("/get-gallery/:id", isAuth, getGalleryController);

  return router;
};
