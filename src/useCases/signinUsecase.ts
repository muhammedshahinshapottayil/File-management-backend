import argon2 from "argon2";
import { UserData } from "../interfaces";
const signinUsecase = async (dependencies: any) => {
  const {
    User: { findValidUser },
    Utils: { generateToken },
  } = dependencies;

  const signin = async ({ username, password }: UserData) => {
    try {
      const userExists: any = await findValidUser(username);
      if (!userExists) throw new Error("invalid username ");
      if (await argon2.verify(userExists.password, password)) {
        delete userExists.password;
        return { userData: userExists, token: await generateToken(userExists) };
      }
      throw new Error("invalid password ");
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signin;
};

export default signinUsecase;
