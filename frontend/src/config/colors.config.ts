type ColorName = 
  | 'backgroundColor' 
  | 'backgroundColorSecondary' 
  | 'buttonBackgroundColor' 
  | 'textColor' 
  | 'sideTextColor' 
  | 'hoverColor'
  | 'errorMessage'
  | 'borderColor';

type Colors = {
  [key in 'dark' | 'light']: {
    [key in ColorName]: string;
  };
};

export const colors: Colors = {
    dark: {
        backgroundColor: 'black',
        backgroundColorSecondary: '#121826',
        buttonBackgroundColor: '#dfe6ee',
        textColor: 'white',
        sideTextColor: 'gray',
        hoverColor: '#FFC107',
        errorMessage: "#D93025",
        borderColor: "#5c677d"
    },
    light: {
        backgroundColor: 'white',
        backgroundColorSecondary: '#E0E0E0',
        buttonBackgroundColor: '#8d99ae',
        textColor: 'black',
        sideTextColor: 'gray',
        hoverColor: '#003EF8',
        errorMessage: "#D93025",
        borderColor: "#5c677d"
    }
}