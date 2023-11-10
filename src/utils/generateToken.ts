import jwt from "jsonwebtoken";
// import { userData } from "../interfaces";
import Env from "../env";
const generateAccessToken = (data: any) => {
  try {
    return jwt.sign({ data }, Env.SIGNATURE, {
      expiresIn: "14d",
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const generateToken = (data: any) => {
  return generateAccessToken(data);
};

export { generateToken };
