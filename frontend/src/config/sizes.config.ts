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
        h1: "clamp(2.5rem, 5vw + 2rem, 6rem)", 
        h2: "clamp(2rem, 4vw + 1.5rem, 5rem)",
        h3: "clamp(1.75rem, 3.5vw + 1.25rem, 4.5rem)", 
        h4: "clamp(1.5rem, 3vw + 1rem, 4rem)",
        h5: "clamp(1.25rem, 2.5vw + 0.75rem, 3rem)",
        h6: "clamp(1rem, 2vw + 0.5rem, 2.5rem)", 
        p: {
            small: "clamp(0.875rem, 1.2vw + 0.25rem, 1rem)",  
            medium: "clamp(1rem, 1.5vw + 0.5rem, 1.25rem)",   
            large: "clamp(1.125rem, 1.8vw + 0.75rem, 1.5rem)" 
        },
        span: "clamp(1rem, 1.5vw + 0.5rem, 1.25rem)"
    },
    spaces: {
        small: "clamp(0.5rem, 1.5vw, 1rem)",
        medium: "clamp(1rem, 3vw, 2rem)",
        large: "clamp(2rem, 5vw, 4rem)"
    }
};
