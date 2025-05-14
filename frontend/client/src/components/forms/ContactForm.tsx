import { ReactElement, FC } from "react";
import { ClientFormSection } from "../sections/ClientFormSection";

type ContactFormProps = {
    imgSrc: string
}

export const ContactForm: FC<ContactFormProps> = ({
    imgSrc
}): ReactElement => {
    return <ClientFormSection 
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