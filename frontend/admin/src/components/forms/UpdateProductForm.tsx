import { FC, ReactElement, useContext } from "react";
import { ProductFormSection } from "../sections/ProductFormSection";
import { UpdateProductFormContextProps, UpdateProductFormContext } from "../../contexts/UpdateProductFormProvider";

export const UpdateProductForm: FC = (): ReactElement => {
    const updateProductFormContext: any = useContext(UpdateProductFormContext);
    const { updateProductForm }: UpdateProductFormContextProps = updateProductFormContext;

    return <ProductFormSection
        imgSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268491/form-section_f6y1ml.webp`}
        imageBorderedBoxWidth="40%"
        formWidth="60%"
        title={"Update the course"} 
        service="update-course"
        productImage
        textArea="details"
        textAreaPlaceholder="Write as title=…,content=…; separate sections with commas."
        updateProductFormState={updateProductForm}
        fields={[
            "name",
            "price",
            "category",
            "tags"
        ]}
    />
}