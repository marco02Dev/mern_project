import { ReactElement, FC } from "react";
import { ClientFormSection } from "../sections/ClientFormSection";

type SignUpFormProps = {
    imgSrc: string
}

export const SignUpForm: FC<SignUpFormProps> = ({imgSrc}: SignUpFormProps): ReactElement => {
    return <ClientFormSection 
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