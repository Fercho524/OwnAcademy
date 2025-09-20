import "dotenv/config";
import { AppConfig } from "../../domain";


export class DotenvAdapter {
    static getConfig(): AppConfig {
        return {
            port: Number(process.env.PORT),
            dbUser: process.env.DB_USER!,
            dbPassword: process.env.DB_PASSWORD!,
            dbHost: process.env.DB_HOST!,
            dbPort: process.env.DB_PORT!,
            dbName: process.env.DB_NAME!,
            jwtSeed: process.env.JWT_SEED!
        }
    }
}