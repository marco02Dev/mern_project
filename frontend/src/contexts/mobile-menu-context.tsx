import { createContext, useState, ReactElement, Dispatch, SetStateAction } from "react";

export type MobileMenuContextProps = {
    isOpened: boolean,
    setisOpened: Dispatch<SetStateAction<boolean>> | undefined
}

export const MobileMenuContext = createContext<MobileMenuContextProps>({
    isOpened: false,
    setisOpened: () => {}
});

export const MobileMenuContextProvider = ({children}: {children: ReactElement}): ReactElement => {

    const [isOpened, setisOpened] = useState<boolean>(false);
    const ThemeisOpenedValue: MobileMenuContextProps = {
        isOpened: isOpened,
        setisOpened: setisOpened
    }

    return <MobileMenuContext.Provider value={ThemeisOpenedValue}>
        {children}
    </MobileMenuContext.Provider>
}