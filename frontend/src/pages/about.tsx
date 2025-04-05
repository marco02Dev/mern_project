import { ReactElement } from "react"
import { TextImageSection } from "../components/sections/text-image-section";
import { TextSection } from "../components/sections/text-section";
import { LatestCoursesSection } from "../components/sections/latest-courses-section";
import { BrowseCategoriesSection } from "../components/sections/browse-categories-section";
import TextImageSectionImage from "./../images/webp/signin-section.webp"

export const About = (): ReactElement => {
    return <>
        <TextImageSection
            eyebrowText="Innovate. Build. Achieve."
            title="Welcome to My Portfolio"
            description="This is a portfolio website built using modern web technologies. It leverages the MERN stack, including React.js, TypeScript, Styled Components, Redux, Node.js, and Express.js, to create dynamic and responsive user experiences. Explore my work and get inspired!"
            imageSrc={TextImageSectionImage}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />
        <LatestCoursesSection />
        
        <TextSection
            title="Master Your Skills Today!"
            description="Join our exclusive courses designed to elevate your expertise. Login or Sign Up to start your adventure in learning!"
            buttonLabel="See all courses"
            buttonLink="/courses"
        />
        <BrowseCategoriesSection />
    </>
}