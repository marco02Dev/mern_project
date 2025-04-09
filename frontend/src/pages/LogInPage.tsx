import { ReactElement } from "react";
import { endpoints } from "../config/endpoints.config";
import { FormSection } from "../components/sections/FormSection";

export const LogInPage = (): ReactElement => {
    return <>
        <FormSection 
            title={"Welcome back!"} 
            fields={[
                "name",
                "email",
                "password"
            ]}
            imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
            alternativeLinkDescription="Don’t have an account?"
            alternativeLink="/signup"
            alternativeTextLink="Sign up"
        />
    </>
}