const signUpUseCase = async (dependencies: any) => {
    const {
      User: { deleteFromGallery },
    } = dependencies;
  
    const signup = async (id: string, albumid: string,fileId:string) => {
      try {
        const userCreate = await deleteFromGallery(id, albumid,fileId);
        return userCreate;
      } catch (error) {
        console.error(error);
        return error;
      }
    };
  
    return signup;
  };
  
  export default signUpUseCase;
  