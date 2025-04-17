import { ReactElement, FC, useState } from "react";
import { CoursesLoop } from "../loops/CoursesLoop";
import { StyledSection } from "../themed/StyledSection";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";
import { usePurchasedProducts } from "../../hooks/usePurchasedProducts";
import { FadeInWrapper } from "../animated/FadeInWrapper";

type LargeProductsPreviewSectionProps = {
    category?: string,
    all?: boolean,
    limit: number,
    userProductsPurchased?: boolean;
}

export const LargeProductsPreviewSection: FC<LargeProductsPreviewSectionProps> = ({
    limit,
    category,
    userProductsPurchased
}: LargeProductsPreviewSectionProps): ReactElement => {
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const [products, setProducts] = useState<number>(limit);
    const [productsNumber, setProductsNumber ] = useState<number | undefined>();
    const { productsPurchased } = usePurchasedProducts(userProductsPurchased);
    console.log(productsNumber);


    return <StyledSection overflowVisible paddingLeft={sizes.spaces.small} paddingRight={sizes.spaces.small}>
        <StyledSpace large vertical/>

        <CoursesLoop purchasedProducts={productsPurchased} limit={products} category={category} setProductsNumber={setProductsNumber}/>
        
        <StyledSpace small vertical />
        <StyledSpace small vertical />

        {productsNumber && products <= productsNumber && <FadeInWrapper>
            <StyledButton unsetShadow content="Load more" action={(): void => setProducts(isMobile ? products + 4 : products + 3)} />
        </FadeInWrapper> }


        <StyledSpace large vertical/>

    </ StyledSection>

}