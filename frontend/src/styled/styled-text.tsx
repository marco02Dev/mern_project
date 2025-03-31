import { ReactElement, useContext, JSX } from "react";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { AllowedTextTags } from "../config/styled-text.config";
import { defaultTextTag } from "../config/styled-text.config";
import { colors } from "../config/colors.config";
import { sizes } from "../config/sizes.config";

type TextProps = {
    as?: keyof JSX.IntrinsicElements;
    $color: string;
    $fontSize: string;
    $fontWeight?: string
}

const Text = styled.span<TextProps>`
    color: ${({ $color }) => $color};
    font-size: ${({ $fontSize }) => $fontSize};
    font-weight: ${({ $fontWeight}) => $fontWeight ? $fontWeight : "400"}
`;

type StyledTextProps = {
    tag: AllowedTextTags;
    content: string;
    fontWeight?: string
    size?: string;
    smallParagraph?: boolean;
    largeParagraph?: boolean;
};

export const StyledText = ({
    content,
    tag = defaultTextTag,
    smallParagraph,
    largeParagraph,
    size,
    fontWeight
}: StyledTextProps): ReactElement => {
    const ThemeModeContextValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const { mode } = ThemeModeContextValue;
    const color = mode === "dark" ? colors.dark.textColor : colors.light.textColor;

    let fontSize: string = sizes.fontSizes.p?.medium;

    const determineFontSize = ({tag, size}: {tag: string, size?: string}): void => {

        const value: string = size ? size : tag;

        if (value === "p") {
            if (smallParagraph) {
                fontSize = sizes.fontSizes.p?.small ?? sizes.fontSizes.p?.medium;
            } else if (largeParagraph) {
                fontSize = sizes.fontSizes.p?.large ?? sizes.fontSizes.p?.medium;
            } else {
                fontSize = sizes.fontSizes.p?.medium;
            }
        } else {
            const tagFontSize = sizes.fontSizes[value as keyof typeof sizes.fontSizes];
            fontSize = typeof tagFontSize === "string" ? tagFontSize : sizes.fontSizes.p.medium;
        }
    }

    determineFontSize({tag: tag, size: size});


    return (
        <Text as={tag} $color={color} $fontSize={fontSize} $fontWeight={fontWeight}>
            {content}
        </Text>
    );
};
