import { Dispatch, FormEvent, SetStateAction } from "react";
import { UpdateProductFormContextStateObject } from "../contexts/UpdateProductFormProvider";

 
export const updateCourseService = (
    event: FormEvent<HTMLFormElement>,
    setUpdateProductFormSetState: Dispatch<SetStateAction<UpdateProductFormContextStateObject>> | undefined
) => {
    event.preventDefault();
    setUpdateProductFormSetState && setUpdateProductFormSetState({
        state: false,
        courseId: "updated"
    });
}