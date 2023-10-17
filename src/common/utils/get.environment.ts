interface ProccesEnv {
    TZ: string;
    // GENERAL
    PORT: number;
    // Bcrypt
    HASH_SALT: number;
    // MONGODB
    MONGO_DB_PROTOCOLO: string;
    MONGO_DB_USER: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_HOST: string;
    CONNECTION_STRING: string;
    //JSON WEB TOKEN
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
}

export function getEnvironment(): Partial<ProccesEnv> {
    return { ...process.env }
}