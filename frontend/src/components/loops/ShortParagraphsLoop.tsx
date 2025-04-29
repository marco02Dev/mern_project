import { FC, ReactElement, Fragment } from "react";
import { ContentSection } from "../sections/TextImageSection";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";

type ShortParagraphsLoopProps = {
    contentSections: ContentSection[],
    startDelay: string
}

export const ShortParagraphsLoop: FC<ShortParagraphsLoopProps> = ({contentSections, startDelay}: ShortParagraphsLoopProps): ReactElement => {
    let incrementalATitleDelay: string = startDelay ? sumStringDelays(startDelay, "200ms") : "200ms";
    let incrementalParagraphDelay: string;

    return <>
        {
            contentSections.map((element: ContentSection, index): ReactElement => {

                if(index = 1) {
                    incrementalATitleDelay = sumStringDelays(incrementalATitleDelay, "400ms");
                    incrementalParagraphDelay = sumStringDelays(incrementalATitleDelay, "400ms")
                } else if(index >= 1) {
                    incrementalATitleDelay = sumStringDelays(incrementalATitleDelay, incrementalParagraphDelay, "400ms");
                    incrementalParagraphDelay = sumStringDelays(incrementalATitleDelay, "400ms");
                }
    
                const { title, content }: ContentSection = element;

                return <Fragment key={index}>
                    <div>
                        <TextRevealWrapper left delay={incrementalATitleDelay}>
                            <StyledText tag="h3" size="h4" content={title}/>
                        </TextRevealWrapper>

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