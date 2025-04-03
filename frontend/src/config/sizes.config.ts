type SizeValue = string;

type SizeCategory = {
    verySmall: SizeValue;
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
    span: SizeValue;
    paragraph: SizeCategory;
};

type Sizes = {
    fontSizes: FontSizes;
    spaces: SizeCategory;
    widths: SizeCategory;
    heights: SizeCategory;
};

export let sizes: Sizes = {
    fontSizes: {
        h1: "clamp(10vh, 10vh + 1vw, 100vw)", 
        h2: "clamp(8vh, 8vh + 1vw, 100vw)",
        h3: "clamp(6vh, 6vh + 1vw, 100vw)", 
        h4: "clamp(5vh, 5vh + 1vw, 100vw)",
        h5: "clamp(4vh, 4vh + 1vw, 100vw)",
        h6: "clamp(3vh, 3vh + 1vw, 100vw)", 
        span: "clamp(2.5vh, 2.5vh + 1vw, 100vw)",
        paragraph: {
            verySmall: "clamp(1vh, 1vh + 0.5vw, 100vw)",
            small: "clamp(2vh, 2vh + 0.5vw, 100vw)",  
            medium: "clamp(2.5vh, 2.5vh + 0.5vw, 100vw)",   
            large: "clamp(3vh, 3vh + 0.5vw, 100vw)" 
        }
    },
    spaces: {
        verySmall: "clamp(0.1vh, 0.1vh + 0.1vw, 100vw)",
        small: "clamp(1vh, 1vh + 0.5vw, 100vw)",
        medium: "clamp(5vh, 5vh + 0.5vw, 100vw)",
        large: "clamp(6.5vh, 6.5vh + 1vw, 100vw)"
    },
    widths: {
        verySmall: "clamp(1.5vh, 1.5vh + 0.5vw, 100vw)",
        small: "clamp(3vh, 3vh + 0.5vw, 100vw)",
        medium: "clamp(4vh, 4vh + 0.5vw, 100vw)",
        large: "clamp(6vh, 6vh + 1vw, 100vw)"
    },
    heights: {
        verySmall: "clamp(0.1vh, 0.1vh + 0.1vw, 100vw)",
        small: "clamp(0.2vh, 0.2vh + 0.1vw, 100vw)",
        medium: "clamp(4vh, 4vh + 0.5vw, 100vw)",
        large: "clamp(8vh, 8vh + 1vw, 100vw)"
    }
};