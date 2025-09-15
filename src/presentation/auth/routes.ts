import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDataSourceImplementation, AuthRepositoryImplementation } from "../../infraestructure";
import { BcryptAdapter } from "../../config";
import { AuthMiddleWare } from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router()
        const datasource = new AuthDataSourceImplementation(
            BcryptAdapter.hash,
            BcryptAdapter.compare
        )
        const authRepository = new AuthRepositoryImplementation(datasource)
        const controller = new AuthController(authRepository)

        router.post('/login',controller.loginUser)
        router.post('/register',controller.registerUser)
        router.get('/getUsers',[AuthMiddleWare.validateJWT],controller.getUsers)

        return router;
    }
}