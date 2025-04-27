
export type ErrorMessages = {
    badRequest: string,
    serverError: string,
    sessionExpired: string,
    emailExists: string,
    resourceNotFound: string
};

export const errorMessages: ErrorMessages = {
    badRequest: "Some fields are invalid or missing",
    serverError: "Something went wrong, please try again later",
    sessionExpired: "Session expired, please re-authenticate.",
    emailExists: "An account with this email already exists. Please try logging in.",
    resourceNotFound: "Resource not found."
};