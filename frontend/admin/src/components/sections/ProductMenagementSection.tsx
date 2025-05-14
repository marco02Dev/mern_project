import { ReactElement, FC, useState, useContext } from "react";
import { CoursesLoop } from "@shared/components/loops/CoursesLoop";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { sizes } from "@shared/config/sizes.config";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { CreateProductForm } from "@admin/components/forms/CreateProductForm";
import { UpdateProductForm } from "@admin/components/forms/UpdateProductForm";
import { useBodyOverflow } from "@shared/hooks/ui/useBodyOverflow";
import { LargeProductsPreviewButtons } from "@shared/components/buttons/LargeProductsPreviewButtons";
import { UpdateDeleteCourseButtons } from "@admin/components/buttons/UpdateDeleteCourseButtons";
import { CreateCourseButton } from "@admin/components/buttons/CreateCourseButton";
import { ProductManagementContext, ProductManagementContextProps } from "@admin/contexts/ProductMenagementContextProvider";

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