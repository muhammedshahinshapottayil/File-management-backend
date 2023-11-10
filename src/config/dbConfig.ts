import mongoose from "mongoose";
import ENV from "../env";

export default async (dependencies: any) => {
  const {
    Common: { DbError },
  } = dependencies;
  try {
    await mongoose.connect(ENV.DB_URL);
    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error:")
    );
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error(error);
    throw new DbError();
  }
};
