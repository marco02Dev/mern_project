import { FC } from "react";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { HeroSection } from "../components/sections/HeroSection";
import { capitalizeFirstLetter } from "../utils/common/capitalize-first-letter.util";
import { LogInPage } from "../pages/LogInPage";
import { LargeProductsPreviewSection } from "../components/sections/LargeProductsPreviewSection";
import { TextSection } from "../components/sections/TextSection";
import { logOutService } from "../services/log-out.service";
import { UpdateProductFormContextProvider } from "../contexts/UpdateProductFormProvider";

export const AdminPage: FC = (): ReactElement => {
    const login = useSelector((state: RootState) => state.login);
    const { user, isLoggedIn } = login;

    if( user && isLoggedIn) {
        const { name }: {name: string} = user;

        return <>
            <HeroSection
                eyebrowText="Learn. Grow. Succeed."
                title={`Welcome back ${capitalizeFirstLetter(name)}`}
                description="Access your enrolled courses and continue your learning journey today!"
                buttonLabel="Logout"
                buttonAction={logOutService}
                imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746271424/hero_image_a2zl2l.webp`}
                imageAlt="Minimalist desk setup with monitor and coding posters"
                secondaryColor
            />

            <UpdateProductFormContextProvider>
                <LargeProductsPreviewSection
                    limit={6}
                    createProducts
                    latest
                />
            </UpdateProductFormContextProvider>


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