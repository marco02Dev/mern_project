import { FormEvent, SetStateAction, Dispatch as ReactStateDispatch } from "react";
import { createCourseService } from "../services/create-course.service";
import { updateCourseService } from "../services/update-course.service";
import { Dispatch } from "@reduxjs/toolkit";
import { UpdateProductFormContextStateObject } from "../contexts/UpdateProductFormProvider";

type GenerateAdminProductFormSubmitFunctionProps = {
    service: "create-course" | "update-course",
    dispatch: Dispatch,
    updateProductFormState?: UpdateProductFormContextStateObject,
    setUpdateProductFormSetState?: ReactStateDispatch<SetStateAction<UpdateProductFormContextStateObject>>,
    setErrorMessage: ReactStateDispatch<SetStateAction<string | undefined>>,
    setCrateProductForm?: ReactStateDispatch<SetStateAction<boolean>>,
    setProductCreated?: ReactStateDispatch<SetStateAction<boolean>>
};

export const generateAdminProductFormSubmitFunction = ({
    service,
    dispatch,
    setUpdateProductFormSetState,
    updateProductFormState,
    setErrorMessage,
    setCrateProductForm,
    setProductCreated
}: GenerateAdminProductFormSubmitFunctionProps) => {
    return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (service === "create-course" && setCrateProductForm && setProductCreated) {
            createCourseService(event, setErrorMessage, setCrateProductForm, setProductCreated, dispatch);
        } else if (service === "update-course" && updateProductFormState && setUpdateProductFormSetState) {
            updateCourseService(event, setUpdateProductFormSetState, setErrorMessage, updateProductFormState);
        }
    };
};