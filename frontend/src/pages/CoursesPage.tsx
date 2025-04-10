import { ReactElement } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { LargeProductsPreviewSection } from "../components/sections/LargeProductsPreviewSection";
import { endpoints, Endpoints } from "../config/endpoints.config";
import { TextSection } from "../components/sections/TextSection";
import { UseMediaQuery, useMediaQuery } from "../hooks/useMediaQuery";
import { useParams } from "react-router-dom";
import { categories } from "../config/categories.config";
import { NotFoundPage } from "./NotFoundPage";

export const CoursesPage = (): ReactElement => {
  const { isMobile }: UseMediaQuery = useMediaQuery();
  const { imagesEndpoint }: Endpoints = endpoints;
  const { category } = useParams<{ category: string }>();

  if (category) {
    const isCategory = categories.some((cat) => cat === category);
    if (!isCategory) {
      return <NotFoundPage />;
    }
  }

  const eyebrow = category
    ? `Courses in ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : "Unlock Your Potential";

  const title = category
    ? `Learn the Best of ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : "Explore Our Exclusive Courses";

  const description = category
    ? `Looking to improve in ${category}? Browse our tailored courses designed specifically to help you master this field!`
    : "Browse through a wide range of expertly crafted courses designed to help you grow and succeed. Whether you're looking to upgrade your skills or learn something new, we have something for everyone!";

  return (
    <>
      <HeroSection
        eyebrowText={eyebrow}
        title={title}
        description={description}
        imageSrc={`${imagesEndpoint}/pages/courses/text-image-section.webp`}
        imageAlt="Minimalist desk setup with monitor and coding posters"
        secondaryColor
      />

      <LargeProductsPreviewSection
        limit={isMobile ? 4 : 6}
        category={category}
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
