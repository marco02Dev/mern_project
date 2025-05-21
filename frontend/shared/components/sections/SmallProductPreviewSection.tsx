import { ReactElement, FC } from "react";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { StyledText } from "@shared/components/themed/StyledText";
import { sizes } from "@shared/config/sizes.config";
import styled from "styled-components";
import { CoursesLoop } from "@shared/components/loops/CoursesLoop";
import { useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";
import { usePurchasedProducts } from "@shared/hooks/data/usePurchasedProducts";

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
