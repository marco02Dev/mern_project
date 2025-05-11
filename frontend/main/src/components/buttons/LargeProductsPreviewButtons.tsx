import { FC, ReactElement, SetStateAction, Dispatch} from "react";
import { UseMediaQuery, useMediaQuery } from "../../hooks/ui/useMediaQuery";
import { UseAuth, useAuth } from "../../hooks/auth/useAuth";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { StyledSpace } from "../themed/StyledSpace";
import { CreateCourseButton } from "../../../../admin/src/components/buttons/CreateCourseButton";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

type LargeProductsPreviewButtonsProps = {
    productsNumber?: number,
    setProducts: Dispatch<SetStateAction<number>>,
    createProducts?: boolean,
    products: number,
    productCreated?: boolean,
    setProductCreated?: Dispatch<SetStateAction<boolean>>,
    setCrateProductForm?: Dispatch<SetStateAction<boolean>>
}


export const LargeProductsPreviewButtons: FC<LargeProductsPreviewButtonsProps> = ({
    productsNumber,
    createProducts,
    products,
    productCreated,
    setProductCreated,
    setCrateProductForm,
    setProducts
}): ReactElement => {
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const { isLoggedIn, isAdmin }: UseAuth = useAuth();
    const thereAreProductsToShow: boolean = productsNumber !== undefined && products <= productsNumber;

    return  <Wrapper>
        {thereAreProductsToShow && <FadeInWrapper>
            <StyledButton unsetShadow content="Load more" action={(): void => setProducts(isMobile ? products + 4 : products + 3)} />
        </FadeInWrapper> }
    
        {(isAdmin || thereAreProductsToShow) && <StyledSpace small horizontal />}
    
        {isLoggedIn && isAdmin && createProducts && <CreateCourseButton 
            setCrateProductForm={setCrateProductForm}
            productCreated={productCreated}
            setProductCreated={setProductCreated}
            createProducts={createProducts}
        />}
    </Wrapper>
}