import { endpoints } from "../config/endpoints.config";

export const uploadCourseImagesService = async (
  prodImg: FormDataEntryValue | null,
  heroImg: FormDataEntryValue | null,
  category: string,
  productId: string
): Promise<void> => {
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
    fd.append("category", category);

    const uploadRes = await fetch(
      `${endpoints.coursesEndpoint}/image/${category}/${productId}`,
      {
        method: "POST",
        credentials: "include",
        body: fd,
      }
    );

    if (!uploadRes.ok) {
      throw new Error("Image upload failed");
    }
  }
};
