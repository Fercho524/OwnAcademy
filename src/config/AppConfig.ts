import { DotenvAdapter } from "../infraestructure/adapters/dotenv.adapter"


export const enviroment = DotenvAdapter.getConfig()