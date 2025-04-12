import { ReactElement, FC, useEffect, useState } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";
import { CoursesLoop } from "../loops/CoursesLoop";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../types/user.types";
import { getUserPurchasedProducts } from "../../services/get-user-purchased-products.service";

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export type TwoProductPreviewSectionProps = {
    title: string,
    latest?: boolean,
    category?: string,
    userProductsPurchased?: boolean
}

export const SmallProductsPreviewSection: FC<TwoProductPreviewSectionProps> = ({title, latest, userProductsPurchased}: TwoProductPreviewSectionProps): ReactElement => {

    const { isMobile, isTablet } = useMediaQuery();
    const login = useSelector((state: RootState) => state.login);
    const { isLoggedIn }: { isLoggedIn: boolean } = login;
    const _id: string = (login?.user as User)?._id ?? "";
  
    const [productsPurchased, setProductsPurchased] = useState<string[] | null>(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        if (isLoggedIn && _id && userProductsPurchased) {
          try {
            const products = await getUserPurchasedProducts({ _id });
            setProductsPurchased(products);
          } catch (error) {
            setProductsPurchased(null);
          }
        }
      };
  
      fetchProducts();
    }, [isLoggedIn, _id]);
  
    useEffect(() => {
    }, [productsPurchased]);

    let limit: number = 3;
    if(isTablet) {
        limit = 2;
    } else if(isMobile) {
        limit = 2;
    }

    return <StyledSection justifyCenter height={isMobile || isTablet ? "100vh" : "100vh"} paddingLeft={sizes.spaces.medium}  paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TitleWrapper>
            <TextRevealWrapper>
                <StyledText tag="h2" content={title} />
            </TextRevealWrapper>
        </TitleWrapper>

        <StyledSpace medium vertical />

        <CoursesLoop purchasedProducts={productsPurchased} limit={limit} latest={latest} />

    </StyledSection>
}