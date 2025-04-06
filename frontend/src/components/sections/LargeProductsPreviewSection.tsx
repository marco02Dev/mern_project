import { ReactElement } from "react";
import { CoursesLoop } from "../loops/CoursesLoop";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { sizes } from "../../config/sizes.config";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledSpace } from "../themed/StyledSpace";

type LargeProductsPreviewSectionProps = {
    title: string,
    category?: string,
    all?: boolean
}

export const LargeProductsPreviewSection = ({
    title
}: LargeProductsPreviewSectionProps): ReactElement => {
    return <StyledSection overflowVisible paddingLeft={sizes.spaces.small} paddingRight={sizes.spaces.small}>
        <StyledSpace medium vertical/>

        <TextRevealWrapper left>
            <StyledText tag="h2" content={title} size="h1" />
        </TextRevealWrapper>

        <StyledSpace medium vertical/>
        <CoursesLoop />
    </ StyledSection>

}