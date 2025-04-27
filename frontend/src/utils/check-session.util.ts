export const checkSession = (): boolean => {
    const sid = document.cookie.split('; ').find(row => row.startsWith('connect.sid='));

    if (sid) {
        return true
    }

    return false;
};
