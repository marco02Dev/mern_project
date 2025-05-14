import { ReactElement, FC } from "react";
import { FormSection } from "@shared/components/sections/FormSection";

type ContactFormProps = {
    imgSrc: string
}

export const ContactForm: FC<ContactFormProps> = ({
    imgSrc
}): ReactElement => {
    return <FormSection 
        title={"Contact us"} 
        service="send-email"
        fields={[
            "name",
            "email"
        ]}
        textArea={"message"}
        imgSrc={imgSrc}
    />
}