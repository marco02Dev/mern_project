import { ReactElement } from "react"
import { HeroSection } from "../components/sections/HeroSection";
import { TextSection } from "../components/sections/TextSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

export const AboutPage = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <HeroSection
            eyebrowText="Innovate. Build. Achieve."
            title="Welcome to My Portfolio"
            description="This is a portfolio website built using the MERN stack: MongoDB, Express.js, React.js, and Node.js."
            imageSrc={`${imagesEndpoint}/pages/about/text-image-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <HeroSection
            title="Discover the Project"
            description="Learn more about our mission, values, and the team behind the platform. We are committed to empowering individuals through accessible, high-quality education."
            buttonLabel="Our Mission"
            buttonLink="/about"
            imageSrc={`${imagesEndpoint}/pages/homepage/text-image-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            borderedImage
            imageLeft
        />

        <TextSection
            title="Master Your Skills Today!"
            description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
            buttonLabel="See all courses"
            buttonLink="/courses"
        />
    </>
}