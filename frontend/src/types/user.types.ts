export type User = {
    _id?: string,
    name: string,
    surname: string,
    email: string,
    purchasedProducts?: string[],
    role?: string
}