export type Course = {
    _id: string,
    name: string,
    price: number,
    featuredImageUrl: string,
    category: string,
    tags?: string[]
}