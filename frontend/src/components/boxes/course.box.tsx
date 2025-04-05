import { ReactElement } from "react";
import styled from "styled-components";
import { StyledText } from "../../styles/styled-text";
import { StyledSpace } from "../../styles/styled-space";
import { StyledButton } from "../../styles/styled-button";
import { sizes } from "../../config/sizes.config";

const CourseWrapper = styled.li<{$smallSpace: string}>`
    display: flex;
    flex-direction: column;
    width: 50%;
    div {
        padding-left: ${({$smallSpace}) => $smallSpace};
        padding-right: ${({$smallSpace}) => $smallSpace};
    }
`;

export type CourseBoxProps = {
    title: string,
    price: string,
    imageUrl: string,
    link: string,
    courseId: string
}

export const CourseBox = ({title, price, imageUrl, link, courseId}: CourseBoxProps): ReactElement => {
    return <CourseWrapper key={courseId} $smallSpace={sizes.spaces.small}>
        <div>
            <img src={imageUrl} alt={title} width={150}/>
            <StyledText tag="h4" content={price}/>
            <StyledText tag="h5" content={title}/>
            <StyledSpace small vertical />
            <StyledButton content={"Discover"} to={link}/>
        </div>
    </CourseWrapper>
}