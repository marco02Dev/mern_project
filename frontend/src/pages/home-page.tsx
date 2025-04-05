import { ReactElement } from "react";
import { TextImageSection } from "../components/sections/text-image-section";
import { LatestCoursesSection } from "../components/sections/latest-courses-section";
import { TextSection } from "../components/sections/text-section";
import { BrowseCategoriesSection } from "../components/sections/browse-categories-section";
import TextImageSectionImage from "./../images/webp/signin-section.webp"

export const HomePage = (): ReactElement => {
    return <>
        <TextImageSection
            eyebrowText="Learn. Grow. Succeed."
            title="Your Future Starts Here"
            description="Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!"
            buttonLabel="Sign in"
            buttonLink="/signin"
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
            secondaryColor
        />
        <BrowseCategoriesSection />
    </>

}