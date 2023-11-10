import getuserData from "./getuserData";
import { generateToken } from "./generateToken";
import {
  uploadFile,
  uploadFiles,
  uploadToCloudinaryMultiple,
  uploadToCloudinarySingle,
} from "./fileUpload";
import isAuth from "./isAuth";
import generateHashedPassword from "./generateHashedPassword";

export default {
  generateHashedPassword,
  getuserData,
  generateToken,
  uploadFile,
  uploadFiles,
  uploadToCloudinaryMultiple,
  uploadToCloudinarySingle,
  isAuth,
};
