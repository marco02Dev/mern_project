import { endpoints } from "../config/endpoints.config";
import { Course } from "../types/course.types";
import { FormEvent, Dispatch, SetStateAction } from "react";

export type CreateCourseService = (
    event: FormEvent<HTMLFormElement>, 
    setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
    setCrateProductForm: Dispatch<SetStateAction<boolean>>,
    setProductCreated: Dispatch<SetStateAction<boolean>>
) => Promise<void>


export const createCourseService: CreateCourseService = async (event, setErrorMessage, setCrateProductForm, setProductCreated) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = formData.get('name');
    const price = formData.get('price');
    const category = formData.get('category');
    const productImage = formData.get('product-image');

    console.dir(productImage)
    const parsedPrice = Number(price);

    if (!title || !price || !category || isNaN(parsedPrice)) {
        setErrorMessage && setErrorMessage("Some fields are invalid or missing");
        throw new Error("Some fields are invalid or missing");
    }

    const course: Course = {
        name: title as string,
        price: Number(price) as number,
        category: category as string,
    }

    try {
        const response = await fetch(endpoints.coursesEndpoint, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(course)
        });

        if(response.ok) {

            const json = await response.json();
            const product_id: string = json.data._id;

            if (productImage instanceof File) {
                const fd = new FormData();

                const newFileName = "feature-image" + productImage.name.substring(productImage.name.lastIndexOf('.'));
                const productImageFileUpdated = new File([productImage], newFileName, { type: productImage.type });

                fd.append("product-image", productImageFileUpdated);      
                fd.append("category", category as string);    
              
                await fetch(`${endpoints.coursesEndpoint}/image/${category}/${product_id}`, {
                  method: "POST",
                  body: fd,         
                  credentials: "include"
                });

                setCrateProductForm(false);
                setProductCreated(true);
              } else {
                setErrorMessage("Seleziona un'immagine valida");
                return;
              }

        }
    } catch {
        setErrorMessage && setErrorMessage("Some fields are invalid or missing");
        throw new Error("Some fields are invalid or missing");
    }

}