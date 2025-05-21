import { sizes } from "@shared/config/sizes.config";
import { FontSizes } from "@shared/config/sizes.config";

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
    let fontSize: string = sizes.fontSizes.paragraph.medium;
    let autoLineHeight: string = sizes.lineHeights.paragraph.medium;

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
    } else if (value === "button") {
        fontSize = sizes.fontSizes.button.medium;
        autoLineHeight = sizes.lineHeights.button.medium;
    } else {
        fontSize = sizes.fontSizes[value as Exclude<keyof FontSizes, "paragraph" | "button">] ?? fontSize;
        autoLineHeight = sizes.lineHeights[value as Exclude<keyof FontSizes, "paragraph" | "button">] ?? autoLineHeight;
    }

    return {
        fontSize: fontSize,
        autoLineHeight: autoLineHeight
    }
};