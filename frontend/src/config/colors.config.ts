type Colors = {
    [key: string]: {
        [key: string]: string
    }
}

export const colors: Colors = {
    dark: {
        backgroundColor: 'black',
        backgroundColorSecondary: '#121826',
        buttonBackgroundColor: '#FFC107',
        textColor: 'white',
        sideTextColor: 'gray',
        hoverColor: '#FFC107'
    },
    light: {
        backgroundColor: 'white',
        backgroundColorSecondary: '#121826',
        buttonBackgroundColor: '#003EF8',
        textColor: 'black',
        sideTextColor: 'gray',
        hoverColor: '#003EF8'
    }
}