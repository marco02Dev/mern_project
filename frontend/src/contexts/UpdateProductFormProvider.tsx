import { createContext, SetStateAction, Dispatch } from "react";

type UpdateProductFormContextType = {
  updateProductForm: boolean;
  setUpdateProductForm: Dispatch<SetStateAction<boolean>>;
};
  
export const UpdateProductFormContext = createContext<UpdateProductFormContextType | undefined>(undefined);