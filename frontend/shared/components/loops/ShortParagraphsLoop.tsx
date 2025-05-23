import { FC, ReactElement, Fragment } from "react";
import { ContentSection } from "../sections/TextImageSection";
import { StyledText } from "@shared/components/themed/StyledText";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";

type ShortParagraphsLoopProps = {
    contentSections: ContentSection[],
    startDelay: string,
    oneParagraph?: boolean
}

export const ShortParagraphsLoop: FC<ShortParagraphsLoopProps> = ({
    contentSections, 
    startDelay,
    oneParagraph
}: ShortParagraphsLoopProps): ReactElement => {
    let incrementalATitleDelay: string = startDelay ? sumStringDelays(startDelay, "200ms") : "200ms";
    let incrementalParagraphDelay: string = startDelay ? sumStringDelays(startDelay, "400ms") : "400ms";

    return <>
        {
            contentSections.map((element: ContentSection, index): ReactElement => {

                if(index >= 1) {
                    incrementalATitleDelay = sumStringDelays(incrementalATitleDelay, "400ms");
                    incrementalParagraphDelay = sumStringDelays(incrementalATitleDelay, "400ms")
                } 
    
                const { title, content }: ContentSection = element;

                return <Fragment key={index}>
                    <div>
                        <TextRevealWrapper left delay={incrementalATitleDelay}>
                            <StyledText tag="h3" size="h4" content={title}/>
                        </TextRevealWrapper>

                        {oneParagraph && <StyledSpace verySmall vertical />}
                      

                        <TextRevealWrapper delay={incrementalParagraphDelay}>
                            <StyledText tag="p" smallParagraph content={content}/>
                        </TextRevealWrapper>
                        <StyledSpace medium vertical />
                    </div>
                </ Fragment>
            })
        }
    </>
}