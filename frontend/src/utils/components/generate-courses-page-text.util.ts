export type CoursePageTextsData = {
  eyebrow: string;
  title: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
  imgAltDetailed: string;
};

const categoryImages = {
  design: "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746278647/hero-image_qxfxoq.webp",
  "back-end": "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746278071/hero-image_r50qll.webp",
  "front-end": "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746277608/hero-image_souwm5.webp",
  "seo": "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746277879/hero_image_a5r85y.webp"
}

export const generateCoursesPageTexts = (category?: string): CoursePageTextsData => {
  if (category) {
    const capitalized: string = category.charAt(0).toUpperCase() + category.slice(1);
    return {
      eyebrow: `Courses in ${capitalized}`,
      title: `Learn the Best of ${capitalized}`,
      description: `Looking to improve in ${category}? Browse our tailored courses designed specifically to help you master this field!`,
      imgUrl: categoryImages[category] || "",
      imgAlt: "Course category illustration",
      imgAltDetailed: `Illustration representing ${capitalized} courses`
    };
  }

  return {
    eyebrow: "Unlock Your Potential",
    title: "Explore Our Exclusive Courses",
    description:
      "Browse through a wide range of expertly crafted courses designed to help you grow and succeed. Whether you're looking to upgrade your skills or learn something new, we have something for everyone!",
    imgUrl: "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268262/hero-section_ucijii.webp",
    imgAlt: "Generic course illustration",
    imgAltDetailed: "Illustration representing design courses"
  };
};
