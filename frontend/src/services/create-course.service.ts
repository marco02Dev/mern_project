import { endpoints } from "../config/endpoints.config";
import { Course } from "../types/course.types";
import { FormEvent, Dispatch, SetStateAction } from "react";

export type CreateCourseService = (
  event: FormEvent<HTMLFormElement>,
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
  setCrateProductForm: Dispatch<SetStateAction<boolean>>,
  setProductCreated: Dispatch<SetStateAction<boolean>>
) => Promise<void>;

export const createCourseService: CreateCourseService = async (
  event,
  setErrorMessage,
  setCrateProductForm,
  setProductCreated
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

  let tagsArray: string[] = [];

  if (typeof tagString === "string") {
    tagsArray = tagString
      .split(",")  
      .map(t => t.trim())   
      .filter(Boolean);  
  } else {
    setErrorMessage("Please fill tags field");
  }

  console.log(tagsArray);


  const parsedPrice = Number(price);
  if (!title || !price || !category || isNaN(parsedPrice)) {
    setErrorMessage("Some fields are invalid or missing");
    throw new Error("Validation error");
  }

  const course: Course = {
    name: title as string,
    price: parsedPrice,
    category: category as string,
    tags: tagsArray as string[]
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

    const fd = new FormData();

    if (prodImg instanceof File) {
      const newName =
        "feature-image" + prodImg.name.slice(prodImg.name.lastIndexOf("."));
      fd.append("product-image", new File([prodImg], newName, { type: prodImg.type }));
    }

    if (heroImg instanceof File) {
      const newName =
        "hero-image" + heroImg.name.slice(heroImg.name.lastIndexOf("."));
      fd.append("hero-image", new File([heroImg], newName, { type: heroImg.type }));
    }

    if (fd.has("product-image") || fd.has("hero-image")) {
      fd.append("category", category as string);

      await fetch(
        `${endpoints.coursesEndpoint}/image/${category}/${productId}`,
        {
          method: "POST",
          credentials: "include",
          body: fd,
        }
      );
    }

    setCrateProductForm(false);
    setProductCreated(true);
  } catch (err) {
    console.error(err);
    setErrorMessage("Some fields are invalid or missing");
    throw err;
  }
};
