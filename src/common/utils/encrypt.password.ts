import { hash } from "bcrypt";
import { getEnvironment } from "./get.environment";

export const encryptPassword = async (password: string) => {
    const { HASH_SALT } = getEnvironment();
    const hashedPassword = await hash(password, +HASH_SALT);
    return hashedPassword;
}