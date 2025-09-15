import { LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";
import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { AuthRepository } from "../../domain/repositories/auth.repository";

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