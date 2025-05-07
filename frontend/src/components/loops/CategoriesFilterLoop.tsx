import { categories } from "../../config/categories.config";
import { StyledLink } from "../themed/StyledLink";
import { capitalizeFirstLetter } from "../../utils/common/capitalize-first-letter.util";
import { FC, ReactElement, SetStateAction, Dispatch, useEffect } from "react";
import { ThemeColors, useThemeColors } from "../../hooks/theme/useThemeColors";
import styled from "styled-components";
import { StyledSpace } from "../themed/StyledSpace";
import { useUnsetActiveColor } from "../../hooks/ui/useUnsetActiveColor";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { useDispatch } from "react-redux";
import { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { setDataChanged } from "../../store/slices/courses-data-changed.slice";
import { useMediaQuery, UseMediaQuery } from "../../hooks/ui/useMediaQuery";

type WrapperProps = {
    $isMobile: boolean
}

const Wrapper = styled.nav<WrapperProps>`
    display: flex;
    flex-direction: row;
    width: 100%;

    .all {
        display: flex;
        flex-direction: row;
        width: 20%;
    }

    .categories {
        display: flex;
        flex-direction: row;
        width: 80%;
        justify-content: end;
    }
`;

type CategoriesFIlterProps = {
    setCategoryFilter: Dispatch<SetStateAction<string | undefined>>,
    categoryFilter: string | undefined
}

export const CategoriesFilterLoop: FC<CategoriesFIlterProps> = ({
    setCategoryFilter,
    categoryFilter
}: CategoriesFIlterProps): ReactElement => {
    const { hoverColor }: ThemeColors = useThemeColors();
    const { unsetActiveColor, handleMouseHover, handleMouseLeave } = useUnsetActiveColor();
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const dispatch: ReduxDispatch = useDispatch();
    let delay: string;


    useEffect(() => {
        if (categoryFilter) {
            dispatch(setDataChanged());
        }
    }, [categoryFilter, dispatch]);

    return (
        <Wrapper $isMobile={isMobile}>
            <div className="all">
                <FadeInWrapper>
                    <div
                        onMouseOver={handleMouseHover}
                        onMouseLeave={handleMouseLeave}
                        className={categoryFilter === "" ? "is-active" : "is-not-active"}
                    >
                        <StyledLink 
                            content="All" 
                            size={isMobile ? "h5" : "h6"}
                            color={categoryFilter === "" && !unsetActiveColor ? hoverColor : ""}
                            inactive={categoryFilter === ""}
                            onClickFunction={(event) => {
                                event.preventDefault();
                                setCategoryFilter("");
                            }}
                        />
                    </div>
                </FadeInWrapper>
            </div>

            <div className="categories">
                {categories.map((category, index) => {
                    
                    if(index > 0) {
                        delay = sumStringDelays(delay, "200ms");
                    }

                    return <FadeInWrapper key={index} delay={delay}>
                        <div
                            key={index}
                            onMouseOver={handleMouseHover}
                            onMouseLeave={handleMouseLeave}
                            className={categoryFilter === category ? "is-active" : "is-not-active"}
                        >
                            <StyledLink
                                size={isMobile ? "h5" : "h6"}
                                inactive={categoryFilter === category}
                                color={categoryFilter === category && !unsetActiveColor ? hoverColor : ""}
                                content={capitalizeFirstLetter(category)}
                                onClickFunction={(event) => {
                                    event.preventDefault();
                                    setCategoryFilter(category);
                                }}
                            />
                            <StyledSpace small horizontal />
                        </div>
                    </FadeInWrapper>
                })}
            </div>
        </Wrapper>
    );
}