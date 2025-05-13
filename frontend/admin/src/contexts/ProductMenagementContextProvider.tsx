import { createContext, useState, ReactElement, Dispatch, SetStateAction } from "react";

export type UpdateProductFormState = {
  state: boolean;
  courseId: string | undefined;
};

export type ProductManagementContextProps = {
  createProductForm: boolean;
  setCreateProductForm: Dispatch<SetStateAction<boolean>>;
  productCreated: boolean;
  setProductCreated: Dispatch<SetStateAction<boolean>>;
  updateProductForm: UpdateProductFormState;
  setUpdateProductForm: Dispatch<SetStateAction<UpdateProductFormState>>;
};

export const ProductManagementContext = createContext<ProductManagementContextProps | undefined>(undefined);

export const ProductManagementContextProvider = ({ children }: { children: ReactElement }) => {
  const [createProductForm, setCreateProductForm] = useState<boolean>(false);
  const [productCreated, setProductCreated] = useState<boolean>(false);
  const [updateProductForm, setUpdateProductForm] = useState<UpdateProductFormState>({
    state: false,
    courseId: ""
  });

  return (
    <ProductManagementContext.Provider
      value={{
        createProductForm,
        setCreateProductForm,
        productCreated,
        setProductCreated,
        updateProductForm,
        setUpdateProductForm
      }}
    >
      {children}
    </ProductManagementContext.Provider>
  );
};
