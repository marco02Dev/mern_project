import { Dispatch, FormEvent, SetStateAction } from "react";
import { UpdateProductFormContextStateObject } from "../contexts/UpdateProductFormProvider";
import { retrieveFormProductData } from "../utils/form/retrieve-form-product-data.util";
import { endpoints } from "../config/endpoints.config";

export const updateCourseService = async (
    event: FormEvent<HTMLFormElement>,
    setUpdateProductFormSetState: Dispatch<SetStateAction<UpdateProductFormContextStateObject>> | undefined,
    setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
    updateProductFormState: UpdateProductFormContextStateObject
) => {
    event.preventDefault();

    const { course, courseImages } = retrieveFormProductData({
        form: event.currentTarget,
        setErrorMessage: setErrorMessage
    });

    const courseId: unknown = updateProductFormState?.courseId;

    if(course && courseImages && courseId && typeof courseId === "string") {
        
        const response = await fetch(`${endpoints.coursesEndpoint}/${courseId}`, {
            method: "PUT",
            body: JSON.stringify(course),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        console.log(response);

        if(setUpdateProductFormSetState) setUpdateProductFormSetState({
            state: false,
            courseId: "updated"
        });
    }
}