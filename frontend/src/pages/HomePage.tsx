import { ReactElement, FC } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { SmallProductsPreviewSection } from "../components/sections/SmallProductPreviewSection";
import { TextSection } from "../components/sections/TextSection";
import { BrowseSection } from "../components/sections/browseSection";
import { endpoints, Endpoints } from "../config/endpoints.config";
import { TextImageSection } from "../components/sections/TextImageSection";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../types/user.types";
import { capitalizeFirstLetter } from "../utils/capitalize-first-letter.util";

export const HomePage: FC = (): ReactElement => {
    const login = useSelector((state: RootState) => state.login);
    const { isLoggedIn }: { isLoggedIn: boolean } = login;
    
    const name: string = (login?.user as User)?.name ?? "";
    const { imagesEndpoint }: Endpoints = endpoints;

    return <>
        <HeroSection
            eyebrowText="Learn. Grow. Succeed."
            title={
                isLoggedIn && name
                    ? `Welcome back ${capitalizeFirstLetter(name)}`
                    : "Your Future Starts Here"
            }
            description={
                isLoggedIn
                    ? "Continue your learning journey and explore new opportunities tailored just for you."
                    : "Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!"
            }
            buttonLabel={isLoggedIn ? "Go to account" : "Login"}
            buttonLink={isLoggedIn ? "/account" : "/login"}
            imageSrc={`${imagesEndpoint}/pages/homepage/hero-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <SmallProductsPreviewSection
            title={isLoggedIn ? "Your courses" : "Latest Courses"}
            userProductsPurchased={isLoggedIn}
            latest={!isLoggedIn}
        />

        <TextImageSection 
            img={`${imagesEndpoint}/pages/homepage/text-image-section.webp`} 
            secondaryColor
            title={"Why choose us?"}
            contentSections={[
                {
                    title: "Minimalist Design",
                    content: "Experience a clean, clutter-free layout."
                },
                {
                    title: "Tailored Solutions",
                    content: "We adapt to your specific needs,"
                },
                {
                    title: "Reliable Support",
                    content: "Count on our team to be there when you need us most"
                }
            ]}
        />

        <BrowseSection 
            title="Learn all"
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