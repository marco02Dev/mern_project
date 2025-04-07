


export type Endpoints ={
    usersEndpoint: string,
    coursesEndpoint: string,
    imagesEndpoint: string
}

export const endpoints: Endpoints = {
    usersEndpoint: 'http://192.168.1.193:8000/api/account',
    coursesEndpoint: 'http://192.168.1.193:8000/api/courses',
    imagesEndpoint: 'http://192.168.1.193:8000/images'
}