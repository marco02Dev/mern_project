import { Response, Request } from "express";

// Definisci il tipo dei parametri per includere l'ID
export type Controller<P = {}, Q = {}, B = {}> = (
  req: Request<P, Q, B>,
  res: Response
) => Promise<void>;

// Tipo per le route che richiedono un `id` nei parametri
export interface ProductParams {
  id: string;  // Assumi che `id` sia una stringa
}
