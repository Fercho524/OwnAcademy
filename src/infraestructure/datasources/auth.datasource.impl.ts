import { AuthDataSource, CustomError, UserEntity } from "../../domain";
import { LoginUserDTO, RegisterUserDTO } from "../../application";

import { UserModel } from "../data/mongodb";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


interface userData {
    id: string;
    name: string;
    email: string;
}

export class AuthDataSourceImplementation extends AuthDataSource {
   
    constructor(
        // esto : (password:string)=> string es la firma de la función, es mejor usar un type
        private readonly hashPassword: HashFunction,
        private readonly comparePassword: CompareFunction,
    ) {
        super();
    }

    async login(LoginUserDTO: LoginUserDTO): Promise<UserEntity> {
        const {email,password} = LoginUserDTO;

        // Mail Exists
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw CustomError.badRequest("Incorrect credentials");
        }

        // Validar contraseña
        const correctPassword = await this.comparePassword(password,user.password)
        if (!correctPassword) {
            throw CustomError.badRequest("Incorrect password")
        }

        // Generate token
        return Promise.resolve(
            UserMapper.userEntityFromObject(user),
        );
    }

    async register(RegisterUserDTO: RegisterUserDTO): Promise<UserEntity> {
        const { name, email, password } = RegisterUserDTO;

        try {
            // Mail exists
            const emailExists = await UserModel.findOne({ email: email });
            if (emailExists) {
                throw CustomError.badRequest("User already exists");
            }

            // Save user into db
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });
            await user.save();

            // Mapear la respuesta a una entidad, hay que usar un mapper.
            return Promise.resolve(
                UserMapper.userEntityFromObject(user),
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServerError();
        } finally {
            console.log("Transacción procesada");
        }
    }

    async getUsers(): Promise<userData[] | null> {
        try {
            const users = await UserModel.find();
            if (!users) {
                throw CustomError.internalServerError(
                    "Unable to get user list",
                );
            }

            const usersData = users.map(({ id, name, email }) => ({
                id,
                name,
                email,
            }));

            return Promise.resolve(usersData)
        } catch (error) {
            return null
        }
    }
}
