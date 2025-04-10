import { FC } from "react";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { HeroSection } from "../components/sections/HeroSection";
import { endpoints } from "../config/endpoints.config";
import { capitalizeFirstLetter } from "../utils/capitalize-first-letter.util";
import { LogInPage } from "./LogInPage";

export const AccountPage: FC = (): ReactElement => {

    const login = useSelector((state: RootState) => state.login);
    const { user, isLoggedIn } = login;

    if( user && isLoggedIn) {
        const { name }: {name: string} = user;

        return <>
            <HeroSection
                eyebrowText="Learn. Grow. Succeed."
                title={`Welcome back ${capitalizeFirstLetter(name)}`}
                description="Access your enrolled courses and continue your learning journey today!"
                buttonLabel="Go to My Courses"
                buttonLink="/my-courses"
                imageSrc={`${endpoints.imagesEndpoint}/pages/homepage/hero-section.webp`}
                imageAlt="Minimalist desk setup with monitor and coding posters"
                secondaryColor
            />
        </>
    } else {
        return <LogInPage />
    }
}
