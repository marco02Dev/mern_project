import { ReactElement } from "react";
import { FormSection } from "../components/sections/FormSection";
import { endpoints } from "../config/endpoints.config";

export const ContactPage = (): ReactElement => {
    return <>
        <FormSection 
            title={"Contact us"} 
            fields={[
                "name",
                "email"
            ]}
            textArea={"message"}
            imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
        />
    </>
}