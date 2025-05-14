import { Course } from "@shared/types/course.types";
import { parseDetailsCourseFormData } from "@admin/utils/parse-details-course-form-data.util";
import { handleErrorResponse } from "@shared/utils/form/handle-error-response";
import { SetStateAction, Dispatch } from "react";

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
