import { createContext, SetStateAction, Dispatch, ReactElement, useState } from "react";

export type ProductCreatedContextProps = {
  productCreated: boolean;
  setProductCreated: Dispatch<SetStateAction<boolean>>;
};
  
export const ProductCreatedContext = createContext<ProductCreatedContextProps | undefined>(undefined);

export const ProductCreatedContextProvider = ({ children }: { children: ReactElement }) => {
  const [productCreated, setProductCreated] = useState<boolean>(false);

  return (
    <ProductCreatedContext.Provider value={{
      productCreated,
      setProductCreated
    }}>
      {children}
    </ProductCreatedContext.Provider>
  );
};
