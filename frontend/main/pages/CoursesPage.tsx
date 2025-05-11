import { ReactElement } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { LargeProductsPreviewSection } from "../components/sections/LargeProductsPreviewSection";
import { TextSection } from "../components/sections/TextSection";
import { UseMediaQuery, useMediaQuery } from "../hooks/ui/useMediaQuery";
import { useParams } from "react-router-dom";
import { categories } from "../config/categories.config";
import { NotFoundPage } from "./NotFoundPage";
import { generateCoursesPageTexts, CoursePageTextsData } from "../utils/components/generate-courses-page-text.util";

export const CoursesPage = (): ReactElement => {
  const { isMobile }: UseMediaQuery = useMediaQuery();
  const { category } = useParams<{ category: string }>();
  const { eyebrow, title, description, imgUrl, imgAltDetailed }: CoursePageTextsData = generateCoursesPageTexts(category);

  if (category) {
    const isCategory = categories.some((cat) => cat === category);
    if (!isCategory) {
      return <NotFoundPage />;
    }
  }

  return (
    <>
      <HeroSection
        eyebrowText={eyebrow}
        title={title}
        description={description}
        imageSrc={imgUrl}
        imageAlt={imgAltDetailed}
        secondaryColor
      />

      <LargeProductsPreviewSection
        limit={isMobile ? 4 : 6}
        category={category}
        categoriesFilter={category ? false : true}
      />

      <TextSection
        title="Behind the Project"
        description="Learn about the vision that inspired this platform. From concept to creation, discover how we're building a space dedicated to accessible, high-quality learning for everyone."
        buttonLabel="Explore the project"
        buttonLink="/about"
        secondaryColor
      />
    </>
  );
};
