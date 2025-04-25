import { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { FormSection } from "../sections/FormSection";
import { endpoints } from "../../config/endpoints.config";
import { UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";

type UpdateProductFormProps = {
    setUpdateProductFormSetState: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>,
}

export const UpdateProductForm: FC<UpdateProductFormProps> = ({setUpdateProductFormSetState}: UpdateProductFormProps): ReactElement => {
    return <FormSection
        imgSrc={`${endpoints.imagesEndpoint}/pages/admin/form-section.webp`}
        imageBorderedBoxWidth="40%"
        formWidth="60%"
        title={"Update the course"} 
        service="update-course"
        productImage
        setUpdateProductFormSetState={setUpdateProductFormSetState}
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