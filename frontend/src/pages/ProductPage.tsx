import { FC, ReactElement } from "react";
import { useLocation, Location } from "react-router-dom";
import { HeroSection } from "../components/sections/HeroSection";
import { TextSection } from "../components/sections/TextSection";
import { TextImageSection } from "../components/sections/TextImageSection";
import { Course } from "../types/course.types";
import { NotFoundPage } from "./NotFoundPage";

export const Productpage: FC = (): ReactElement => {
    const location: Location = useLocation();
    const { title, price, courseId, category, details, imageUrl, heroImage }: Course = location.state;

    if( title && price && courseId && category && details && typeof price === "string" ) {
        return <>
            <HeroSection
                eyebrowText={price}
                title={title}
                description="Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!"
                buttonLabel="Enroll now"
                buttonLink="/login"
                imageSrc={heroImage}
                imageAlt="Minimalist desk setup with monitor and coding posters"
                secondaryColor
            />

            { details.length > 0 && <TextImageSection 
                img={imageUrl} 
                title={"What will you learn?"}
                contentSections={details}
            /> }


            <TextSection
                title="Master Your Skills Today!"
                description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
                buttonLabel="See all courses"
                buttonLink="/courses"
                secondaryColor
            />
    
        </>
    } else {
        return <NotFoundPage />
    }

}