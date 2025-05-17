import { Response, Request, NextFunction } from "express";

/**
 * Generic type for Express controller functions.
 * 
 * Represents a function that handles a request and response,
 * returning a Promise<void>. Typically used for routes
 * that do not require middleware chaining with `next`.
 *
 * @template P - Type for route params (default: {}).
 * @template Q - Type for query params (default: {}).
 * @template B - Type for request body (default: {}).
 * 
 * @param {Request<P, Q, B>} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} A promise that resolves when handling is complete.
*/

export type Controller<P = {}, Q = {}, B = {}> = (
  req: Request<P, Q, B>,
  res: Response
) => Promise<void>;

/**
 * Extended controller type for Express controllers using Passport.js.
 * 
 * Same as `Controller`, but requires a third `next` argument,
 * necessary for Passport.js middleware to handle authentication
 * errors and continue middleware chain.
 *
 * @template P - Type for route params (default: {}).
 * @template Q - Type for query params (default: {}).
 * @template B - Type for request body (default: {}).
 * 
 * @param {...[Request<P, Q, B>, Response, NextFunction]} args - The request, response, and next function.
 * @returns {Promise<void>} A promise that resolves when handling is complete.
*/

export type PassportController<P = {}, Q = {}, B = {}> = (
  ...args: [...Parameters<Controller<P, Q, B>>, next: NextFunction]
) => Promise<void>;

/**
 * Interface representing route parameters related to products.
 * 
 * Can be extended in the future to include more specific fields.
*/

export interface ProductParams {
  id: string;
}

/**
 * Interface representing route parameters related to users.
 * 
 * Can be extended in the future to include more specific fields.
*/
export interface UsersParams {
  id: string;
}


