import { endpoints } from "../../src/config/endpoints.config";
import { FormEvent, Dispatch, SetStateAction } from "react";
import { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { setDataChanged } from "../../src/store/slices/courses-data-changed.slice";
import { uploadCourseImagesService } from "./upload-course-image-service";
import { checkSession } from "../../src/utils/cookies/check-session.util";
import { reloadLoginPage } from "../../src/utils/browser/reload-login-page.util";
import { errorMessages } from "../../src/config/error-messages.config";
import { retrieveFormProductData } from "../utils/retrieve-form-product-data.util";

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

  const { course, courseImages } = retrieveFormProductData({
    form: event.currentTarget,
    setErrorMessage
  });

  console.log(course)

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
      courseImages.prodImg,
      courseImages.heroImg,
      course.category as string,
      productId
    );
    
    setCrateProductForm(false);
    setProductCreated(true);
    dispatch(setDataChanged());
  } catch (err) {
    console.error(err);

    if (!checkSession()) {
      setErrorMessage(errorMessages.sessionExpired);
      reloadLoginPage();
      return;
    } else {
      setErrorMessage("You don't have permission to access this resource!");
      reloadLoginPage();
    }
  
    throw err;
  }
};
