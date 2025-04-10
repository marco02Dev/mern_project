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
    lineHeights: FontSizes;
    spaces: SizeCategory;
    widths: SizeCategory;
    heights: SizeCategory;
};

export let sizes: Sizes = {
    fontSizes: {
        h1: "clamp(7vh, 2vh + 5vw, 100vw)", 
        h2: "clamp(5vh, 1.8vh + 3vw, 100vw)",
        h3: "clamp(4vh, 1.5vh + 2vw, 100vw)", 
        h4: "clamp(3vh, 1.2vh + 2vw, 100vw)",
        h5: "clamp(2vh, 1vh + 1vw, 100vw)",
        h6: "clamp(1vh, 0.8vh + 1vw, 100vw)", 
        span: "clamp(0.9vh, 0.6vh + 1vw, 100vw)",
        paragraph: {
            verySmall: "clamp(1vh, 0.2vh + 1vw, 100vw)",
            small: "clamp(2.4vh, 0.5vh + 1vw, 100vw)",  
            medium: "clamp(2.8vh, 0.8vh + 1vw, 100vw)",   
            large: "clamp(4vh, 1vh + 2vw, 100vw)" 
        }
    },
    lineHeights: {
        h1: "clamp(8vh, 6.4vh + 3.2vw, 100vw)",
        h2: "clamp(6vh, 2.1vh + 3.2vw, 100vw)",
        h3: "clamp(4.8vh, 1.8vh + 2.4vw, 100vw)",
        h4: "clamp(3.6vh, 1.4vh + 2.4vw, 100vw)",
        h5: "clamp(1vh, 1vh + 1.9vw, 100vw)",
        h6: "clamp(1.2vh, 1vh + 1.2vw, 100vw)",
        span: "clamp(1.1vh, 0.8vh + 1.2vw, 100vw)",
        paragraph: {
            verySmall: "clamp(1.2vh, 0.3vh + 1.2vw, 100vw)",
            small: "clamp(2.8vh, 0.6vh + 1.2vw, 100vw)",
            medium: "clamp(3.2vh, 1vh + 1.2vw, 100vw)",
            large: "clamp(4.8vh, 1.2vh + 1.2vw, 100vw)"
        },
    },
    spaces: {
        verySmall: "clamp(1vh, 0.05vh + 0.01vw, 100vw)",
        small: "clamp(2vh, 0.3vh + 0.5vw, 100vw)",
        medium: "clamp(3vh, 1.5vh + 1vw, 100vw)",
        large: "clamp(6vh, 3vh + 3vw, 100vw)"
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
        large: "clamp(50vh, 50vh + 10vw, 100vw)"
    }
};

