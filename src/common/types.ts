import { LogLevel } from "@nestjs/common";

export const enum Metadata {
    AllowAnonymous = "AllowAnonymous"
}

export const enum NodeEnv {
    Debug = "debug",
    Staging = "staging",
    Production = "production"
}


export const enum Provide {
    ConfigService = "ConfigService",
    UserService = "UserService",
    CacheService = "CacheService"
}

export interface AppConfiguration {
    port: number;
    logLevel: LogLevel;
    tokenKey: string;
}

export interface PageList<T> {
    rows: T[];
    count: number;
}
