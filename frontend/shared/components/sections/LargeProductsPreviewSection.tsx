import { ReactElement, FC, useState } from "react";
import { CoursesLoop } from "@shared/components/loops/CoursesLoop";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { sizes } from "@shared/config/sizes.config";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { usePurchasedProducts } from "@shared/hooks/data/usePurchasedProducts";
import { LargeProductsPreviewButtons } from "@shared/components/buttons/LargeProductsPreviewButtons";

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
                products={products}
                setProducts={setProducts}
            />

            <StyledSpace large vertical/>
        </ StyledSection>  
    </>

}