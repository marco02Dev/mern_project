import { UsersSchema } from "../models/users.model";
import { ProductSchema } from "../models/product.model";

export type ModelsAllowed = ProductSchema | UsersSchema;
