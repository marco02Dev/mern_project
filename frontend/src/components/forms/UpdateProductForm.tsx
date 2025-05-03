import { Dispatch, FC, ReactElement, SetStateAction, useContext } from "react";
import { FormSection } from "../sections/FormSection";
import { UpdateProductFormContext, UpdateProductFormContextProps, UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";

type UpdateProductFormProps = {
    setUpdateProductFormSetState: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>,
}

export const UpdateProductForm: FC<UpdateProductFormProps> = ({setUpdateProductFormSetState}: UpdateProductFormProps): ReactElement => {
    const updateProductFormContext: any = useContext(UpdateProductFormContext);
    const { updateProductForm }: UpdateProductFormContextProps = updateProductFormContext;

    return <FormSection
        imgSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268491/form-section_f6y1ml.webp`}
        imageBorderedBoxWidth="40%"
        formWidth="60%"
        title={"Update the course"} 
        service="update-course"
        productImage
        setUpdateProductFormSetState={setUpdateProductFormSetState}
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