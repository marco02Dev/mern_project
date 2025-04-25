import { createContext, SetStateAction, Dispatch, ReactElement, useState } from "react";

export type UpdateProductFormContextStateObject = {
  state: boolean,
  courseId: string | undefined  
}

export type UpdateProductFormContextProps = {
  updateProductForm: UpdateProductFormContextStateObject;
  setUpdateProductForm: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>;
};
  
export const UpdateProductFormContext = createContext<UpdateProductFormContextProps | undefined>(undefined);

export const UpdateProductFormContextProvider = ({children}: {children: ReactElement}) => {

  const [updateProductForm, setUpdateProductForm] = useState<UpdateProductFormContextStateObject>({
    state: false,
    courseId: ""
  });

  return <UpdateProductFormContext.Provider value={{
    updateProductForm: updateProductForm,
    setUpdateProductForm: setUpdateProductForm
  }}>
    {children}
  </UpdateProductFormContext.Provider>
}