export const destroySessionCookie = (): void => {
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'; 
};
