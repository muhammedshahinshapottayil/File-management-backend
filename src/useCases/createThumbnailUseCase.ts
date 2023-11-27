const signUpUseCase = async (dependencies: any) => {
  const {
    User: { createThumbnail },
  } = dependencies;

  const signup = async (
    id: string,
    { name, albumId }: { name: string; albumId: string },
    filenames: string[],
    fileOriginalname: string[]
  ) => {
    try {
      const data = filenames.map((item, i) => ({
        file: item,
        fileName: fileOriginalname[i],
      }));
      const userCreate = await createThumbnail(id, name, albumId, data);
      return userCreate;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default signUpUseCase;
