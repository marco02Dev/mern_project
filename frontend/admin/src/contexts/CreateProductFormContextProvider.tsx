import { createContext, SetStateAction, Dispatch, ReactElement, useState } from "react";

export type CreateProductFormContextProps = {
  createProductForm: boolean;
  setCreateProductForm: Dispatch<SetStateAction<boolean>>;
};
  
export const CreateProductFormContext = createContext<CreateProductFormContextProps | undefined>(undefined);

export const CreateProductFormContextProvider = ({children}: {children: ReactElement}) => {

  const [createProductForm, setCreateProductForm] = useState<boolean>(false);

  return (
    <CreateProductFormContext.Provider value={{
      createProductForm,
      setCreateProductForm
    }}>
      {children}
    </CreateProductFormContext.Provider>
  );
};
