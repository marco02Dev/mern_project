import { ReactElement } from "react";
import { FormSection } from "../components/sections/FormSection";
import { HeroSection } from "../components/sections/HeroSection";
import { TextSection } from "../components/sections/TextSection";
import { endpoints, Endpoints } from "../config/endpoints.config";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export const ContactPage = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;
    const login = useSelector((state: RootState) => state.login);
    const { isLoggedIn }: { isLoggedIn: boolean} = login;

    return <>
        <HeroSection
            eyebrowText="Get in Touch"
            title="We're Here to Help"
            description="Have questions, feedback, or just want to say hello? Our team is ready to assist you. Reach out through our contact form, email, or social channels — we’d love to hear from you!"
            imageSrc={`${imagesEndpoint}/pages/contact/hero-image.webp`}
            imageAlt="Person typing on a laptop with a contact form on screen"
            secondaryColor
        />

        <FormSection 
            title={"Contact us"} 
            service="send-email"
            fields={[
                "name",
                "email"
            ]}
            textArea={"message"}
            imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
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