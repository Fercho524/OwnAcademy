import { LoginUserDTO } from "../dtos/auth/login-user.dto";
import { RegisterUserDTO } from "../dtos/auth/register-user.dto";

import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource {
    abstract register(RegisterUserDTO:RegisterUserDTO): Promise<UserEntity>
    abstract login(LoginUserDTO:LoginUserDTO) : Promise<UserEntity>
    abstract getUsers(): Promise<Object[] | null>
}