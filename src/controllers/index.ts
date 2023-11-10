import signinController from "./signinController";
import signupController from "./signupController";
import createThumbnailController from "./createThumbnailController";
import createGalleryController from "./createGalleryController";
import getAlbumsController from "./getAlbumsController";
import deleteAlbumController from "./deleteAlbumController";
import getGalleryController from "./getGalleryController";
import deleteGalleryController from "./deleteGalleryController";

export default (dependencies: any) => {
  return {
    signinController: signinController(dependencies),
    signupController: signupController(dependencies),
    createThumbnailController: createThumbnailController(dependencies),
    createGalleryController: createGalleryController(dependencies),
    getAlbumsController: getAlbumsController(dependencies),
    deleteAlbumController: deleteAlbumController(dependencies),
    getGalleryController: getGalleryController(dependencies),
    deleteGalleryController: deleteGalleryController(dependencies),
  };
};
