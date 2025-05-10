import { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { FormSection } from "../../../src/components/sections/FormSection";

type CreateProductFormProps = {
    setCrateProductForm: Dispatch<SetStateAction<boolean>>,
    setProductCreated: Dispatch<SetStateAction<boolean>>
}

export const CreateProductForm: FC<CreateProductFormProps> = ({setCrateProductForm, setProductCreated}: CreateProductFormProps): ReactElement => {
    return <FormSection
        imgSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268491/form-section_f6y1ml.webp`}
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