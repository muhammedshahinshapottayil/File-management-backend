import mongoose from "mongoose";
import { Thumbnail, thumbnailModel, thumbnailDoc } from "../interfaces";
import ENV from "../env";
const user = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    albums: {
      type: [
        {
          name: { type: String, required: true },
          file: {
            type: [
              {
                file: { type: String, required: true },
                fileName: { type: String, required: true },
                date: { type: Date, default: new Date() },
                status: { type: Boolean, default: true },
              },
            ],
          },
          date: { type: Date, default: new Date() },
          status: { type: Boolean, default: true },
          gallery: {
            type: [
              {
                file: { type: String, required: true },
                fileName: { type: String, required: true },
                date: { type: Date, default: new Date() },
                status: { type: Boolean, default: true },
              },
            ],
          },
        },
      ],
    },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: Thumbnail, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

user.statics.build = (attrs: Thumbnail) => {
  return new User(attrs);
};
const User = mongoose.model<thumbnailDoc, thumbnailModel>(
  ENV.USER_COLLECTION,
  user
);
export default User;
