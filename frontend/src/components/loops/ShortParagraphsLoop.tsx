import { FC, ReactElement, Fragment } from "react";
import { ContentSection } from "../sections/TextImageSection";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";

type ShortParagraphsLoopProps = {
    contentSections: ContentSection[]
}

export const ShortParagraphsLoop: FC<ShortParagraphsLoopProps> = ({contentSections}: ShortParagraphsLoopProps): ReactElement => {
    
    return <>
        {
            contentSections.map((element: ContentSection, index): ReactElement => {

                const { title, content }: ContentSection = element;

                return <Fragment key={index}>
                    <div>
                        <TextRevealWrapper left>
                            <StyledText tag="h3" size="h4" content={title}/>
                        </TextRevealWrapper>

                        <TextRevealWrapper>
                            <StyledText tag="p" smallParagraph content={content}/>
                        </TextRevealWrapper>
                        <StyledSpace medium vertical />
                    </div>
                </ Fragment>
            })
        }
    </>
}