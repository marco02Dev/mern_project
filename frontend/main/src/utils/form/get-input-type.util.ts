type GetInputType = {
    isFile: boolean | undefined;
    name: string;
    isPasswordVisible: boolean;
};

export const getInputType = ({
    isFile, 
    name, 
    isPasswordVisible
}: GetInputType) => {
    if (isFile) return "file";
  
    if (name === "password") {
      return isPasswordVisible ? "text" : "password";
    }
  
    if (name === "email") return "email";
  
    return "text";
};