import { ReactElement } from "react"
import { TextImageSection } from "../components/sections/TextImageSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

export const About = (): ReactElement => {

    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <TextImageSection
            eyebrowText="Innovate. Build. Achieve."
            title="Welcome to My Portfolio"
            description="This is a portfolio website built using modern web technologies. It leverages the MERN stack, including React.js, TypeScript, Styled Components, Redux, Node.js, and Express.js, to create dynamic and responsive user experiences. Explore my work and get inspired!"
            imageSrc={`${imagesEndpoint}/pages/about/text-image-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />
    </>
}