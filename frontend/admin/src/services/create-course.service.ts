import { endpoints } from "@shared/config/endpoints.config";
import { FormEvent, Dispatch, SetStateAction } from "react";
import { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { setDataChanged } from "@shared/store/slices/courses-data-changed.slice";
import { uploadCourseImagesService } from "@admin/services/upload-course-image-service";
import { checkSession } from "@shared/utils/cookies/check-session.util";
import { reloadLoginPage } from "@shared/utils/navigation/reload-login-page.util";
import { errorMessages } from "@shared/config/error-messages.config";
import { retrieveFormProductData } from "@admin/utils/retrieve-form-product-data.util";

/**
 * Represents the service function used to handle the course creation process.
 *
 * @param {FormEvent<HTMLFormElement>} event - The form submission event.
 * @param {Dispatch<SetStateAction<string | undefined>>} setErrorMessage - Function from the local state of `ProductFormSection` used to set error messages during the process.
 * @param {Dispatch<SetStateAction<boolean>>} setCreateProductForm - Function from ProductManagementContext to toggle the visibility of the course creation form.
 * @param {Dispatch<SetStateAction<boolean>>} setProductCreated - Function from ProductManagementContext to indicate whether the course was successfully created.
 * @param {ReduxDispatch} dispatch - Redux dispatch used to trigger state change in `coursesDataChangedSlice`, which causes `CoursesLoop` to re-render.
 * 
 * @returns {Promise<void>} A promise that resolves when the course creation process is complete.
*/

export type CreateCourseService = (
  event: FormEvent<HTMLFormElement>,
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
  setCrateProductForm: Dispatch<SetStateAction<boolean>>,
  setProductCreated: Dispatch<SetStateAction<boolean>>,
  dispatch: ReduxDispatch
) => Promise<void>;

/**
 * `createCourseService` is an **admin-only service** that handles the logic for creating a new course.
 * 
 * This includes:
 * - Preventing the default form submission behavior
 * - Extracting course data and images from the form
 * - Sending a POST request to the backend API to create the course
 * - Uploading course images after successful creation
 * - Updating local state via ProductManagementContext and triggering a global update via `coursesDataChangedSlice`
 *   to ensure the `CoursesLoop` component reflects the latest data
 * - Handling session expiration and permission-related errors
 *
 * @see CreateCourseService for full parameter description.
*/

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
