const signUpUseCase = async (dependencies: any) => {
  const {
    User: { createGallery },
  } = dependencies;

  const signup = async (
    id: string,
    albumId: string,
    filenames: string[],
    fileOriginalname: string[]
  ) => {
    try {
      const data = filenames.map((item, i) => ({
        file: item,
        fileName: fileOriginalname[i],
      }));
      
      const userCreate = await createGallery(id, albumId, data);
      return userCreate;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default signUpUseCase;
