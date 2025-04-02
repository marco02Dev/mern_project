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
        backgroundColorSecondary: '#E0E0E0',
        buttonBackgroundColor: '#8d99ae',
        textColor: 'black',
        sideTextColor: 'gray',
        hoverColor: '#8d99ae'
    }
}