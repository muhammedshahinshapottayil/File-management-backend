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
const userMdl_1 = __importDefault(require("../../models/userMdl"));
const mongoose_1 = __importDefault(require("mongoose"));
const Obj = mongoose_1.default.Types.ObjectId;
const getUserbyusername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userMdl_1.default.findOne({ username }).select("-password");
        return data ? data : false;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
const createUser = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreate = yield userMdl_1.default.create({
            username,
            password,
        });
        return userCreate ? userCreate : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const findValidUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userMdl_1.default.findOne({
            username,
            status: true,
        });
        return user ? user : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const userByid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield userMdl_1.default.findById({ id }).select("-password");
        return userExists ? userExists : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userMdl_1.default.find({
            status: true,
            role: { $ne: "admin" },
        }).select("-password");
        return data ? data : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userMdl_1.default.deleteOne({
            _id: id,
            status: false,
            role: { $ne: "admin" },
        });
        return user ? user : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const createThumbnail = (id, name, albumId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query;
        let matchQuery;
        if (albumId) {
            matchQuery = {
                _id: new Obj(id),
                "albums._id": new Obj(albumId),
            };
            query = {
                $set: {
                    "albums.$.name": name,
                    "albums.$.file": data,
                },
            };
        }
        else {
            matchQuery = {
                _id: new Obj(id),
            };
            query = {
                $push: {
                    albums: {
                        name,
                        file: data,
                    },
                },
            };
        }
        const thumbnail = yield userMdl_1.default.updateOne(matchQuery, query);
        return thumbnail ? thumbnail : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const createGallery = (id, albumId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thumbnail = yield userMdl_1.default.updateOne({ _id: new Obj(id), "albums._id": new Obj(albumId) }, { $push: { "albums.$.gallery": { $each: data } } });
        return thumbnail ? thumbnail : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const getAlbums = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userMdl_1.default.aggregate([
            {
                $match: {
                    _id: new Obj(id),
                    status: true,
                },
            },
            {
                $project: {
                    albums: {
                        $map: {
                            input: "$albums",
                            as: "album",
                            in: {
                                name: "$$album.name",
                                file: "$$album.file",
                                fileName: "$$album.fileName",
                                date: "$$album.date",
                                _id: "$$album._id",
                                status: "$$album.status",
                            },
                        },
                    },
                },
            },
        ]);
        return data ? data : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const deleteAlbum = (id, albumId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userMdl_1.default.updateOne({ _id: new Obj(id) }, { $pull: { albums: { _id: new Obj(albumId) } } });
        return result ? result : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const getGallery = (id, albumId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userMdl_1.default.aggregate([
            {
                $match: {
                    _id: new Obj(id),
                    status: true,
                },
            },
            {
                $unwind: "$albums",
            },
            {
                $match: {
                    "albums._id": new Obj(albumId),
                },
            },
            {
                $project: {
                    albumName: "$albums.name",
                    gallery: "$albums.gallery",
                },
            },
        ]);
        return data ? data : false;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
const deleteFromGallery = (userId, albumId, fileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userMdl_1.default.updateOne({
            _id: new Obj(userId),
            "albums._id": new Obj(albumId),
        }, {
            $pull: {
                "albums.$.gallery": {
                    _id: new Obj(fileId),
                },
            },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.default = {
    getUserbyusername,
    createUser,
    findValidUser,
    userByid,
    getAllUsers,
    deleteUser,
    createThumbnail,
    createGallery,
    getAlbums,
    deleteAlbum,
    getGallery,
    deleteFromGallery,
};
