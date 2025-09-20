import { LoginUserDTO } from "../../dtos";
import { JwtAdapter } from "../../../infraestructure";
import { AuthRepository, CustomError, UserToken} from "../../../domain/index";


interface LoginUserUseCase {
    execute(registerUserDTO: LoginUserDTO): Promise<UserToken>;
}


type SignTokenFunction = (payload: Object, duration: string) => Promise<string | null>


export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignTokenFunction = JwtAdapter.generateToken
    ) { }

    async execute(loginUserDTO: LoginUserDTO): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDTO);
        if (!user) throw CustomError.internalServerError("Unable to login user")

        const token = await this.signToken({ id: user.id }, "2h")
        if (!token) throw CustomError.internalServerError("Unable to generate token")

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}