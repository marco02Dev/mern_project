import { ReactElement } from "react";
import { StyledText } from "../components/themed/StyledText";

export const LogInPage = (): ReactElement => {
    return <div>
        <StyledText 
            content={'Log in'} 
            tag={'h1'}
        />
    </div>
}