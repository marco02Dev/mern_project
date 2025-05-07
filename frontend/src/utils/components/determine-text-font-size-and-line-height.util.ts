import { sizes } from "../../config/sizes.config";

type DetermineTextFontSizeAndLineHeightData = {
    tag: string,
    size: string,
    smallParagraph?: boolean,
    largeParagraph?: boolean,
    verySmallParagraph?: boolean
}

export type StyledTextSizes = {
    fontSize: string,
    autoLineHeight: string
}

export const determineTextFontSizeAndLineHeight = ({ 
    tag, 
    size,
    smallParagraph,
    largeParagraph,
    verySmallParagraph
}: DetermineTextFontSizeAndLineHeightData): StyledTextSizes => {
    const value: string = size ?? tag;
    let fontSize: any = sizes.fontSizes.paragraph.medium;
    let autoLineHeight: any = sizes.lineHeights.paragraph.medium;

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

    return {
        fontSize: fontSize,
        autoLineHeight: autoLineHeight
    }
};