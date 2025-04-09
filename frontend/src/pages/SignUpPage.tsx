import { ReactElement } from "react";
import { FormSection } from "../components/sections/FormSection";
import { endpoints } from "../config/endpoints.config";

export const SignUpPage = (): ReactElement => {
    return <>
        <FormSection 
        title={"Create an Account"} 
        fields={[
            "name",
            "surname",
            "password",
            "confirm password"
        ]}
        imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
        alternativeLinkDescription="Already have an account?"
        alternativeLink="/login"
        alternativeTextLink="Login"
        />
    </>
}