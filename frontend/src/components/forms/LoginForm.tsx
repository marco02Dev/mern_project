import { FC, ReactElement } from "react";
import { FormSection } from "../sections/FormSection";

type LoginFormProps = {
    imgSrc: string
}

export const LoginForm: FC<LoginFormProps> = ({imgSrc}: LoginFormProps): ReactElement => {
    return <FormSection 
        title={"Welcome back!"} 
        fields={[
            "name",
            "surname",
            "email",
            "password"
        ]}
        imgSrc={imgSrc}
        service="login"
    />
}