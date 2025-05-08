import { ReactElement, FC, useState } from "react";
import { CoursesLoop } from "../loops/CoursesLoop";
import { StyledSection } from "../themed/StyledSection";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { usePurchasedProducts } from "../../hooks/data/usePurchasedProducts";
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

export const LargeProductsPreviewSection: FC<LargeProductsPreviewSectionProps> = ({
    limit,
    category,
    userProductsPurchased,
    createProducts,
    categoriesFilter,
    latest
}: LargeProductsPreviewSectionProps): ReactElement => {
    const [products, setProducts] = useState<number>(limit);
    const [productsNumber, setProductsNumber ] = useState<number | undefined>();
    const { productsPurchased } = usePurchasedProducts(userProductsPurchased);

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
                setProducts={setProducts}
            />

            <StyledSpace large vertical/>
        </ StyledSection>  
    </>

}