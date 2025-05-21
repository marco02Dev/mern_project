import { ReactElement, FC } from "react";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { StyledText } from "@shared/components/themed/StyledText";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { sizes } from "@shared/config/sizes.config";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";
import { defaultDelayIncrement } from "@shared/config/animation.config";

type TextSectionProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  secondaryColor?: boolean;
};

export const TextSection: FC<TextSectionProps> = ({
  title,
  description,
  buttonLabel,
  buttonLink,
  secondaryColor
}: TextSectionProps): ReactElement => {
  return (
    <StyledSection secondaryColor={secondaryColor} paddingLeft={sizes.spaces.medium} paddingRight={sizes.spaces.medium} justifyCenter>

      <TextRevealWrapper left>
        <StyledText tag={'h2'} content={title} size={'h1'} />
      </TextRevealWrapper>

      <StyledSpace medium vertical />

      <TextRevealWrapper delay={defaultDelayIncrement}>
        <StyledText tag={'p'} content={description} />
      </TextRevealWrapper>

      <StyledSpace medium vertical />

      <FadeInWrapper delay={sumStringDelays(defaultDelayIncrement, { increment: 2 })}>
        <StyledButton content={buttonLabel} to={buttonLink} />
      </FadeInWrapper>
    </StyledSection>
  );
};
