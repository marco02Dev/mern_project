import { ReactElement, FC } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { sizes } from "../../config/sizes.config";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { defaultDelayIncrement } from "../../config/animation.config";

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
