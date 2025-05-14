import { FormEvent, SetStateAction, Dispatch as ReactStateDispatch } from "react";
import { createCourseService } from "@admin/services/create-course.service";
import { updateCourseService } from "@admin/services/update-course.service";
import { Dispatch } from "@reduxjs/toolkit";
import { UpdateProductFormState } from "@admin/contexts/ProductMenagementContextProvider";
import { AdminServices } from "@admin/types/admin-services.type";

type GenerateAdminProductFormSubmitFunctionProps = {
    service: AdminServices,
    dispatch: Dispatch,
    updateProductForm: UpdateProductFormState,
    setUpdateProductForm?: ReactStateDispatch<SetStateAction<UpdateProductFormState>>,
    setErrorMessage: ReactStateDispatch<SetStateAction<string | undefined>>,
    setCreateProductForm?: ReactStateDispatch<SetStateAction<boolean>>,
    setProductCreated?: ReactStateDispatch<SetStateAction<boolean>>
};

export const generateAdminProductFormSubmitFunction = ({
    service,
    dispatch,
    setUpdateProductForm,
    updateProductForm,
    setErrorMessage,
    setCreateProductForm,
    setProductCreated
}: GenerateAdminProductFormSubmitFunctionProps) => {
    return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (service === "create-course" && setCreateProductForm && setProductCreated) {
            createCourseService(event, setErrorMessage, setCreateProductForm, setProductCreated, dispatch);
        } else if (service === "update-course" && updateProductForm && setUpdateProductForm) {
            updateCourseService(event, setUpdateProductForm, setErrorMessage, updateProductForm);
        }
    };
};