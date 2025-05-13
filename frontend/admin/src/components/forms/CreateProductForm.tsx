import { FC, ReactElement } from "react";
import { ProductFormSection } from "../sections/ProductFormSection";

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