export const setCookie = (name: string, value: string, days: number = 365): void => {
    const date: Date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
    const expires: string = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
};