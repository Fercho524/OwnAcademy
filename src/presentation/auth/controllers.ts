import { Request, Response } from "express";

import { AuthRepository, CustomError } from "../../domain";
import { GetUsers, LoginUser, LoginUserDTO, RegisterUser, RegisterUserDTO } from "../../application";
import { JwtAdapter } from "../../infraestructure";


export class AuthController {
    // Injección de dependencias, no usar las implementaciones directas
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
            });
        }

        console.log(error);
        console.log("Error interno"); // winstonglogger
        return res.status(500).json({ "error": "Internal server error" });
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerData] = RegisterUserDTO.create(req.body);
        if (!registerData) this.handleError(new CustomError(400, error!), res);

        // No debemos llamar al repositorio desde los controladores, sino desde el caso de uso.
        if (registerData) {
            new RegisterUser(
                this.authRepository,
                JwtAdapter.generateToken,
            )
                .execute(registerData)
                .then((data) => res.json({ data: data }))
                .catch((error) => this.handleError(error, res));
        }
    };

    loginUser = async (req: Request, res: Response) => {
        const [error,loginData] = LoginUserDTO.create(req.body);
        if (!loginData) this.handleError(new CustomError(400,error!),res);

        if (loginData){
            new LoginUser(
                this.authRepository,
                JwtAdapter.generateToken
            )
                .execute(loginData)
                .then((data)=>res.json({data:data}))
                .catch((error)=>this.handleError(error,res))
        }
    };

    getUsers = (req: Request, res: Response) => {
        new GetUsers(
            this.authRepository
        )
            .execute()
            .then(users => res.json(users))
            .catch(()=>{res.status(500).json({error:"Error al obtener los usuarios"})})
    };
}
