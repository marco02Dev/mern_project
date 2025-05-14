import { FC, ReactElement } from "react";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { useAuth } from "../../hooks/auth/useAuth";

type LoginAccountAdminButtonProps = {
    delay?: string
}

export const LoginAccountAdminButton: FC<LoginAccountAdminButtonProps> = ({
    delay
}: LoginAccountAdminButtonProps): ReactElement => {
    const {isLoggedIn, isAdmin} = useAuth();

    return <FadeInWrapper delay={sumStringDelays(delay)}>
        <StyledButton 
            content={isLoggedIn ? isAdmin ? "Admin" : "Account" : "Login"} 
            to={isLoggedIn ?  isAdmin ? "/admin" : "/account" : "/login"} 
            unsetShadow
            reloadDocument={isLoggedIn}
        />
    </FadeInWrapper>
}