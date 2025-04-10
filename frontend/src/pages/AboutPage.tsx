import { ReactElement } from "react"
import { HeroSection } from "../components/sections/HeroSection";
import { TextSection } from "../components/sections/TextSection";
import { TextImageSection } from "../components/sections/textImageSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

export const AboutPage = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <HeroSection
            eyebrowText="Innovate. Build. Achieve."
            title="Welcome to My Portfolio"
            description="This is a portfolio website built using the MERN stack: MongoDB, Express.js, React.js, and Node.js."
            imageSrc={`${imagesEndpoint}/pages/about/hero-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <TextImageSection 
            img={`${imagesEndpoint}/pages/homepage/text-image-section.webp`} 
            title={"Why choose us?"}
            contentSections={[
                {
                    title: "Minimalist Design",
                    content: "Experience a clean, clutter-free layout."
                },
                {
                    title: "Tailored Solutions",
                    content: "We adapt to your specific needs,"
                },
                {
                    title: "Reliable Support",
                    content: "Count on our team to be there when you need us most"
                }
            ]}
        />

        <TextSection
            title="Master Your Skills Today!"
            description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
            buttonLabel="See all courses"
            buttonLink="/courses"
            secondaryColor
        />
    </>
}