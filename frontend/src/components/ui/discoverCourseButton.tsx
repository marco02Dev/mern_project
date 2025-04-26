import { FC, ReactElement, useRef } from "react";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { Link } from "react-router-dom";

type DiscoverCourseButtonProps = {
    courseId: string,
    title: string,
    imageUrl: string,
    price: string,
    category: string,
    details: {
        title: string,
        content: string
    }[],
    link: string
}

export const DiscoverCourseButton: FC<DiscoverCourseButtonProps> = ({
    courseId,
    title,
    imageUrl,
    price,
    category,
    details,
    link
}: DiscoverCourseButtonProps): ReactElement => {
    const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);

    const handleDiscoverButtonClick: Function = () => {
        if (hiddenLinkRef.current) {
          hiddenLinkRef.current.click();
        }
    };

    return <FadeInWrapper>
        <StyledButton unsetShadow content={"Discover"} action={handleDiscoverButtonClick} />
        <Link ref={hiddenLinkRef} state={{ courseId, title, imageUrl, price, category, details }} to={link} style={{ display: 'none' }}> </Link>
    </FadeInWrapper>
}