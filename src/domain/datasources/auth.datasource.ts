import { UserEntity } from "../entities";
import { LoginUserDTO, RegisterUserDTO } from "../../application";

export abstract class AuthDataSource {
    abstract register(RegisterUserDTO:RegisterUserDTO): Promise<UserEntity>
    abstract login(LoginUserDTO:LoginUserDTO) : Promise<UserEntity>
    abstract getUsers(): Promise<Object[] | null>
}