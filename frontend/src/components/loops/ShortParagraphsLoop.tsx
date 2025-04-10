import { FC, ReactElement, Fragment } from "react";
import { ContentSection } from "../sections/textImageSection";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";

type ShortParagraphsLoopProps = {
    contentSections: ContentSection[]
}

export const ShortParagraphsLoop: FC<ShortParagraphsLoopProps> = ({contentSections}: ShortParagraphsLoopProps): ReactElement => {
    return <>
        {
            contentSections.map((element: ContentSection, index): ReactElement => {

                const { title, content }: ContentSection = element;

                return <Fragment key={index}>
                    <StyledText tag="h3" content={title}/>
                    <StyledSpace small vertical />
                    <StyledText tag="p" content={content}/>
                </ Fragment>
            })
        }
    </>
}