export type Course = {
    _id: string,
    name: string,
    price: number,
    featuredImageUrl: string,
    category: string,
    details: {
        title: string,
        content: string
    }[],
    tags?: string[]
}