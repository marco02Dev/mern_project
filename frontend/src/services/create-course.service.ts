import { SendEmailService } from "../types/service.type";
import { endpoints } from "../config/endpoints.config";
import { Course } from "../types/course.types";

export const createCourseService: SendEmailService = async (event, setErrorMessage) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = formData.get('name');
    const price = formData.get('price');
    const category = formData.get('category');
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

    await fetch(endpoints.coursesEndpoint, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(course)
    });
}