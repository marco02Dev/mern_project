import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import { StyledSpace } from "../themed/StyledSpace";
import { FC } from "react";
import { StyledBox } from "../themed/StyledBox";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import whiteTick from"../../images/svg/tick-white.svg";
import blackTick from"../../images/svg/tick-black.svg";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

type CategoryBoxProps = {
    title: string,
    description: string,
    to: string,
    marginLeft?: string
}

export const CategoryBox: FC<CategoryBoxProps> = ({title, description, to}: CategoryBoxProps): ReactElement => {

    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

    return <StyledBox width="48%">
        <Wrapper>
            <div>
                <img width={"50px"} src={mode === 'dark' ? whiteTick : blackTick } alt="Checkmark icon" />
            </div>

            <div>
                <StyledSpace medium vertical/>
                <StyledText tag="h3" content={title} size="h6" />
                <StyledSpace small vertical />
                <StyledText tag="p" content={description} smallParagraph />
                <StyledSpace small vertical/>
                <StyledButton content="Discover now" to={to} headerElement/>
                <StyledSpace medium vertical/>
            </div>
        </Wrapper>
    </StyledBox>;
};