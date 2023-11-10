import mongoose, { ObjectId } from "mongoose";

type Album = {
  name: string;
  file: string;
  date: string;
  status: boolean;
  gallery?: Gallery[];
};
type Gallery = {
  name: string;
  file: string;
  date: string;
  status: boolean;
};

interface User {
  _id: ObjectId;
  username: string;
  password: string;
  albums?: Album[];
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface userModel extends mongoose.Model<userDoc> {
  build(attrs: User): userDoc;
}

interface userDoc extends mongoose.Document {
  _id: ObjectId;
  username: string;
  password: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface userData extends mongoose.Document {
  _id: ObjectId;
  username: string;
  password: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserData {
  username: string;
  password: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export { userDoc, userModel, userData, UserData, User };
