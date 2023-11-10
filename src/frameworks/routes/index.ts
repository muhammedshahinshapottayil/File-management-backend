import express, { Router } from "express";
import signinRoutes from "./signin";
import signupRoutes from "./signup";
import createThumbnailRoutes from "./createThumbnail";
import createGalleryRoutes from "./createGallery";
import getFilesRoutes from "./getFiles";
import deleteFilesRoutes from "./deleteFiles";

export default (dependencies: any) => {
  const routes: Router = express.Router();
  const signin: Router = signinRoutes(dependencies);
  const signup: Router = signupRoutes(dependencies);
  const createThumbnail: Router = createThumbnailRoutes(dependencies);
  const createGallery: Router = createGalleryRoutes(dependencies);
  const getFiles: Router = getFilesRoutes(dependencies);
  const deleteAlbums: Router = deleteFilesRoutes(dependencies);

  routes.use("/user", signin);
  routes.use("/user", signup);
  routes.use("/user", createThumbnail);
  routes.use("/user", createGallery);
  routes.use("/user", getFiles);
  routes.use("/user", deleteAlbums);

  return routes;
};
