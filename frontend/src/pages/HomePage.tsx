import { ReactElement } from "react";
import { TextImageSection } from "../components/sections/TextImageSection";
import { TwoProductPreviewSection } from "../components/sections/TwoProductPreviewSection";
import { TextSection } from "../components/sections/TextSection";
import { BrowseSection } from "../components/sections/browseSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

export const HomePage = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <TextImageSection
            eyebrowText="Learn. Grow. Succeed."
            title="Your Future Starts Here"
            description="Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!"
            buttonLabel="Sign in"
            buttonLink="/signin"
            imageSrc={`${imagesEndpoint}/pages/homepage/text-image-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <TwoProductPreviewSection
            title="Latest courses"
            latest
        />
        
        <TextSection
            title="Master Your Skills Today!"
            description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
            buttonLabel="See all courses"
            buttonLink="/courses"
            secondaryColor
        />

        <BrowseSection />
    </>

}