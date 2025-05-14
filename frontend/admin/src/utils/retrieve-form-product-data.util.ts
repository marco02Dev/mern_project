import { Course } from "@shared/types/course.types";
import { parseDetailsCourseFormData } from "@admin/utils/parse-details-course-form-data.util";
import { handleErrorResponse } from "@shared/utils/form/handle-error-response";
import { SetStateAction, Dispatch } from "react";

/**
 * Represents the return type of the `retrieveFormProductData` utility function.
 *
 * @param {HTMLFormElement} form - The HTML form element containing course data fields.
 * @param {Dispatch<SetStateAction<string | undefined>>} setErrorMessage - Function to set error messages
 * when validation or parsing fails, typically from the ProductFormSection local state.
 *
 * @returns {{
 *   course: Course;
 *   courseImages: {
 *     prodImg: FormDataEntryValue | null;
 *     heroImg: FormDataEntryValue | null;
 *   };
 * }} An object containing the parsed `course` object and selected image files for the course.
*/

type RetrieveFormProductData = (params: {
  form: HTMLFormElement;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
}) => {
  course: Course;
  courseImages: {
    prodImg: FormDataEntryValue | null;
    heroImg: FormDataEntryValue | null;
  };
};

/**
 * `retrieveFormProductData` is an **admin-only utility function**.
 * 
 * It extracts and validates course data from a submitted HTML form,
 * returning a structured `Course` object along with any attached course images.
 * 
 * This utility is used during course creation and updating processes in the admin panel.
 *
 * It handles:
 * - Basic validation of required fields (name, price, category)
 * - Parsing comma-separated `tags` into an array
 * - Converting structured `details` string into an array of objects with `title` and `content`
 * - Collecting image files for `product-image` and `hero-image`
 * - Setting appropriate error messages using `setErrorMessage` and throwing errors when necessary
 *
 * @param {HTMLFormElement} form - The HTML form element containing the course input fields.
 * @param {Dispatch<SetStateAction<string | undefined>>} setErrorMessage - Function to set error messages
 * from the local state of the ProductFormSection.
 *
 * @returns {{
 *   course: Course;
 *   courseImages: {
 *     prodImg: FormDataEntryValue | null;
 *     heroImg: FormDataEntryValue | null;
 *   };
 * }} An object containing the structured course data and image file references.
 *
 * @throws {Error} Throws if required fields are missing or invalid.
*/

export const retrieveFormProductData: RetrieveFormProductData = ({
  form,
  setErrorMessage
}) => {
  const formData = new FormData(form);

  const title     = formData.get("name");
  const price     = formData.get("price");
  const category  = formData.get("category");
  const tagString = formData.get("tags");
  const detailsRaw = formData.get("details");
  const prodImg   = formData.get("product-image");
  const heroImg   = formData.get("hero-image");

  let detailsParsed: {
    title: string;
    content: string;
  }[] | undefined;

  if (typeof detailsRaw === "string") {
    detailsParsed = parseDetailsCourseFormData(detailsRaw);
  }

  let tagsArray: string[] = [];

  if (typeof tagString === "string") {
    tagsArray = tagString
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);
  } else {
    handleErrorResponse({
      statusCode: 400,
      setErrorMessage
    });
    throw new Error("Invalid tag string");
  }

  const parsedPrice = Number(price);
  if (!title || !price || !category || isNaN(parsedPrice)) {
    handleErrorResponse({
      statusCode: 400,
      setErrorMessage
    });
    throw new Error("Validation error");
  }

  const course: Course = {
    name: title as string,
    price: parsedPrice,
    category: category as string,
    tags: tagsArray,
    details: detailsParsed
  };

  const courseImages = {
    prodImg,
    heroImg
  };

  return {
    course,
    courseImages
  };
};
