import { FC, ReactElement } from "react";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { useAuth } from "../../hooks/auth/useAuth";
import { UseIsCurrentPath, useIsCurrentPath } from "../../hooks/navigation/useIsCurrentPath";

type LoginAccountAdminButtonProps = {
    delay?: string
}

export const LoginAccountAdminButton: FC<LoginAccountAdminButtonProps> = ({
    delay
}: LoginAccountAdminButtonProps): ReactElement => {
    const {isLoggedIn, isAdmin} = useAuth();
    const isLoginPage: UseIsCurrentPath = useIsCurrentPath("/login");

    return <FadeInWrapper delay={sumStringDelays(delay)}>
        <StyledButton 
            content={isLoggedIn ? isAdmin ? "Admin" : "Account" : isLoginPage ? "Signup" : "Login"} 
            to={isLoggedIn ?  isAdmin ? "/admin" : "/account" : isLoginPage ? "/signup" : "/login"} 
            unsetShadow
            reloadDocument={isLoggedIn}
        />
    </FadeInWrapper>
}