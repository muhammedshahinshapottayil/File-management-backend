"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinaryMultiple = exports.uploadFiles = exports.uploadFile = exports.uploadToCloudinarySingle = void 0;
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const env_1 = __importDefault(require("../env"));
const storage = multer_1.default.memoryStorage();
cloudinary_1.v2.config({
    cloud_name: env_1.default.CLOUD_NAME,
    api_key: env_1.default.API_KEY,
    api_secret: env_1.default.API_SECRET,
});
const fileFilter = (req, file, cb) => {
    const file_extension = file.originalname.slice(((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2);
    const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
    const array_of_allowed_file_types = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
    ];
    if (array_of_allowed_files.includes(file_extension) &&
        array_of_allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
        return cb(new Error("Type validation failed"));
    }
};
const bufferToStream = (buffer) => {
    const readable = new stream_1.Readable({
        read() {
            this.push(buffer);
            this.push(null);
        },
    });
    return readable;
};
// -------------------------------------------------upload multiple------------------------------------------------------------------------------------
const uploadFiles = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 4000000 },
}).array("file", 10);
exports.uploadFiles = uploadFiles;
const uploadToCloudinaryMultiple = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            req.fileOriginalname = [];
            const uploadPromises = Array.isArray(req.files)
                ? req.files.map((file) => {
                    req.fileOriginalname.push(file.originalname);
                    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            const data = yield (0, sharp_1.default)(file.buffer)
                                .webp({ quality: 20 })
                                .toBuffer();
                            const stream = cloudinary_1.v2.uploader.upload_stream({ folder: "DEV" }, (error, result) => {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve({ URL: result.secure_url });
                                }
                            });
                            bufferToStream(data).pipe(stream);
                        }
                        catch (error) {
                            reject(error);
                        }
                    }));
                })
                : [];
            const results = yield Promise.all(uploadPromises);
            req.filenames = results.map((result) => result.URL);
            next();
        }
        else {
            throw new Error("No files were uploaded.");
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.uploadToCloudinaryMultiple = uploadToCloudinaryMultiple;
// -------------------------------------------------END------------------------------------------------------------------------------------
// -------------------------------------------------upload single------------------------------------------------------------------------------------
const uploadFile = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 4000000 },
}).single("file");
exports.uploadFile = uploadFile;
const uploadToCloudinarySingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, sharp_1.default)(req.file.buffer).webp({ quality: 20 }).toBuffer();
        req.fileOriginalname = req.file.originalname;
        const stream = cloudinary_1.v2.uploader.upload_stream({ folder: "DEV" }, (error, result) => {
            if (error)
                console.log(error);
            else
                req.filenames = result.secure_url;
            next();
        });
        bufferToStream(data).pipe(stream);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.uploadToCloudinarySingle = uploadToCloudinarySingle;
