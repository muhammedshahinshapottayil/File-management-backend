const signUpUseCase = async (dependencies: any) => {
  const {
    User: { deleteAlbum },
  } = dependencies;

  const signup = async (id: string, albumid: string) => {
    try {
      const userCreate = await deleteAlbum(id, albumid);
      return userCreate;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default signUpUseCase;
