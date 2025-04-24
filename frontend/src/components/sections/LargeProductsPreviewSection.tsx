import { ReactElement, FC, useState, useContext, Dispatch, SetStateAction } from "react";
import { CoursesLoop } from "../loops/CoursesLoop";
import { StyledSection } from "../themed/StyledSection";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";
import { usePurchasedProducts } from "../../hooks/usePurchasedProducts";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LoginState } from "../../store/slices/login.slice";
import styled from "styled-components";
import { FormSection } from "./FormSection";
import { StyledText } from "../themed/StyledText";
import { colors } from "../../config/colors.config";
import { endpoints } from "../../config/endpoints.config";

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

type LargeProductsPreviewSectionProps = {
    category?: string,
    all?: boolean,
    limit: number,
    userProductsPurchased?: boolean;
    createProducts?: boolean
}

export const LargeProductsPreviewSection: FC<LargeProductsPreviewSectionProps> = ({
    limit,
    category,
    userProductsPurchased,
    createProducts
}: LargeProductsPreviewSectionProps): ReactElement => {
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const [products, setProducts] = useState<number>(limit);
    const [productsNumber, setProductsNumber ] = useState<number | undefined>();
    const [createProductForm, setCrateProductForm] = useState<boolean>(false);
    const [productCreated, setProductCreated] = useState<boolean>(false);

    const { productsPurchased } = usePurchasedProducts(userProductsPurchased);
    const login: LoginState = useSelector((state: RootState) => state.login);
    const { isLoggedIn } = login;
    const { user } = login;

    const isAdmin: boolean = isLoggedIn && user?.role === "admin";
    const thereAreProductsToShow: boolean = productsNumber !== undefined && products <= productsNumber;

    return <>
        <StyledSection overflowVisible paddingLeft={sizes.spaces.small} paddingRight={sizes.spaces.small}>
            <StyledSpace large vertical/>

            <CoursesLoop purchasedProducts={productsPurchased} limit={products} category={category} setProductsNumber={setProductsNumber}/>
            
            <StyledSpace small vertical />
            <StyledSpace small vertical />

            { (isAdmin || thereAreProductsToShow) &&
                <ButtonWrapper>
                    {thereAreProductsToShow && <FadeInWrapper>
                        <StyledButton unsetShadow content="Load more" action={(): void => setProducts(isMobile ? products + 4 : products + 3)} />
                    </FadeInWrapper> }

                    {
                        (isAdmin || thereAreProductsToShow) && <StyledSpace small horizontal />
                    }

                    {isAdmin && createProducts && <FadeInWrapper>
                        <StyledButton unsetShadow content="Create course" action={(): void => {
                            setCrateProductForm(true);
                            setProductCreated(false);
                        }} />
                    </FadeInWrapper> }

                    {productCreated && <>
                        <StyledSpace small horizontal />
                        <StyledText tag="h6" color={colors.dark.successMessage} content="New Product created!" />
                    </>}
                </ButtonWrapper>
            }

            <StyledSpace large vertical/>
        </ StyledSection>  

        { createProductForm && isAdmin && createProducts && <FormSection
            imgSrc={`${endpoints.imagesEndpoint}/pages/admin/form-section.webp`}
            imageBorderedBoxWidth="40%"
            formWidth="60%"
            title={"Create a new course"} 
            service="create-course"
            productImage
            setCrateProductForm={setCrateProductForm}
            setProductCreated={setProductCreated}
            textArea="details"
            textAreaPlaceholder="Write as title=…,content=…; separate sections with commas."
            fields={[
                "name",
                "price",
                "category",
                "tags"
            ]}
        /> }
    </>

}