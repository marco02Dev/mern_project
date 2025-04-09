import { ReactElement } from "react";
import { TextImageSection } from "../components/sections/TextImageSection";
import { LargeProductsPreviewSection } from "../components/sections/LargeProductsPreviewSection";
import { endpoints, Endpoints } from "../config/endpoints.config";
import { TextSection } from "../components/sections/TextSection";
import { UseMediaQuery, useMediaQuery } from "../hooks/useMediaQuery";

export const CoursesPage = (): ReactElement => {
  const { isMobile }: UseMediaQuery = useMediaQuery();
  const { imagesEndpoint }: Endpoints = endpoints;

  return <>
    <TextImageSection
      eyebrowText="Unlock Your Potential"
      title="Explore Our Exclusive Courses"
      description="Browse through a wide range of expertly crafted courses designed to help you grow and succeed. Whether you're looking to upgrade your skills or learn something new, we have something for everyone!"
      imageSrc={`${imagesEndpoint}/pages/courses/text-image-section.webp`}
      imageAlt="Minimalist desk setup with monitor and coding posters"
      secondaryColor
    />

    <LargeProductsPreviewSection 
      title="Master everything"
      limit={isMobile ? 4 : 6}
    />

    <TextSection
      title="Behind the Project"
      description="Learn about the vision that inspired this platform. From concept to creation, discover how we're building a space dedicated to accessible, high-quality learning for everyone."
      buttonLabel="Explore the project"
      buttonLink="/about"
      secondaryColor
    />
  </>
};
