import { FC, ReactElement, SetStateAction, Dispatch} from "react";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import styled from "styled-components";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { StyledSpace } from "@shared/components/themed/StyledSpace";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

type LargeProductsPreviewButtonsProps = {
    productsNumber?: number,
    setProducts: Dispatch<SetStateAction<number>>,
    products: number,
    AdditionalButtons?: FC
}


export const LargeProductsPreviewButtons: FC<LargeProductsPreviewButtonsProps> = ({
    productsNumber,
    products,
    setProducts,
    AdditionalButtons
}): ReactElement => {
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const thereAreProductsToShow: boolean = productsNumber !== undefined && products <= productsNumber;

    return  <Wrapper>
        {thereAreProductsToShow && <FadeInWrapper>
            <StyledButton unsetShadow content="Load more" action={(): void => setProducts(isMobile ? products + 4 : products + 3)} />
        </FadeInWrapper> }
    
        {(AdditionalButtons || thereAreProductsToShow) && <StyledSpace small horizontal />}

        {AdditionalButtons && <AdditionalButtons />}
    </Wrapper>
}