import { ReactElement } from "react";
import { CoursesLoop } from "../components/loops/courses-loop";
import { TextImageSection } from "../components/sections/text-image-section";
import TextImageSectionImage from "./../images/webp/signin-section.webp"

export const Courses = (): ReactElement => {

    return <>
      <TextImageSection
          eyebrowText="Unlock Your Potential"
          title="Explore Our Exclusive Courses"
          description="Browse through a wide range of expertly crafted courses designed to help you grow and succeed. Whether you're looking to upgrade your skills or learn something new, we have something for everyone!"
          imageSrc={TextImageSectionImage}
          imageAlt="Minimalist desk setup with monitor and coding posters"
          imageLeft
      />

      <CoursesLoop />
    </>
};
