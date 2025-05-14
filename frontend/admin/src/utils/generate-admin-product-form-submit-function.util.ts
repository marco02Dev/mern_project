import { FormEvent, SetStateAction, Dispatch as ReactStateDispatch } from "react";
import { createCourseService } from "@admin/services/create-course.service";
import { updateCourseService } from "@admin/services/update-course.service";
import { Dispatch } from "@reduxjs/toolkit";
import { UpdateProductFormState } from "@admin/contexts/ProductMenagementContextProvider";

type GenerateAdminProductFormSubmitFunctionProps = {
    service: "create-course" | "update-course",
    dispatch: Dispatch,
    updateProductFormState?: UpdateProductFormState,
    setUpdateProductFormSetState?: ReactStateDispatch<SetStateAction<UpdateProductFormState>>,
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