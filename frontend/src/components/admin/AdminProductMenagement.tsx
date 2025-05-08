import { ReactElement, FC, useState, useContext, Dispatch, SetStateAction } from "react";
import { CoursesLoop } from "../loops/CoursesLoop";
import { StyledSection } from "../themed/StyledSection";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { usePurchasedProducts } from "../../hooks/data/usePurchasedProducts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LoginState } from "../../store/slices/login.slice";
import { CreateProductForm } from "../forms/CreateProductForm";
import { UpdateProductForm } from "../forms/UpdateProductForm";
import { useLocation } from "react-router-dom";
import { UpdateProductFormContext, UpdateProductFormContextStateObject, UpdateProductFormContextProps } from "../../contexts/UpdateProductFormProvider";
import { useBodyOverflow } from "../../hooks/ui/useBodyOverflow";
import { LargeProductsPreviewButtons } from "../buttons/LargeProductsPreviewButtons";

type LargeProductsPreviewSectionProps = {
    category?: string,
    all?: boolean,
    limit: number,
    userProductsPurchased?: boolean;
    createProducts?: boolean,
    categoriesFilter?: boolean,
    latest?: boolean
}

export const AdminProductManagement: FC<LargeProductsPreviewSectionProps> = ({
    limit,
    category,
    userProductsPurchased,
    createProducts,
    categoriesFilter,
    latest
}: LargeProductsPreviewSectionProps): ReactElement => {
    const [products, setProducts] = useState<number>(limit);
    const [productsNumber, setProductsNumber ] = useState<number | undefined>();
    const [createProductForm, setCrateProductForm] = useState<boolean>(false);
    const [productCreated, setProductCreated] = useState<boolean>(false);

    const { productsPurchased } = usePurchasedProducts(userProductsPurchased);
    const login: LoginState = useSelector((state: RootState) => state.login);
    const { isLoggedIn } = login;
    const { user } = login;
    const location = useLocation();
    const isAdminPage: boolean = location.pathname.startsWith("/admin");

    const isAdmin: boolean = isLoggedIn && user?.role === "admin";

    let setUpdateProductFormSetState: Dispatch<SetStateAction<UpdateProductFormContextStateObject>> = () => {};
    let updateProductFormState: UpdateProductFormContextStateObject = {
        state: false,
        courseId: ""
    };

    if(isLoggedIn && isAdminPage && isAdmin) {
        const updateProductFormContext: any = useContext(UpdateProductFormContext);
        if(UpdateProductFormContext !== undefined) {
            const {setUpdateProductForm, updateProductForm}: UpdateProductFormContextProps = updateProductFormContext;
            setUpdateProductFormSetState = setUpdateProductForm;
            updateProductFormState = updateProductForm;
        }
    }

    useBodyOverflow(createProductForm);
    
    return <>
        <StyledSection overflowVisible paddingLeft={sizes.spaces.small} paddingRight={sizes.spaces.small}>
            <StyledSpace large vertical/>
            <CoursesLoop 
                purchasedProducts={productsPurchased} 
                limit={products} 
                category={category} 
                setProductsNumber={setProductsNumber}
                categoriesFilter={categoriesFilter}
                latest={latest}
            />
            
            <StyledSpace small vertical />
            <StyledSpace small vertical />

            <LargeProductsPreviewButtons 
                productsNumber={productsNumber}
                createProducts={createProducts}
                products={products}
                productCreated={productCreated}
                setProductCreated={setProductCreated}
                setCrateProductForm={setCrateProductForm}
                setProducts={setProducts}
            />

            <StyledSpace large vertical/>
        </ StyledSection>  

        { createProductForm && isAdmin && createProducts && <CreateProductForm 
            setCrateProductForm={setCrateProductForm}
            setProductCreated={setProductCreated}
        />}

        { isAdmin && createProducts && updateProductFormState.state && <UpdateProductForm 
            setUpdateProductFormSetState={setUpdateProductFormSetState}
        />}
    </>

}