import { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { FormSection } from "../sections/FormSection";
import { endpoints } from "../../config/endpoints.config";

type UpdateProductFormProps = {
    setCrateProductForm: Dispatch<SetStateAction<boolean>>,
    setProductCreated: Dispatch<SetStateAction<boolean>>
}

export const UpdateProductForm: FC<UpdateProductFormProps> = ({setCrateProductForm, setProductCreated}: UpdateProductFormProps): ReactElement => {
    return <FormSection
        imgSrc={`${endpoints.imagesEndpoint}/pages/admin/form-section.webp`}
        imageBorderedBoxWidth="40%"
        formWidth="60%"
        title={"Update the course"} 
        service="create-course"
        productImage
        setCrateProductForm={setCrateProductForm}
        setProductCreated={setProductCreated}
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