import { compareSync, hashSync } from "bcryptjs"


export class BcryptAdapter {
    static hash(password:string):string {
        return hashSync(password,5)
    }

    static compare(password:string,hashed:string){
        return compareSync(password,hashed)
    }
}