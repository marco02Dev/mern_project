import { ReactElement, useContext, JSX } from "react";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { AllowedTextTags } from "../config/styled-text.config";
import { defaultTextTag } from "../config/styled-text.config";
import { colors } from "../config/colors.config";

const Text = styled.span<{ as?: keyof JSX.IntrinsicElements, $color: string }>`
    color: ${({$color}) => $color} 
`;

type StyledTextProps = {
    tag: AllowedTextTags,
    content: string
}

export const StyledText = ({ content, tag = defaultTextTag }: StyledTextProps): ReactElement => {
    const ThemeModeContextValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const { mode } = ThemeModeContextValue;
    const color = mode === "dark" ? colors.dark.textColor: colors.light.textColor; 

    return <Text as={tag} $color={color}>
        {content}
    </Text>
};
