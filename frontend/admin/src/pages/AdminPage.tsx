import { FC } from "react";
import { ReactElement } from "react";
import { HeroSection } from "@client/components/sections/HeroSection";
import { capitalizeFirstLetter } from "@client/utils/common/capitalize-first-letter.util";
import { LogInPage } from "@client/pages/LogInPage";
import { TextSection } from "@client/components/sections/TextSection";
import { logOutService } from "@client/services/log-out.service";
import { UpdateProductFormContextProvider } from "../contexts/UpdateProductFormProvider";
import { CreateProductFormContextProvider } from "../contexts/CreateProductFormContextProvider";
import { AdminProductManagementSection } from "../components/sections/ProductMenagementSection";
import { useAuth, UseAuth } from "@client/hooks/auth/useAuth";

export const AdminPage: FC = (): ReactElement => {
    const { isLoggedIn, userData, isAdmin }: UseAuth = useAuth();

    if( userData && isLoggedIn && isAdmin) {
        return <>
            <HeroSection
                eyebrowText="Learn. Grow. Succeed."
                title={`Welcome back ${capitalizeFirstLetter(userData.name)}`}
                description="Access your enrolled courses and continue your learning journey today!"
                buttonLabel="Logout"
                buttonAction={logOutService}
                imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746271424/hero_image_a2zl2l.webp`}
                imageAlt="Minimalist desk setup with monitor and coding posters"
                secondaryColor
            />

            <CreateProductFormContextProvider>
                <UpdateProductFormContextProvider>
                    <AdminProductManagementSection
                        limit={6}
                        createProducts
                        latest
                    />
                </UpdateProductFormContextProvider>
            </CreateProductFormContextProvider>

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