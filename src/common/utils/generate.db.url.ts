import { getEnvironment } from "./get.environment";

export const generateDBUrl = (): string => {
    const { MONGO_DB_PROTOCOLO, MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST, CONNECTION_STRING } = getEnvironment();
    const url = `${MONGO_DB_PROTOCOLO}${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/?${CONNECTION_STRING}`
    return url;
}