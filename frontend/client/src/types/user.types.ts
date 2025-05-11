export type User = {
    _id?: string,
    name: string,
    surname: string,
    email: string,
    purchasedProducts?: string[],
    role?: string,
    password?: string
}
export interface LoggedUser {
    _id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
}