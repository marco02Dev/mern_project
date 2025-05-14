import { FC, ReactElement } from "react";
import { ProductFormSection } from "../sections/ProductFormSection";

/**
 * `UpdateProductForm` is an **admin-only component** that renders a section for updating an existing course.
 * 
 * It displays a form with editable fields including course name, price, category, and tags.
 * 
 * The form also includes a text area for the course details.
 * 
 * The layout and behavior are managed by the `ProductFormSection` admin component.
 * 
 * @returns {ReactElement} The `UpdateProductForm` component.
*/

export const UpdateProductForm: FC = (): ReactElement => {

    return <ProductFormSection
        imgSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268491/form-section_f6y1ml.webp`}
        imageBorderedBoxWidth="40%"
        formWidth="60%"
        title={"Update the course"} 
        service="update-course"
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