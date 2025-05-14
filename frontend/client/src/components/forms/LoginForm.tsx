import { FC, ReactElement } from "react";
import { ClientFormSection} from "../sections/ClientFormSection";

type LoginFormProps = {
    imgSrc: string
}

export const LoginForm: FC<LoginFormProps> = ({imgSrc}: LoginFormProps): ReactElement => {
    return <ClientFormSection 
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