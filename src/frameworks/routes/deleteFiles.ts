import express, { Router } from "express";
import controllers from "../../controllers";
import isAuth from "../../utils/isAuth";

export default (dependencies: any) => {
  const { deleteAlbumController,deleteGalleryController } = controllers(dependencies);
  const router: Router = express.Router();
  router.delete("/delete-albums/:id", isAuth, deleteAlbumController);
  router.delete("/delete-gallery/:albumId/:id", isAuth, deleteGalleryController);

  return router;
};
