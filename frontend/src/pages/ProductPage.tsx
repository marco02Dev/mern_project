import { FC, ReactElement } from "react";
import { useLocation, Location } from "react-router-dom";
import { HeroSection } from "../components/sections/HeroSection";
import { TextSection } from "../components/sections/TextSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

type ProductData = {
    title: string,
    price: string,
    courseId: string,
    category: string
}

export const Productpage: FC = (): ReactElement => {
    const { imagesEndpoint }: Endpoints = endpoints
    const location: Location = useLocation();
    const { title, price, courseId, category }: ProductData = location.state;

    const heroImage: string = `${imagesEndpoint}/products/${category}/${courseId}/hero-image.webp`;

    return <>
        <HeroSection
            eyebrowText={price}
            title={title}
            description="Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!"
            buttonLabel="Enroll now"
            buttonLink="/signin"
            imageSrc={heroImage}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />


        <TextSection
            title="Master Your Skills Today!"
            description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
            buttonLabel="See all courses"
            buttonLink="/courses"
        />
    
    </>
}