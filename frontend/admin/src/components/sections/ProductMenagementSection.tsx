import { ReactElement, FC, useState, useContext, Dispatch, SetStateAction } from "react";
import { UseAuth, useAuth } from "../../../../main/src/hooks/auth/useAuth";
import { CoursesLoop } from "../../../../main/src/components/loops/CoursesLoop";
import { StyledSection } from "../../../../main/src/components/themed/StyledSection";
import { sizes } from "../../../../main/src/config/sizes.config";
import { StyledSpace } from "../../../../main/src/components/themed/StyledSpace";
import { usePurchasedProducts } from "../../../../main/src/hooks/data/usePurchasedProducts";
import { CreateProductForm } from "../forms/CreateProductForm";
import { UpdateProductForm } from "../forms/UpdateProductForm";
import { useLocation } from "react-router-dom";
import { UpdateProductFormContext, UpdateProductFormContextStateObject, UpdateProductFormContextProps } from "../../contexts/UpdateProductFormProvider";
import { useBodyOverflow } from "../../../../main/src/hooks/ui/useBodyOverflow";
import { LargeProductsPreviewButtons } from "../../../../main/src/components/buttons/LargeProductsPreviewButtons";
import { UpdateDeleteCourseButtons } from "../buttons/UpdateDeleteCourseButtons";

type LargeProductsPreviewSectionProps = {
    category?: string,
    all?: boolean,
    limit: number,
    userProductsPurchased?: boolean;
    createProducts?: boolean,
    categoriesFilter?: boolean,
    latest?: boolean
}

export const AdminProductManagementSection: FC<LargeProductsPreviewSectionProps> = ({
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
    const {isLoggedIn, isAdmin }: UseAuth = useAuth();

    const location = useLocation();
    const isAdminPage: boolean = location.pathname.startsWith("/admin");


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
                AdditionalButtons={UpdateDeleteCourseButtons}
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