type SizeValue = string;

type ParagraphSizes = {
    small: SizeValue;
    medium: SizeValue;
    large: SizeValue;
};

type FontSizes = {
    h1: SizeValue;
    h2: SizeValue;
    h3: SizeValue;
    h4: SizeValue;
    h5: SizeValue;
    h6: SizeValue;
    p: ParagraphSizes;
    span: SizeValue;
};

type Spaces = {
    small: SizeValue,
    medium: SizeValue,
    large: SizeValue
}

export const sizes: { fontSizes: FontSizes, spaces: Spaces } = {
    fontSizes: {
        h1: "10vh", 
        h2: "8vh",
        h3: "6vh", 
        h4: "5vh",
        h5: "4vh",
        h6: "3vh", 
        p: {
            small: "2vh",  
            medium: "2.5vh",   
            large: "3vh" 
        },
        span: "2.5vh"
    },
    spaces: {
        small: "1vh",
        medium: "2vh",
        large: "4vh"
    }
};
