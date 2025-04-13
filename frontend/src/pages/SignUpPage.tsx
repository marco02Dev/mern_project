import { ReactElement } from "react";
import { FormSection } from "../components/sections/FormSection";
import { HeroSection } from "../components/sections/HeroSection";
import { TextSection } from "../components/sections/TextSection";
import { endpoints } from "../config/endpoints.config";

export const SignUpPage = (): ReactElement => {
    return <>

        <HeroSection
            eyebrowText="Learn. Grow. Succeed."
            title="Be Part of Our Community"
            description="Already have an account?"
            buttonLabel="Log in now!"
            buttonLink="/login"
            imageSrc={`${endpoints.imagesEndpoint}/pages/homepage/text-image-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <FormSection 
            title={"Create an Account"} 
            service="sign-up"
            fields={[
                "name",
                "surname",
                "email",
                "password"
            ]}
            imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
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