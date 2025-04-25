import { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { FormSection } from "../sections/FormSection";
import { endpoints } from "../../config/endpoints.config";

type CreateProductFormProps = {
    setCrateProductForm: Dispatch<SetStateAction<boolean>>,
    setProductCreated: Dispatch<SetStateAction<boolean>>
}

export const CreateProductForm: FC<CreateProductFormProps> = ({setCrateProductForm, setProductCreated}: CreateProductFormProps): ReactElement => {
    return <FormSection
        imgSrc={`${endpoints.imagesEndpoint}/pages/admin/form-section.webp`}
        imageBorderedBoxWidth="40%"
        formWidth="60%"
        title={"Create a new course"} 
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