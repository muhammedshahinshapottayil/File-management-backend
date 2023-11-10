const getAlbumUseCase = async (dependencies: any) => {
  const {
    User: { getGallery },
  } = dependencies;

  const signup = async (id: string, albumId: string) => {
    try {
      const userCreate = await getGallery(id,albumId);
      return userCreate;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default getAlbumUseCase;
