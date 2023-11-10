const signUpUseCase = async (dependencies: any) => {
  const {
    User: { createThumbnail },
  } = dependencies;

  const signup = async (
    id: string,
    { name }: { name: string },
    filenames: string,
    fileOriginalname: string
  ) => {
    try {
      const userCreate = await createThumbnail(
        id,
        name,
        filenames,
        fileOriginalname
      );
      return userCreate;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default signUpUseCase;
