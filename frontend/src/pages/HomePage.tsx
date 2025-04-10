import { ReactElement, FC } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { SmallProductsPreviewSection } from "../components/sections/SmallProductPreviewSection";
import { TextSection } from "../components/sections/TextSection";
import { BrowseSection } from "../components/sections/browseSection";
import { endpoints, Endpoints } from "../config/endpoints.config";
import { TextImageSection } from "../components/sections/textImageSection";

export const HomePage: FC = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <HeroSection
            eyebrowText="Learn. Grow. Succeed."
            title="Your Future Starts Here"
            description="Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!"
            buttonLabel="Sign in"
            buttonLink="/signin"
            imageSrc={`${imagesEndpoint}/pages/homepage/text-image-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <SmallProductsPreviewSection
            title="Latest courses"
            all
            threeBoxes
            latest
        />

        <TextImageSection 
            img={`${imagesEndpoint}/pages/homepage/text-image-section.webp`} 
            secondaryColor
            title={"Why choose us?"}
            contentSections={[
                {
                    title: "Minimalist Design",
                    content: "Experience a clean, clutter-free layout that makes navigation effortless."
                },
                {
                    title: "Tailored Solutions",
                    content: "We adapt to your specific needs, offering custom experiences that truly fit."
                },
                {
                    title: "Reliable Support",
                    content: "Count on our team to be there when you need us most — fast, friendly, and efficient."
                }
            ]}
        />

        <BrowseSection 
            title="Browse all categories"
            categories
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