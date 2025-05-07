import { ReactElement, JSX } from "react";
import styled from "styled-components";
import { determineTextFontSizeAndLineHeight, StyledTextSizes } from "../../utils/components/determine-text-font-size-and-line-height.util";
import { ThemeColors, useThemeColors } from "../../hooks/theme/useThemeColors";
import { AllowedTextTags } from "../../config/styled-text.config";
import { defaultTextTag } from "../../config/styled-text.config";
import { FC } from "react";

type TextProps = {
    as?: keyof JSX.IntrinsicElements;
    $color: string;
    $fontSize: string;
    $fontWeight?: string;
    $minWidth?: string;
    $lineHeight: string;
}

const Text = styled.span<TextProps>`
    color: ${({ $color }) => $color};
    font-size: ${({ $fontSize }) => $fontSize};
    font-weight: ${({ $fontWeight }) => $fontWeight ?? "400"};
    line-height: ${({ $lineHeight }) => $lineHeight};
    min-width: ${({ $minWidth }) => $minWidth ? $minWidth : "unset"};
`;

type StyledTextProps = {
    tag: AllowedTextTags;
    content: string;
    fontWeight?: string;
    size?: string;
    smallParagraph?: boolean;
    largeParagraph?: boolean;
    verySmallParagraph?: boolean;
    minWidth?: string;
    lineHeight?: string;
    color?: string;
};

export const StyledText: FC<StyledTextProps> = ({
    content,
    tag = defaultTextTag,
    smallParagraph,
    largeParagraph,
    verySmallParagraph,
    size,
    fontWeight,
    minWidth,
    lineHeight,
    color
}: StyledTextProps): ReactElement => {
    const { textColor }: ThemeColors = useThemeColors();
    let colorMode = textColor;
    if (color) colorMode = color;

    const { fontSize, autoLineHeight}: StyledTextSizes = determineTextFontSizeAndLineHeight({
        tag: tag,
        size: size,
        smallParagraph: smallParagraph,
        largeParagraph: largeParagraph,
        verySmallParagraph: verySmallParagraph
    });

    const resolvedLineHeight = lineHeight ?? autoLineHeight;

    return (
        <Text
            as={tag}
            $color={colorMode}
            $fontSize={fontSize}
            $fontWeight={fontWeight}
            $minWidth={minWidth}
            $lineHeight={resolvedLineHeight}
        >
            {content}
        </Text>
    );
};
