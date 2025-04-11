export type Endpoints ={
    usersEndpoint: string,
    coursesEndpoint: string,
    imagesEndpoint: string
}

export const endpoints: Endpoints = {
    usersEndpoint: import.meta.env.VITE_USERS_ENDPOINT,
    coursesEndpoint: import.meta.env.VITE_PRODUCTS_ENDPOINT,
    imagesEndpoint: import.meta.env.VITE_IMAGES_ENDPOINT
}