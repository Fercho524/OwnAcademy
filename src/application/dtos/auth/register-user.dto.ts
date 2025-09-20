import { Validators } from "../../validators";


export class RegisterUserDTO {

    private constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    static create(object:{[key:string]:any}) :[string?,RegisterUserDTO?] {
        const {name,email,password} = object;

        if (!name) return ["Missing name"]
        if (!email) return ["Missing email"]
        if (!password) return ["Missing password"]
        
        if (!Validators.email.test(email)) ["Incorrect email format"]
        if (!Validators.password.test(password)) return ["Incorrect password format"]

        return [, new RegisterUserDTO(
            name,
            email,
            password
        )]
    }
}