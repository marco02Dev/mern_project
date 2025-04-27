export type ErrorMessages = {
    badRequest: string,
    serverError: string,
    sessionExpired: string
}

export const errorMessages: ErrorMessages = {
    badRequest: "Some fields are invalid or missing",
    serverError: "Something went wrong, please try again later",
    sessionExpired: "Session expired, please re-authenticate."
}