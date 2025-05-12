import { ReactElement, FC, useState, useContext } from "react";
import { UseAuth, useAuth } from "@client/hooks/auth/useAuth";
import { CoursesLoop } from "@client/components/loops/CoursesLoop";
import { StyledSection } from "@client/components/themed/StyledSection";
import { sizes } from "@client/config/sizes.config";
import { StyledSpace } from "@client/components/themed/StyledSpace";
import { CreateProductForm } from "../forms/CreateProductForm";
import { UpdateProductForm } from "../forms/UpdateProductForm";
import { UpdateProductFormContext, UpdateProductFormContextProps } from "../../contexts/UpdateProductFormProvider";
import { useBodyOverflow } from "@client/hooks/ui/useBodyOverflow";
import { LargeProductsPreviewButtons } from "@client/components/buttons/LargeProductsPreviewButtons";
import { UpdateDeleteCourseButtons } from "../buttons/UpdateDeleteCourseButtons";
import { CreateCourseButton } from "../buttons/CreateCourseButton";
import { CreateProductFormContext, CreateProductFormContextProps } from "../../contexts/CreateProductFormContextProvider";

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
    createProducts,
    categoriesFilter,
    latest
}: LargeProductsPreviewSectionProps): ReactElement => {
    const [products, setProducts] = useState<number>(limit);
    const [productsNumber, setProductsNumber ] = useState<number | undefined>();
    const [productCreated, setProductCreated] = useState<boolean>(false);
    const { isAdmin }: UseAuth = useAuth();
    const { createProductForm }: CreateProductFormContextProps = useContext(CreateProductFormContext);
    const { updateProductForm }: UpdateProductFormContextProps = useContext(UpdateProductFormContext);

    useBodyOverflow(createProductForm);
    
    return <>
        <StyledSection overflowVisible paddingLeft={sizes.spaces.small} paddingRight={sizes.spaces.small}>
            <StyledSpace large vertical/>
            <CoursesLoop 
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
                products={products}
                setProducts={setProducts}
                AdditionalButtons={() => (
                    <CreateCourseButton 
                        productCreated={productCreated}
                        setProductCreated={setProductCreated}
                        createProducts={createProducts}
                    />
                )}
            />

            <StyledSpace large vertical/>
        </ StyledSection>  

        { createProductForm && isAdmin && createProducts && <CreateProductForm 
            setProductCreated={setProductCreated}
        />}

        { isAdmin && createProducts && updateProductForm.state && <UpdateProductForm />}
    </>

}