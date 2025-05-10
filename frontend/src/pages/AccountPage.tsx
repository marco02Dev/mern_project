import { FC, ReactElement } from "react";
import { UseAuth, useAuth } from "../hooks/auth/useAuth";
import { HeroSection } from "../components/sections/HeroSection";
import { capitalizeFirstLetter } from "../utils/common/capitalize-first-letter.util";
import { LogInPage } from "./LogInPage";
import { LargeProductsPreviewSection } from "../components/sections/LargeProductsPreviewSection";
import { TextSection } from "../components/sections/TextSection";
import { logOutService } from "../services/log-out.service";

export const AccountPage: FC = (): ReactElement => {
    const { isLoggedIn, userData }: UseAuth = useAuth();

    if( userData && isLoggedIn) {
        return <>
            <HeroSection
                eyebrowText="Learn. Grow. Succeed."
                title={`Welcome back ${capitalizeFirstLetter(userData.name)}`}
                description="Access your enrolled courses and continue your learning journey today!"
                buttonLabel="Logout"
                buttonAction={logOutService}
                imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746891011/hero-section_ojpzde.webp`}
                imageAlt="Minimalist desk setup with monitor and coding posters"
                secondaryColor
            />

            <LargeProductsPreviewSection
                limit={4}
            />

            <TextSection
                title="Master Your Skills Today!"
                description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
                buttonLabel="See all courses"
                buttonLink="/courses"
                secondaryColor
            />
        </>
    } else {
        return <LogInPage />
    }
}
