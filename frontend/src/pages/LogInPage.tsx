import { ReactElement } from "react";
import { StyledText } from "../styles/StyledText";

export const LogIn = (): ReactElement => {
    return <div>
        <StyledText 
            content={'Log in'} 
            tag={'h1'}
        />
    </div>
}