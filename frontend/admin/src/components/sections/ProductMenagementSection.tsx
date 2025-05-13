import { ReactElement, FC, useState, useContext } from "react";
import { CoursesLoop } from "@client/components/loops/CoursesLoop";
import { StyledSection } from "@client/components/themed/StyledSection";
import { sizes } from "@client/config/sizes.config";
import { StyledSpace } from "@client/components/themed/StyledSpace";
import { CreateProductForm } from "../forms/CreateProductForm";
import { UpdateProductForm } from "../forms/UpdateProductForm";
import { useBodyOverflow } from "@client/hooks/ui/useBodyOverflow";
import { LargeProductsPreviewButtons } from "@client/components/buttons/LargeProductsPreviewButtons";
import { UpdateDeleteCourseButtons } from "../buttons/UpdateDeleteCourseButtons";
import { CreateCourseButton } from "../buttons/CreateCourseButton";
import { ProductManagementContext, ProductManagementContextProps } from "../../contexts/ProductMenagementContextProvider";

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
    const { createProductForm, updateProductForm }: ProductManagementContextProps = useContext(ProductManagementContext);
    const [products, setProducts] = useState<number>(limit);
    const [productsNumber, setProductsNumber ] = useState<number | undefined>();

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
                AdditionalButtons={CreateCourseButton}
            />

            <StyledSpace large vertical/>
        </ StyledSection>  

        { createProductForm && createProducts && <CreateProductForm />}

        { createProducts && updateProductForm.state && <UpdateProductForm />}
    </>

}