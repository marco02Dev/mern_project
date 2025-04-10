import { ReactElement, FC, useState } from "react";
import { CoursesLoop } from "../loops/CoursesLoop";
import { StyledSection } from "../themed/StyledSection";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";

type LargeProductsPreviewSectionProps = {
    category?: string,
    all?: boolean,
    limit: number
}

export const LargeProductsPreviewSection: FC<LargeProductsPreviewSectionProps> = ({
    limit,
    category
}: LargeProductsPreviewSectionProps): ReactElement => {
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const [products, setProducts] = useState<number>(limit);

    return <StyledSection overflowVisible paddingLeft={sizes.spaces.small} paddingRight={sizes.spaces.small}>
        <StyledSpace large vertical/>

        <CoursesLoop limit={products} category={category}/>
        
        <StyledSpace small vertical />
        <StyledSpace small vertical />

        <StyledButton content="Load more" action={(): void => setProducts(isMobile ? products + 4 : products + 3)} />

        <StyledSpace large vertical/>

    </ StyledSection>

}