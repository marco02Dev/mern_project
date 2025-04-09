import { ReactElement, FC, useState } from "react";
import { CoursesLoop } from "../loops/CoursesLoop";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { sizes } from "../../config/sizes.config";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";

type LargeProductsPreviewSectionProps = {
    title: string,
    category?: string,
    all?: boolean,
    limit: number
}

export const LargeProductsPreviewSection: FC<LargeProductsPreviewSectionProps> = ({
    title,
    limit
}: LargeProductsPreviewSectionProps): ReactElement => {
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const [products, setProducts] = useState<number>(limit);

    return <StyledSection overflowVisible paddingLeft={sizes.spaces.small} paddingRight={sizes.spaces.small}>
        <StyledSpace medium vertical/>

        <TextRevealWrapper left>
            <StyledText tag="h2" content={title} size="h1" />
        </TextRevealWrapper>

        <StyledSpace medium vertical />

        <CoursesLoop limit={products} threeBoxes />
        
        <StyledSpace large vertical />

        <StyledButton content="Load more" action={(): void => setProducts(isMobile ? products + 4 : products + 3)} />

        <StyledSpace medium vertical large/>

    </ StyledSection>

}