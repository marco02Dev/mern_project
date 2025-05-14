import { ReactElement, FC } from "react";
import { FormSection } from "@shared/components/sections/FormSection";

type SignUpFormProps = {
    imgSrc: string
}

export const SignUpForm: FC<SignUpFormProps> = ({imgSrc}: SignUpFormProps): ReactElement => {
    return <FormSection 
        title={"Create an Account"} 
        service="sign-up"
        fields={[
            "name",
            "surname",
            "email",
            "password"
        ]}
        imgSrc={imgSrc}
    />
}