import { createContext, SetStateAction, Dispatch, ReactElement, useState } from "react";

export type UpdateProductFormContextProps = {
  updateProductForm: boolean;
  setUpdateProductForm: Dispatch<SetStateAction<boolean>>;
};
  
export const UpdateProductFormContext = createContext<UpdateProductFormContextProps | undefined>(undefined);

export const UpdateProductFormContextProvider = ({children}: {children: ReactElement}) => {

  const [updateProductForm, setUpdateProductForm] = useState<boolean>(false);

  return <UpdateProductFormContext.Provider value={{
    updateProductForm: updateProductForm,
    setUpdateProductForm: setUpdateProductForm
  }}>
    {children}
  </UpdateProductFormContext.Provider>
}