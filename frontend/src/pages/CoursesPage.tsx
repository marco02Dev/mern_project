import { ReactElement } from "react";
import { CoursesLoop } from "../components/loops/CoursesLoop";
import { TextImageSection } from "../components/sections/TextImageSection";
import { endpoints, Endpoints } from "../config/endpoints.config";

export const Courses = (): ReactElement => {

  const { imagesEndpoint }: Endpoints = endpoints;

  return <>
    <TextImageSection
        eyebrowText="Unlock Your Potential"
        title="Explore Our Exclusive Courses"
        description="Browse through a wide range of expertly crafted courses designed to help you grow and succeed. Whether you're looking to upgrade your skills or learn something new, we have something for everyone!"
        imageSrc={`${imagesEndpoint}/pages/courses/text-image-section.webp`}
        imageAlt="Minimalist desk setup with monitor and coding posters"
        imageLeft
    />

    <CoursesLoop />
  </>
};
