import { ReactElement, useContext, JSX } from "react";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { AllowedTextTags } from "../../config/styled-text.config";
import { defaultTextTag } from "../../config/styled-text.config";
import { colors } from "../../config/colors.config";
import { sizes } from "../../config/sizes.config";
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
    const ThemeModeContextValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const { mode } = ThemeModeContextValue;

    let colorMode = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    if (color) colorMode = color;

    let fontSize: any = sizes.fontSizes.paragraph.medium;
    let autoLineHeight: any = sizes.lineHeights.paragraph.medium;

    const determineFontSizeAndLineHeight = ({ tag, size }: { tag: string, size?: string }): void => {
        const value: string = size ?? tag;

        if (value === "p") {
            if (smallParagraph) {
                fontSize = sizes.fontSizes.paragraph.small ?? fontSize;
                autoLineHeight = sizes.lineHeights.paragraph.small ?? autoLineHeight;
            } else if (largeParagraph) {
                fontSize = sizes.fontSizes.paragraph.large ?? fontSize;
                autoLineHeight = sizes.lineHeights.paragraph.large ?? autoLineHeight;
            } else if (verySmallParagraph) {
                fontSize = sizes.fontSizes.paragraph.verySmall ?? fontSize;
                autoLineHeight = sizes.lineHeights.paragraph.verySmall ?? autoLineHeight;
            } else {
                fontSize = sizes.fontSizes.paragraph.medium;
                autoLineHeight = sizes.lineHeights.paragraph.medium;
            }
        } else {
            fontSize = sizes.fontSizes[value as keyof typeof sizes.fontSizes] ?? fontSize;
            autoLineHeight = sizes.lineHeights[value as keyof typeof sizes.lineHeights] ?? autoLineHeight;
        }
    };

    determineFontSizeAndLineHeight({ tag, size });

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
