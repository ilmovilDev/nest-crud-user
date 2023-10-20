import { User } from "src/users/schema/user.schema";
import { Role } from "../enum";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imagen: string;
    role: Role;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface FindAllResponse {
    total: number;
    users: User[];
}