import { compareSync, hashSync } from "bcryptjs"
import { envs } from "./envs"


// Patrón adaptador

export class BcryptAdapter {
    static hash(password:string):string {
        console.log(envs.JWT_SEED)
        return hashSync(password,5)
    }

    static compare(password:string,hashed:string){
        return compareSync(password,hashed)
    }
}