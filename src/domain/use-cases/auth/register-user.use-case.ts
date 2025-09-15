import { JwtAdapter } from "../../../config";
import { RegisterUserDTO } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { UserToken } from "../../interfaces/UserToken.interface";


interface RegisterUserUseCase {
    execute(registerUserDTO: RegisterUserDTO): Promise<UserToken>;
}


type SignTokenFunction = (payload: Object, duration: string) => Promise<string | null>

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken:SignTokenFunction=JwtAdapter.generateToken
    ) {}

    async execute(registerUserDTO: RegisterUserDTO): Promise<UserToken> {
        const user = await this.authRepository.register(registerUserDTO);
        if (!user) throw CustomError.internalServerError("Unable create new user")

        const token = await this.signToken({id:user.id},"2h")
        if (!token) throw CustomError.internalServerError("Unable to generate token")

        return {
            token:token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        }
    }
}
