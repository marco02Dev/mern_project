import { ReactElement, FC } from "react";
import { HeroSection } from "@shared//components/sections/HeroSection";
import { SmallProductsPreviewSection } from "@shared//components/sections/SmallProductPreviewSection";
import { TextSection } from "@shared//components/sections/TextSection";
import { BrowseSection } from "@shared//components/sections/browseSection";
import { TextImageSection } from "@shared//components/sections/TextImageSection";
import { capitalizeFirstLetter } from "@shared//utils/common/capitalize-first-letter.util";
import { UseAuth, useAuth } from "@shared//hooks/auth/useAuth";

export const HomePage: FC = (): ReactElement => {
    const { isLoggedIn, userData, isAdmin }: UseAuth = useAuth();

    return (
        <>
            <HeroSection
                eyebrowText="Learn. Grow. Succeed."
                title={
                    isLoggedIn && userData.name
                        ? `Welcome back ${capitalizeFirstLetter(userData.name)}`
                        : "Your Future Starts Here"
                }
                description={
                    isLoggedIn
                        ? "Continue your learning journey and explore new opportunities tailored just for you."
                        : "Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!"
                }
                buttonLabel={isLoggedIn ? "Go to account" : "Login"}
                buttonLink={isLoggedIn ? (isAdmin ? "/admin" : "/account") : "/login"}
                reloadDocument={isAdmin}
                imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268064/hero-section_hbuymw.webp`}
                imageAlt="Minimalist desk setup with monitor and coding posters"
                secondaryColor
            />

            <SmallProductsPreviewSection title="Latest Courses" latest />

            <TextImageSection
                img={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746267562/text-image-section_fegznb.webp`}
                secondaryColor
                title={"Why choose us?"}
                contentSections={[
                    {
                        title: "Minimalist Design",
                        content: "Experience a clean, clutter-free layout.",
                    },
                    {
                        title: "Tailored Solutions",
                        content: "We adapt to your specific needs.",
                    },
                    {
                        title: "Reliable Support",
                        content: "Count on our team to be there when you need us most.",
                    },
                ]}
            />

            <BrowseSection title="Learn all" categories />

            <TextSection
                title="Master Your Skills Today!"
                description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
                buttonLabel="See all courses"
                buttonLink="/courses"
                secondaryColor
            />
        </>
    );
};
