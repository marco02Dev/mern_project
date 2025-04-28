import { categories } from "../../config/categories.config";
import { StyledLink } from "../themed/StyledLink";
import { capitalizeFirstLetter } from "../../utils/common/capitalize-first-letter.util";
import { FC, ReactElement, SetStateAction, Dispatch, useContext } from "react";
import styled from "styled-components";
import { StyledSpace } from "../themed/StyledSpace";
import { ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { useUnsetActiveColor } from "../../hooks/useUnsetActiveColor";

const Wrapper = styled.nav`
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
    const { mode } = useContext(ThemeModeContext);
    const isActiveColor = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
    
    const { unsetActiveColor, handleMouseHover, handleMouseLeave } = useUnsetActiveColor();

    return (
        <Wrapper>
            <div className="all">
                <div
                    onMouseOver={handleMouseHover}
                    onMouseLeave={handleMouseLeave}
                    className={categoryFilter === "" ? "is-active" : "is-not-active"}
                >
                    <StyledLink 
                        content="All" 
                        color={categoryFilter === "" && !unsetActiveColor ? isActiveColor : ""}
                        inactive={categoryFilter === ""}
                        onClickFunction={(event) => {
                            event.preventDefault();
                            setCategoryFilter("");
                        }}
                    />
                </div>
            </div>

            <div className="categories">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onMouseOver={handleMouseHover}
                        onMouseLeave={handleMouseLeave}
                        className={categoryFilter === category ? "is-active" : "is-not-active"}
                    >
                        <StyledLink
                            inactive={categoryFilter === category}
                            color={categoryFilter === category && !unsetActiveColor ? isActiveColor : ""}
                            content={capitalizeFirstLetter(category)}
                            onClickFunction={(event) => {
                                event.preventDefault();
                                setCategoryFilter(category);
                            }}
                        />
                        <StyledSpace small horizontal />
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}