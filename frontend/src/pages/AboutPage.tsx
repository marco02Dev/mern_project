import { ReactElement } from "react"
import { TextImageSection } from "../components/sections/TextImageSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

export const AboutPage = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <TextImageSection
            eyebrowText="Innovate. Build. Achieve."
            title="Welcome to My Portfolio"
            description="This is a portfolio website built using the MERN stack: MongoDB, Express.js, React.js, and Node.js."
            imageSrc={`${imagesEndpoint}/pages/about/text-image-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />
    </>
}