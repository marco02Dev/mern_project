import { FC, ReactElement } from "react";
import { ProductFormSection } from "@admin/components/sections/ProductFormSection";

/**
 * `CreateProductForm` is an **admin-only component** that renders a section for creating a new course.
 * It includes a form with the fields for the course name, price, category, and tags.
 * 
 * The form also includes a text area for the course details.
 * 
 * The layout and behavior are managed by the `ProductFormSection` admin component.
 * 
 * @returns {ReactElement} The `CreateProductForm` component.
*/

export const CreateProductForm: FC = (): ReactElement => {
    return <ProductFormSection
        imgSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268491/form-section_f6y1ml.webp`}
        imageBorderedBoxWidth="40%"
        formWidth="60%"
        title={"Create a new course"} 
        service="create-course"
        productImage
        textArea="details"
        textAreaPlaceholder="Write as title=…,content=…; separate sections with commas."
        fields={[
            "name",
            "price",
            "category",
            "tags"
        ]}
    />
}