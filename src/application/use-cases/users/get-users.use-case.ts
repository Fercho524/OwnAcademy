import { AuthRepository, CustomError } from "../../../domain";


interface GetUsersUseCase {
    execute(): Promise<Object[] | null>;
}


export class GetUsers implements GetUsersUseCase{
    constructor(
        private authRepository:AuthRepository
    ){}

    async execute(): Promise<Object[]> {
        const users = await this.authRepository.getUsers()
        if (!users) throw CustomError.internalServerError("Unable create new user")
        
        return users;
    }
}