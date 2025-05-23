import { ReactElement } from "react";
import { UseAuth, useAuth } from "@shared/hooks/auth/useAuth";
import { HeroSection } from "@shared/components/sections/HeroSection";
import { ContactForm } from "@client/components/forms/ContactForm";
import { TextSection } from "@shared/components/sections/TextSection";

export const ContactPage = (): ReactElement => {
    const { isLoggedIn }: UseAuth = useAuth()

    return <>
        <HeroSection
            eyebrowText="Get in Touch"
            title="We're Here to Help"
            description="Have questions, feedback, or just want to say hello? Our team is ready to assist you. Reach out through our contact form, email, or social channels — we’d love to hear from you!"
            imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268753/hero-image_qu7biy.webp`}
            imageAlt="Person typing on a laptop with a contact form on screen"
            secondaryColor
        />

        <ContactForm 
            imgSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268885/form-section_x7suz7.webp`}
        />

        <TextSection
            title="Master Your Skills Today!"
            description={
                isLoggedIn
                    ? "Explore your enrolled courses and visit your account page to continue learning!"
                    : "Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in now to begin your learning journey with us!"
            }
            buttonLabel={isLoggedIn ? "Go to Your Account" : "Log In Now"}
            buttonLink={isLoggedIn ? "/account" : "/login"}
            secondaryColor
        />
    </>
}