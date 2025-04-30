export type CoursePageTextsData = {
  eyebrow: string;
  title: string;
  description: string;
};

export const generateCoursesPageTexts = (category?: string): CoursePageTextsData => {
  if (category) {
    const capitalized: string = category.charAt(0).toUpperCase() + category.slice(1);
    return {
      eyebrow: `Courses in ${capitalized}`,
      title: `Learn the Best of ${capitalized}`,
      description: `Looking to improve in ${category}? Browse our tailored courses designed specifically to help you master this field!`,
    };
  }

  return {
    eyebrow: "Unlock Your Potential",
    title: "Explore Our Exclusive Courses",
    description:
      "Browse through a wide range of expertly crafted courses designed to help you grow and succeed. Whether you're looking to upgrade your skills or learn something new, we have something for everyone!",
  };
};
  