import { UserData } from "../../interfaces";
import User from "../../models/userMdl";
import mongoose from "mongoose";
const Obj = mongoose.Types.ObjectId;
const getUserbyusername = async (username: string) => {
  try {
    const data = await User.findOne({ username }).select("-password");
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const createUser = async ({ username, password }: UserData) => {
  try {
    const userCreate = await User.create({
      username,
      password,
    });
    return userCreate ? userCreate : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findValidUser = async (username: string) => {
  try {
    const user = await User.findOne({
      username,
      status: true,
    });
    return user ? user : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const userByid = async (id: mongoose.Types.ObjectId) => {
  try {
    const userExists = await User.findById({ id }).select("-password");
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllUsers = async () => {
  try {
    const data = await User.find({
      status: true,
      role: { $ne: "admin" },
    }).select("-password");
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteUser = async (id: mongoose.Types.ObjectId) => {
  try {
    const user = await User.deleteOne({
      _id: id,
      status: false,
      role: { $ne: "admin" },
    });
    return user ? user : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createThumbnail = async (
  id: string,
  name: string,
  albumId: string,
  data: { fileName: string; file: string }[]
) => {
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
    } else {
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

    const thumbnail = await User.updateOne(matchQuery, query);
    return thumbnail ? thumbnail : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createGallery = async (
  id: string,
  albumId: string,
  data: { fileName: string; file: string }[]
) => {
  try {
    const thumbnail = await User.updateOne(
      { _id: new Obj(id), "albums._id": new Obj(albumId) },
      { $push: { "albums.$.gallery": { $each: data } } }
    );
    return thumbnail ? thumbnail : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getAlbums = async (id: string) => {
  try {
    const data = await User.aggregate([
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
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteAlbum = async (id: string, albumId: string) => {
  try {
    const result = await User.updateOne(
      { _id: new Obj(id) },
      { $pull: { albums: { _id: new Obj(albumId) } } }
    );
    return result ? result : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getGallery = async (id: string, albumId: string) => {
  try {
    const data = await User.aggregate([
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
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteFromGallery = async (
  userId: string,
  albumId: string,
  fileId: string
) => {
  try {
    const result = await User.updateOne(
      {
        _id: new Obj(userId),
        "albums._id": new Obj(albumId),
      },
      {
        $pull: {
          "albums.$.gallery": {
            _id: new Obj(fileId),
          },
        },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default {
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
