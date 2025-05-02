import { devolopmentApiEndpoint } from "./app.config";
import { isProduction } from "./app.config";
console.log(isProduction);

export type Endpoints = {
    usersEndpoint: string,
    coursesEndpoint: string,
    imagesEndpoint: string,
    contactUsEndpoint: string,
    sessionEndpoint: string
}

export const endpoints: Endpoints = {
    usersEndpoint: isProduction ? '/api/account' : `${devolopmentApiEndpoint }/api/account`,           
    coursesEndpoint: isProduction ? '/api/courses' : `${devolopmentApiEndpoint }/api/courses`,         
    imagesEndpoint: isProduction ? '/images' : `${devolopmentApiEndpoint }/images`,            
    contactUsEndpoint: isProduction ? '/api/contact-us' : `${devolopmentApiEndpoint }/api/contact-us`,     
    sessionEndpoint: isProduction ? '/api/session' : `${devolopmentApiEndpoint }/api/session`,               
}

console.log(endpoints)