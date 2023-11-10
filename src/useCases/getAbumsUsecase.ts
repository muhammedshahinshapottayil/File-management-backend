const getAlbumUseCase = async (dependencies: any) => {
  const {
    User: { getAlbums },
  } = dependencies;

  const signup = async (id: string) => {
    try {
      const userCreate = await getAlbums(id);
      return userCreate;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default getAlbumUseCase;
