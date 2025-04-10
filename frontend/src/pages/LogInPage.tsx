import { ReactElement } from "react";
import { TextSection } from "../components/sections/TextSection";
import { endpoints } from "../config/endpoints.config";
import { FormSection } from "../components/sections/FormSection";
import { HeroSection } from "../components/sections/HeroSection";

export const LogInPage = (): ReactElement => {
    return <>
        <HeroSection
            eyebrowText="Learn. Grow. Succeed."
            title="Your Journey Begins Now"
            description="Don't have an account?"
            buttonLabel="Signup now!"
            buttonLink="/signup"
            imageSrc={`${endpoints.imagesEndpoint}/pages/login/hero-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <FormSection 
            title={"Welcome back!"} 
            fields={[
                "name",
                "surname",
                "email",
                "password"
            ]}
            imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
            alternativeLinkDescription="Don’t have an account?"
            alternativeLink="/signup"
            alternativeTextLink="Sign up"
            service="login"
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