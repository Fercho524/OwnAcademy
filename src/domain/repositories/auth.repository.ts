import { LoginUserDTO, RegisterUserDTO } from "../../application";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthRepository {
    abstract login(LoginUserDTO:LoginUserDTO) : Promise<UserEntity>
    abstract register(RegisterUserDTO:RegisterUserDTO):Promise<UserEntity>
    abstract getUsers(): Promise<Object[] | null>
}