import { UserEntity } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";

export class UserMapper{
    static userEntityFromObject(object:{[key:string]:any}):UserEntity{
        const {id,_id,name,email,password,rol=[],image}=object;

        if (!id || !_id) throw CustomError.badRequest("Missing ID")
        if (!name) throw CustomError.badRequest("Missing name")
        if (!email) throw CustomError.badRequest("Missing name")
        if (!password) throw CustomError.badRequest("Missing name")

        return new UserEntity(
            _id || id,
            name,
            email,
            rol,
            password,
            image
        )
    }
}