import { FC, MouseEventHandler, ReactElement, useRef } from "react";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { Link } from "react-router-dom";
import { Course } from "@shared/types/course.types";

type DiscoverCourseButtonProps = Course & {
    link: string,
    delay?: string
}

export const DiscoverCourseButton: FC<DiscoverCourseButtonProps> = ({
    courseId,
    title,
    imageUrl,
    price,
    category,
    details,
    link,
    delay,
    heroImage
}: DiscoverCourseButtonProps): ReactElement => {
    const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);
    const handleDiscoverButtonClick: MouseEventHandler = () => {
        if (hiddenLinkRef.current) {
          hiddenLinkRef.current.click();
        }
    };

    const productData: Course = {
        courseId: courseId ? courseId : "",
        title: title ? title : "",
        imageUrl: imageUrl ? imageUrl : "",
        price: price,
        category: category,
        details: details,
        heroImage: heroImage
    };

    return <FadeInWrapper delay={delay}>
        <StyledButton unsetShadow content={"Discover"} action={handleDiscoverButtonClick} />
        <Link ref={hiddenLinkRef} state={productData} to={link} style={{ display: 'none' }}> </Link>
    </FadeInWrapper>
}