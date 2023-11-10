import mongoose, { ObjectId } from "mongoose";
interface Thumbnail {
  _id: ObjectId;
  name: string;
  file: string;
  fileName: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface thumbnailModel extends mongoose.Model<thumbnailDoc> {
  build(attrs: Thumbnail): thumbnailDoc;
}

interface thumbnailDoc extends mongoose.Document {
  _id: ObjectId;
  name: string;
  file: string;
  fileName: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface thumbnailData extends mongoose.Document {
  _id: ObjectId;
  name: string;
  file: string;
  fileName: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ThumbnailData {
  name: string;
  file: string;
  fileName: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export {
  thumbnailDoc,
  thumbnailModel,
  thumbnailData,
  ThumbnailData,
  Thumbnail,
};
