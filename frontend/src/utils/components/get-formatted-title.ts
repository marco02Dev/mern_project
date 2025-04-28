import { capitalizeFirstLetter } from "../common/capitalize-first-letter.util";

type GetFormattedTitle = (params: TitleParams) => string;

type TitleParams = {
    pathName: string;
    isFirstRender: boolean;
    isLoggedIn: boolean;
    userName: string | null;
};

export const getFormattedTitle: GetFormattedTitle = ({ pathName, isFirstRender, isLoggedIn, userName }: TitleParams): string => {
    let title: string = pathName.replace('/', "");
    const innerPathName: number = title.indexOf("/");

    if (innerPathName !== -1) {
        title = title.slice(0, innerPathName);
    }

    let titleCapitalized: string = title.charAt(0).toUpperCase() + title.slice(1);

    if (!titleCapitalized) {
        if (isFirstRender) {
            titleCapitalized = "Welcome";
        } else if (!isFirstRender) {
            titleCapitalized = "Welcome back";
        }
    }

    if (isLoggedIn && pathName === '/account' && userName) {
        titleCapitalized = `Welcome back ${capitalizeFirstLetter(userName)}`;
    }

    return titleCapitalized;
};