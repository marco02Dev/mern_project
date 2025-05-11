export const passwordPatternAttrs: {
    pattern: string,
    title: string
} = {
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$",
    title: "Password must be at least 8 characters long and include at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.",
}