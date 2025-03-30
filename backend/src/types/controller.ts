import { Response, Request } from "express";

export type Controller<P = {}, Q = {}, B = {}> = (
  req: Request<P, Q, B>,
  res: Response
) => Promise<void>;

export interface ProductParams {
  id: string;
}

export interface UsersParams {
  id: string;
}


