import { ReactElement } from "react";
import { FormSection } from "../components/sections/FormSection";
import { TextImageSection } from "../components/sections/TextImageSection";
import { TextSection } from "../components/sections/TextSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

export const ContactPage = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <TextImageSection
            eyebrowText="Get in Touch"
            title="We're Here to Help"
            description="Have questions, feedback, or just want to say hello? Our team is ready to assist you. Reach out through our contact form, email, or social channels — we’d love to hear from you!"
            imageSrc={`${imagesEndpoint}/pages/courses/text-image-section.webp`}
            imageAlt="Person typing on a laptop with a contact form on screen"
            secondaryColor
        />

        <FormSection 
            title={"Contact us"} 
            fields={[
                "name",
                "email"
            ]}
            textArea={"message"}
            imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
        />

        <TextSection
            title="Master Your Skills Today!"
            description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in now to begin your learning journey with us!"
            buttonLabel="Log In Now"
            buttonLink="/login"
        />
    </>
}