import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import env from "../env";
declare global {
  namespace Express {
    interface Request {
      filenames?: any;
      fileOriginalname?: any;
    }
  }
}
const storage = multer.memoryStorage();

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.API_SECRET,
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any): void => {
  const file_extension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );
  const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
  const array_of_allowed_file_types = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
  ];

  if (
    array_of_allowed_files.includes(file_extension) &&
    array_of_allowed_file_types.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Type validation failed"));
  }
};

const bufferToStream = (buffer: Buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

// -------------------------------------------------upload multiple------------------------------------------------------------------------------------

const uploadFiles = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4000000 },
}).array("file", 10);

const uploadToCloudinaryMultiple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      req.fileOriginalname = [];
      const uploadPromises = Array.isArray(req.files)
        ? req.files.map((file: Express.Multer.File) => {
            req.fileOriginalname.push(file.originalname);
            return new Promise(async (resolve, reject) => {
              try {
                const data = await sharp(file.buffer)
                  .webp({ quality: 20 })
                  .toBuffer();
                const stream = cloudinary.uploader.upload_stream(
                  { folder: "DEV" },
                  (error, result: any) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve({ URL: result.secure_url });
                    }
                  }
                );
                bufferToStream(data).pipe(stream);
              } catch (error) {
                reject(error);
              }
            });
          })
        : [];

      const results = await Promise.all(uploadPromises);
      req.filenames = results.map((result: any) => result.URL);
      next();
    } else {
      throw new Error("No files were uploaded.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// -------------------------------------------------END------------------------------------------------------------------------------------

// -------------------------------------------------upload single------------------------------------------------------------------------------------

const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4000000 },
}).single("file");

const uploadToCloudinarySingle = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    req.fileOriginalname = req.file.originalname;

    const stream = cloudinary.uploader.upload_stream(
      { folder: "DEV" },
      (error, result: any) => {
        if (error) console.log(error);
        else req.filenames = result.secure_url;
        next();
      }
    );
    bufferToStream(data).pipe(stream);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// -------------------------------------------------END------------------------------------------------------------------------------------

export {
  uploadToCloudinarySingle,
  uploadFile,
  uploadFiles,
  uploadToCloudinaryMultiple,
};
