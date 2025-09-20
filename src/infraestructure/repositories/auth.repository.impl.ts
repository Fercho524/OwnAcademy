import { AuthDataSource, AuthRepository, UserEntity } from "../../domain";
import { LoginUserDTO, RegisterUserDTO } from "../../application";


export class AuthRepositoryImplementation extends AuthRepository {
    constructor(
        private readonly authDataSource:AuthDataSource
    ){
        super()
    }

    login(LoginUserDTO: LoginUserDTO): Promise<UserEntity> {
        return this.authDataSource.login(LoginUserDTO)
    }

    register(RegisterUserDTO: RegisterUserDTO): Promise<UserEntity> {
        return this.authDataSource.register(RegisterUserDTO)
    }

    getUsers(): Promise<Object[] | null> {
        return this.authDataSource.getUsers()
    }
    
}