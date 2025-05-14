import { ReactElement } from "react"
import { HeroSection } from "@shared/components/sections/HeroSection";
import { TextSection } from "@shared/components/sections/TextSection";
import { TextImageSection } from "@shared/components/sections/TextImageSection";

export const AboutPage = (): ReactElement => {

    return <>
        <HeroSection
            eyebrowText="Innovate. Build. Achieve."
            title="Welcome to My Portfolio"
            description="This is a portfolio website built using the MERN stack: MongoDB, Express.js, React.js, and Node.js."
            imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746266989/hero-section-erfsd.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <TextImageSection 
            img={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746277182/text-image-section_iwyz5t.webp`} 
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

        <TextSection
            title="Master Your Skills Today!"
            description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
            buttonLabel="See all courses"
            buttonLink="/courses"
            secondaryColor
        />
    </>
}