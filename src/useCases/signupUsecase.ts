import { UserData, userData } from "../interfaces";

const signUpUsecase = async (dependencies: any) => {
  const {
    User: { getUserbyusername, createUser },
    Utils: { generateHashedPassword },
  } = dependencies;

  const signup = async ({ username, password }: UserData) => {
    try {
      const userExists = await getUserbyusername(username);
      if (userExists) throw new Error("User Already Exists");
      password = await generateHashedPassword(password);
      const userCreate: userData = await createUser({
        username,
        password,
      });
      return userCreate;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default signUpUsecase;
