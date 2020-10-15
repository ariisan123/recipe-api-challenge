import { Category } from "../../models/Category";
import { User } from "../../models/User";

export type batchUser = (ids: string[]) => Promise<User[]>;
export type batchCategory = (ids: string[]) => Promise<Category[]>;
