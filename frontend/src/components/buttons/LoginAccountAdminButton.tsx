import { FC, ReactElement } from "react";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { useSelector } from "react-redux";
import { User } from "../../types/user.types";
import { RootState } from "../../store";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";

type LoginAccountAdminButtonProps = {
    delay?: string
}

export const LoginAccountAdminButton: FC<LoginAccountAdminButtonProps> = ({
    delay
}: LoginAccountAdminButtonProps): ReactElement => {

    const { isLoggedIn }: { isLoggedIn: boolean } = useSelector((state: RootState) => state.login);
    const user: User | undefined = useSelector((state: RootState) => state.login.user);
    const role: string | undefined = user?.role;

    return <FadeInWrapper delay={sumStringDelays(delay)}>
        <StyledButton 
            content={isLoggedIn ? role === "customer" ? "Account" : "Admin" : "Login"} 
            to={isLoggedIn ? role === "customer" ? "/account" : "/admin" : "/login"} 
            unsetShadow
        />
    </FadeInWrapper>
}