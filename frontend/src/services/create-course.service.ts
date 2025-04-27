import { endpoints } from "../config/endpoints.config";
import { Course } from "../types/course.types";
import { FormEvent, Dispatch, SetStateAction } from "react";
import { parseDetailsCourseFormData } from "../utils/parse-details-course-form-data.util";
import { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { setDataChanged } from "../store/slices/courses-data-changed.slice";
import { uploadCourseImagesService } from "./upload-course-image-service";

export type CreateCourseService = (
  event: FormEvent<HTMLFormElement>,
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
  setCrateProductForm: Dispatch<SetStateAction<boolean>>,
  setProductCreated: Dispatch<SetStateAction<boolean>>,
  dispatch: ReduxDispatch
) => Promise<void>;

export const createCourseService: CreateCourseService = async (
  event,
  setErrorMessage,
  setCrateProductForm,
  setProductCreated,
  dispatch
) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const title     = formData.get("name");
  const price     = formData.get("price");
  const category  = formData.get("category");
  const tagString = formData.get("tags");
  const prodImg   = formData.get("product-image");
  const heroImg   = formData.get("hero-image");
  const detailsRaw   = formData.get("details");

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
    setErrorMessage("Please fill tags field");
  }

  const parsedPrice = Number(price);
  if (!title || !price || !category || isNaN(parsedPrice)) {
    setErrorMessage("Some fields are invalid or missing");
    throw new Error("Validation error");
  }

  const course: Course = {
    name: title as string,
    price: parsedPrice,
    category: category as string,
    tags: tagsArray as string[],
    details: detailsParsed
  };

  try {
    const res = await fetch(endpoints.coursesEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(course),
    });
    
    if (!res.ok) throw new Error("Course creation failed");
    const { data } = await res.json();         
    const productId = data._id as string;
    
    await uploadCourseImagesService(
      prodImg,
      heroImg,
      category as string,
      productId
    );
    
    setCrateProductForm(false);
    setProductCreated(true);
    dispatch(setDataChanged());
  } catch (err) {
    console.error(err);

    const sid = document.cookie.split('; ').find(row => row.startsWith('sid='));
  
    if (!sid) {
      setErrorMessage("Session expired, please re-authenticate.");
    } else {
      setErrorMessage("You don't have permission to access this resource!");
    }
  
    throw err;
  }
};
