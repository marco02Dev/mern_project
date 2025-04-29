export const sumStringDelays = (...delays: (string | undefined)[]): string => {
    const total = delays.reduce((sum, delay) => {
        if (!delay) return sum;
        const numeric: number = parseInt(delay.replace(/\D/g, ''), 10); 
        return sum + (isNaN(numeric) ? 0 : numeric);
    }, 0);
    return `${total}ms`;
}
