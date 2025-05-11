import { ReactElement, FC } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";
import { CoursesLoop } from "../loops/CoursesLoop";
import { useMediaQuery } from "../../hooks/ui/useMediaQuery";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { usePurchasedProducts } from "../../hooks/data/usePurchasedProducts";

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export type TwoProductPreviewSectionProps = {
  title: string;
  latest?: boolean;
  category?: string;
  userProductsPurchased?: boolean;
};

export const SmallProductsPreviewSection: FC<TwoProductPreviewSectionProps> = ({
  title,
  latest,
  userProductsPurchased,
}: TwoProductPreviewSectionProps): ReactElement => {
  const { isMobile, isTablet } = useMediaQuery();
  const { productsPurchased } = usePurchasedProducts(userProductsPurchased);

  let limit: number = 3;
  if (isTablet) {
    limit = 2;
  } else if (isMobile) {
    limit = 2;
  }

  return (
    <StyledSection
      justifyCenter
      height={isMobile || isTablet ? "100vh" : "100vh"}
      paddingLeft={sizes.spaces.medium}
      paddingRight={sizes.spaces.medium}
    >
      <StyledSpace medium vertical />

      <TitleWrapper>
        <TextRevealWrapper>
          <StyledText tag="h2" content={title} />
        </TextRevealWrapper>
      </TitleWrapper>

      <StyledSpace medium vertical />

      <CoursesLoop
        purchasedProducts={productsPurchased}
        limit={limit}
        latest={latest}
      />
    </StyledSection>
  );
};
