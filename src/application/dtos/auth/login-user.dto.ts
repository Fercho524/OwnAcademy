import { Validators } from "../../validators";


export class LoginUserDTO {

    private constructor(
        public email: string,
        public password: string
    ) {}

    static create(object:{[key:string]:any}) :[string?,LoginUserDTO?] {
        const {email,password} = object;

        if (!email) return ["Missing email"]
        if (!password) return ["Missing password"]
        
        if (!Validators.email.test(email)) ["Incorrect email format"]
        if (password.lenght < 8 ) return ["Incorrect password lenght"]

        return [, new LoginUserDTO(
            email,
            password
        )]
    }
}