import { FC, ReactElement } from "react";
import { StyledText } from "@shared/components/themed/StyledText";

export const LoadingPage: FC = (): ReactElement => {
    return <StyledText tag='h2' content='App is loading' />
}