import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledText } from "../../styles/styled-text";
import { StyledSpace } from "../../styles/styled-space";
import { StyledButton } from "../../styles/styled-button";
import { sizes } from "../../config/sizes.config";
import { FadeInWrapper } from "../animated/fade-in-wrapper";
import { TextRevealWrapper } from "../animated/text-reveal-wrapper";

type TextSectionProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  secondaryColor?: boolean;
};

export const TextSection = ({
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

      <TextRevealWrapper>
        <StyledText tag={'p'} content={description} />
      </TextRevealWrapper>

      <StyledSpace medium vertical />

      <FadeInWrapper>
        <StyledButton content={buttonLabel} to={buttonLink} />
      </FadeInWrapper>
    </StyledSection>
  );
};
