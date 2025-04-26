export type Endpoints ={
    initSessionEndpoint: string
    usersEndpoint: string,
    coursesEndpoint: string,
    imagesEndpoint: string,
    contactUsEndpoint: string,
    sessionEndpoint: string
}

export const endpoints: Endpoints = {
    initSessionEndpoint: import.meta.env.VITE_INIT_SESSION_ENDPOINT,
    usersEndpoint: import.meta.env.VITE_USERS_ENDPOINT,
    coursesEndpoint: import.meta.env.VITE_PRODUCTS_ENDPOINT,
    imagesEndpoint: import.meta.env.VITE_IMAGES_ENDPOINT,
    contactUsEndpoint: import.meta.env.VITE_CONTACT_US_ENDPOINT,
    sessionEndpoint: import.meta.env.VITE_SESSION_ENDPOINT
}