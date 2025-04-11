export type User = {
    _id?: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    purchasedProducts?: string[]
}