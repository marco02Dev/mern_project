import { ReactElement, FC } from "react";
import { HeroSection } from "@shared/components/sections/HeroSection";
import { TextSection } from "@shared/components/sections/TextSection";
import { SignUpForm } from "@shared/components/forms/SignUpForm";

export const SignUpPage: FC = (): ReactElement => {
    return <>

        <HeroSection
            eyebrowText="Learn. Grow. Succeed."
            title="Be Part of Our Community"
            description="Already have an account?"
            buttonLabel="Log in now!"
            buttonLink="/login"
            imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746269695/hero-section_imgswt.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <SignUpForm 
            imgSrc="https://res.cloudinary.com/dqwoo44z8/image/upload/v1746269820/hero_section_tl9skq.webp"
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