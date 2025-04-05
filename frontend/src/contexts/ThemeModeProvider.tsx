import { createContext, useState, ReactElement, Dispatch, SetStateAction } from "react";
import { defaultMode } from "../config/theme-mode.config";

export type ThemeModeContextProps = {
    mode: string,
    setMode: Dispatch<SetStateAction<string>> | undefined
}

export const ThemeModeContext = createContext<ThemeModeContextProps>({
    mode: defaultMode,
    setMode: () => {}
});

export const ThemeModeProvider = ({children}: {children: ReactElement}): ReactElement => {

    const [mode, setMode] = useState<string>(defaultMode);
    const ThemeModeValue: ThemeModeContextProps = {
        mode: mode,
        setMode: setMode
    }

    return <ThemeModeContext.Provider value={ThemeModeValue}>
        {children}
    </ThemeModeContext.Provider>
}